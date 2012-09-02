using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using ServiceStack.ServiceInterface.Auth;

namespace Aicl.Delfin.Interface
{
	public class RequiresAuthenticateAttribute:AuthenticateAttribute
	{
	
		public RequiresAuthenticateAttribute(ApplyTo applyTo)
			: base(applyTo)	{}

		public RequiresAuthenticateAttribute()
			: base(ApplyTo.All) {}

		public RequiresAuthenticateAttribute(string provider)
			: this(ApplyTo.All)	{}

		public RequiresAuthenticateAttribute(ApplyTo applyTo, string provider)
			: this(applyTo)	{}
		
		
		public override void Execute(IHttpRequest req, IHttpResponse res, object requestDto)
		{
			base.Execute(req, res, requestDto);
			var session = req.GetSession();
			if(session!=null && session.IsAuthenticated)
			{
				req.SaveSession(session);// refresh session TTL
			}
		}
	
	}
}

