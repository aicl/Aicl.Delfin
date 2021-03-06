using System.Linq;
using ServiceStack.ServiceHost;
using Aicl.Delfin.Model.Types;
using Aicl.Delfin.DataAccess;
using System.Collections.Generic;
using ServiceStack.ServiceInterface;
using ServiceStack.Common;
using ServiceStack.Common.Web;
using Aicl.Delfin.Report;
using ServiceStack.ServiceInterface.Auth;
using System.IO;

namespace Aicl.Delfin.BusinessLogic
{
	public  static partial class BL
	{
		#region Get
        public static object Get(this PedidoPdf request,
		                         Factory factory,
		                         IHttpRequest httpRequest,
		                         User user)
        {

			return factory.Execute(proxy=>{
				Pedido pedido= proxy.FirstOrDefault<Pedido>(q=>q.Consecutivo==request.Consecutivo);
				if (pedido==default(Pedido))
				{
					throw HttpError.NotFound(string.Format("No existe Oferta con Consecutivo: '{0}'", request.Consecutivo));
				}


				List<PedidoItem> items=
					proxy.Get<PedidoItem>(q=>q.IdPedido==pedido.Id).OrderBy(f=>f.Id).ToList();
					//proxy.Get<PedidoItem>(q=>q.IdPedido==pedido.Id).OrderBy(f=>f.IdServicio).ToList();


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


				OfertaPdf pdf = new OfertaPdf(httpRequest.ApplicationFilePath);

				string logo = Path.Combine(Path.Combine(httpRequest.ApplicationFilePath, "resources"), "logo.png");
				string file = Path.Combine(Path.Combine(httpRequest.ApplicationFilePath,"App_Data"),
				                           string.Format("oferta-{0}.pdf",pedido.Consecutivo));

				using (var stream =  new MemoryStream()){


					pdf.CreatePDF(empresa,user,pedido,items,logo,BL.Prefijo,
				              stream, new OfertaMargin(5,5,100,30));

					stream.Position=0;

					using(var fileStream = new FileStream(file, FileMode.Create )){
						stream.CopyTo(fileStream);
						fileStream.Close();
						return new HttpResult( new FileInfo(file), asAttachment:true);
					}

				}

			});

		}
		#endregion Get
	}



}

