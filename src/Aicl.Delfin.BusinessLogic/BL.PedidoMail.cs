using System.Web;
using System.Linq;
using ServiceStack.ServiceHost;
using Aicl.Delfin.Model.Types;
using Aicl.Delfin.Model.Operations;
using Aicl.Delfin.DataAccess;
using System.Collections.Generic;
using System;
using ServiceStack.ServiceInterface;
using ServiceStack.Common;
using ServiceStack.Common.Web;
using Aicl.Delfin.Report;
using System.Net.Mail;
using ServiceStack.ServiceInterface.Auth;
using System.IO;

namespace Aicl.Delfin.BusinessLogic
{
	public static partial class BL
	{
		#region Get
        public static Response<PedidoMail> Get(this PedidoMail request,
		                                     Factory factory,
		                                     IHttpRequest httpRequest,
		                                     Mailer mailService,
		                                     User user)
        {

			return factory.Execute(proxy=>{
				Pedido pedido= proxy.FirstOrDefault<Pedido>(q=>q.Consecutivo==request.Consecutivo);
				if (pedido==default(Pedido))
				{
					throw HttpError.NotFound(string.Format("No existe Oferta con Consecutivo: '{0}'", request.Consecutivo));
				}

				if(!pedido.FechaEnvio.HasValue)
				{
					throw HttpError.Unauthorized(
						string.Format("Oferta con Consecutivo:'{0}' No esta en estado ENVIADA", request.Consecutivo));
				}

				List<PedidoItem> items=
					proxy.Get<PedidoItem>(q=>q.IdPedido==pedido.Id).OrderBy(f=>f.Id).ToList();
					//proxy.Get<PedidoItem>(q=>q.IdPedido==pedido.Id).OrderBy(f=>f.IdServicio).ToList();


				var oferta = new OfertaHtml();
				User sendBy= new User();  // el que lo envio !!!

				if(user.Id !=pedido.IdEnviadoPor){
					sendBy= proxy.FirstOrDefault<User>(q=>q.Id==pedido.IdEnviadoPor);
					if(sendBy==default(User)){
						user = new User(){
							FirstName="indefinido",
							LastName="indefinido"
						};

					}
				}
				else{
					sendBy.PopulateWith(user);
				}
				var empresa = proxy.GetEmpresa(); 

				var html = oferta.ConstruirHtmlReport(empresa,
				                                      user,
				                                      pedido,
				                                      items,
				                                      request.TextoInicial);

				MailMessage message = new MailMessage();
				message.Subject=  !request.Asunto.IsNullOrEmpty()?
					request.Asunto:
						string.Format("Envio Oferta No:{0}", pedido.Consecutivo.ToString().PadLeft(8,'0'));

				message.ReplyToList.Add(user.Email);
				message.From= new MailAddress(user.Email);

				var mc= !pedido.MailContacto.IsNullOrEmpty()?pedido.MailContacto:user.Email;

				message.To.Add(mc);

				if(! pedido.MailDestinatario.IsNullOrEmpty() &&

				   (mc.Trim().ToUpper()!=pedido.MailDestinatario.Trim().ToUpper()) ){
					message.CC.Add(pedido.MailDestinatario);
				}

				message.Bcc.Add(user.Email);

				if(!empresa.ApplicationMailBox.IsNullOrEmpty()){
					message.Bcc.Add(empresa.ApplicationMailBox);
				}

				message.Body= html;
				message.IsBodyHtml=true;

				OfertaPdf pdf = new OfertaPdf(httpRequest.ApplicationFilePath);

				string logo = Path.Combine(Path.Combine(httpRequest.ApplicationFilePath, "resources"), "logo.png");

				using (var stream =  new MemoryStream() ){
					pdf.CreatePDF(empresa,user,pedido,items,logo,"CMK-S", 
			              stream, new OfertaMargin(5,5,90,15));
					stream.Position=0;
					message.Attachments.Add(new Attachment(stream,string.Format("oferta-{0}.pdf",pedido.Consecutivo)));
					mailService.Send(message);
				}


				return new Response<PedidoMail>(); 

			});


		}
		#endregion Get

	}
}

/*
<p style="text-align:center">
   Este texto está centrado.
 </p> 

 <p style="text-align:left"> 
   Este texto está alineado a la izquierda.
 </p> 

 <p style="text-align:right"> 
    Este texto está alineado a la derecha.
 </p> 

 <p style="text-align:justify"> 
    Este texto está justificado,
    Margenes alineados a derecha e izquierda.
 </p>
*/
