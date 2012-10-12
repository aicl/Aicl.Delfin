using System;
﻿using ServiceStack.ServiceHost;
using Aicl.Delfin.Model.Types;
using Aicl.Delfin.Model.Operations;
using Aicl.Delfin.BusinessLogic;

namespace Aicl.Delfin.Interface
{
	public class PedidoPdfService:AppRestService<PedidoPdf>
	{
		public override object OnGet(PedidoPdf request)
		{
			try{
				return request.Get(Factory, RequestContext.Get<IHttpRequest>());
			}
			catch(Exception e){
				return HttpResponse.ErrorResult<Response<PedidoPdf>>(e,"GetPedidoPdfError");
			}
		}

		public override object OnPost(PedidoPdf request)
		{
			return Get(request);
		}

	}
}

