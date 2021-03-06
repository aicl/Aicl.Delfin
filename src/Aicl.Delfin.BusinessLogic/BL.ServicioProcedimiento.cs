using System.Linq.Expressions;
using ServiceStack.OrmLite;
using ServiceStack.Common;
using ServiceStack.ServiceHost;
using Aicl.Delfin.Model.Types;
using Aicl.Delfin.Model.Operations;
using Aicl.Delfin.DataAccess;
using Mono.Linq.Expressions;
using System.Collections.Generic;
using ServiceStack.Common.Web;

namespace Aicl.Delfin.BusinessLogic
{
	public static partial class BL
	{
		#region Get
        public static Response<ServicioProcedimiento> Get(this ServicioProcedimiento request,
		                                              Factory factory,
		                                              IHttpRequest httpRequest)
        {
            return factory.Execute(proxy=>{

				long? totalCount=null;

				var paginador= new Paginador(httpRequest);
            	
                var visitor = ReadExtensions.CreateExpression<ServicioProcedimiento>();

				var predicate = PredicateBuilder.True<ServicioProcedimiento>();

				if(!request.NombreProcedimiento.IsNullOrEmpty()){
					predicate= q=>q.NombreProcedimiento.Contains(request.NombreProcedimiento);
					visitor.OrderBy(f=>f.NombreProcedimiento);
				}

				if(!request.NombreServicio.IsNullOrEmpty()){
					predicate= q=>q.NombreServicio.Contains(request.NombreServicio);
					visitor.OrderBy(f=>f.NombreServicio);
				}

				if(request.IdProcedimiento != default(int)){
					predicate = q=>q.IdProcedimiento==request.IdProcedimiento;
					visitor.OrderBy(f=>f.NombreServicio);
				}

				if(request.IdServicio!=default(int)){
					predicate = q=>q.IdServicio==request.IdServicio;
					visitor.OrderBy(f=>f.NombreProcedimiento);
				}

				if (visitor.OrderByExpression.IsNullOrEmpty()) visitor.OrderBy(f=>f.NombreServicio);

				var qs= httpRequest.QueryString["ActivoProcedimiento"];
				bool activo;
				if(bool.TryParse(qs,out activo)){
					predicate= predicate.AndAlso(q=>q.ActivoProcedimiento==activo);
				}


				qs= httpRequest.QueryString["ActivoServicio"];
				bool activoServicio;
				if(bool.TryParse(qs,out activoServicio)){
					predicate= predicate.AndAlso(q=>q.ActivoServicio==activoServicio);
				}

				visitor.Where(predicate);

                if(paginador.PageNumber.HasValue)
                {
					visitor.Select(r=> Sql.Count(r.Id));
					totalCount= proxy.Count(visitor);
					visitor.Select();
                    int rows= paginador.PageSize.HasValue? paginador.PageSize.Value:BL.ResponsePageSize;
                    visitor.Limit(paginador.PageNumber.Value*rows, rows);
                }
                


				return new Response<ServicioProcedimiento>(){
                	Data=proxy.Get(visitor),
                	TotalCount=totalCount
            	};
            });
  
        }
        #endregion 


		#region Post
        public static Response<ServicioProcedimiento> Post(this ServicioProcedimiento request,
		                                              Factory factory,
		                                              IHttpRequest httpRequest)
        {
			factory.Execute(proxy=>{
				//var servicio= proxy.FirstOrDefaultById<Servicio>(request.IdServicio);
				var servicio= proxy.CheckExistAndActivo<Servicio>(request.IdServicio, f=>f.Nombre);

				var procedimiento= proxy.CheckExistAndActivo<Procedimiento>(request.IdProcedimiento, f=>f.Nombre);
				proxy.Create(request);
				request.NombreServicio= servicio.Nombre;
				request.ActivoServicio=servicio.Activo;
				request.NombreProcedimiento=procedimiento.Nombre;
				request.DescripcionProcedimiento= procedimiento.Descripcion;
				request.PorcentajeIvaProcedimiento= procedimiento.PorcentajeIva;
				request.ValorUnitarioProcedimiento= procedimiento.ValorUnitario;
				request.ActivoProcedimiento= procedimiento.Activo;

			});

			List<ServicioProcedimiento> data = new List<ServicioProcedimiento>();
			data.Add(request);
			
			return new Response<ServicioProcedimiento>(){
				Data=data
			};	
		}
		#endregion Post


		#region Put
        public static Response<ServicioProcedimiento> Put(this ServicioProcedimiento request,
		                                              Factory factory,
		                                              IHttpRequest httpRequest)
        {
			throw HttpError.NotFound("PutServicioProcedimiento No Implementado");
		}
		#endregion Put

		#region Delete
        public static Response<ServicioProcedimiento> Delete(this ServicioProcedimiento request,
		                                              Factory factory,
		                                              IHttpRequest httpRequest)
        {
			factory.Execute(proxy=>{
				proxy.Delete<ServicioProcedimiento>(q=>q.Id==request.Id);
			});

			List<ServicioProcedimiento> data = new List<ServicioProcedimiento>();
			data.Add(request);
			
			return new Response<ServicioProcedimiento>(){
				Data=data
			};	
		}
		#endregion Delete

	}
}

