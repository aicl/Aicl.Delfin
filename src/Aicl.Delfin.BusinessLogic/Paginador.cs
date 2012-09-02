﻿using ServiceStack.ServiceHost;

namespace Aicl.Delfin.BusinessLogic
{
    public class Paginador
    {

        public  int? PageNumber {get; private set;}
        public  int? PageSize {get; private set;}

        public Paginador(IHttpRequest httpRequest)
        {
            int page;
            if (int.TryParse( httpRequest.QueryString["page"], out page))
                PageNumber=page-1;

            int limit;

            if (int.TryParse( httpRequest.QueryString["limit"], out limit))
                PageSize=limit;
        }
    }
}

