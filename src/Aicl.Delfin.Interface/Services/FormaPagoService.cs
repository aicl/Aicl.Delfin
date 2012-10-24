using System;
﻿using ServiceStack.ServiceHost;
using Aicl.Delfin.Model.Types;
using Aicl.Delfin.Model.Operations;
using Aicl.Delfin.BusinessLogic;
using ServiceStack.ServiceInterface;

namespace Aicl.Delfin.Interface
{
	[PermissionAttribute(ApplyTo.Post,"FormaPago.create")]
	[RequiresAuthenticateAttribute(ApplyTo.Get)]
	[PermissionAttribute(ApplyTo.Put,"FormaPago.update")]
	[PermissionAttribute(ApplyTo.Delete, "FormaPago.destroy")]
	public class FormaPagoService:AppRestService<FormaPago>
	{
		public override object OnGet (FormaPago request)
		{
			try{
				return request.Get(Factory, RequestContext.Get<IHttpRequest>());
			}
			catch(Exception e){
				return HttpResponse.ErrorResult<Response<FormaPago>>(e,"GetFormaPagoError");
			}
		}


		public override object OnPost (FormaPago request)
		{
			try{
				return request.Post(Factory, RequestContext.Get<IHttpRequest>());
			}
			catch(Exception e){
				return HttpResponse.ErrorResult<Response<FormaPago>>(e,"PostFormaPagoError");
			}
		}


		public override object OnPut (FormaPago request)
		{
			try{
				return request.Put(Factory, RequestContext.Get<IHttpRequest>());
			}
			catch(Exception e){
				return HttpResponse.ErrorResult<Response<FormaPago>>(e,"PutFormaPagoError");
			}
		}

		public override object OnDelete (FormaPago request)
		{
			try{
				return request.Delete(Factory, RequestContext.Get<IHttpRequest>());
			}
			catch(Exception e){
				return HttpResponse.ErrorResult<Response<FormaPago>>(e,"DeleteFormaPagoError");
			}
		}

	}
}

