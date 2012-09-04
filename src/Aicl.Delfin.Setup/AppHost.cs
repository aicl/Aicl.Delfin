using System;
using System.Reflection;
using System.Collections.Generic;
using Funq;
using ServiceStack.CacheAccess;
using ServiceStack.CacheAccess.Providers;
using ServiceStack.Redis;
using ServiceStack.Common.Web;
using ServiceStack.Configuration;
using ServiceStack.Logging;
using ServiceStack.Logging.Support.Logging;
using ServiceStack.WebHost.Endpoints;
using ServiceStack.ServiceInterface.Auth;
using ServiceStack.ServiceInterface;
using ServiceStack.OrmLite;
using ServiceStack.OrmLite.MySql;

using Aicl.Delfin.Model.Types;
using Aicl.Delfin.DataAccess;
using Aicl.Delfin.Interface;


namespace Aicl.Delfin.Setup
{
	public class AppHost:AppHostHttpListenerBase
	{
		static ILog log;
		
		public AppHost (): base("Aicl.Delfin", typeof(AuthenticationService).Assembly)
		{
			LogManager.LogFactory = new ConsoleLogFactory();
			log = LogManager.GetLogger(typeof (AppHost));
		}
		
		public override void Configure(Container container)
		{
			//Permit modern browsers (e.g. Firefox) to allow sending of any REST HTTP Method
			base.SetConfig(new EndpointHostConfig
			{
				GlobalResponseHeaders =
					{
						{ "Access-Control-Allow-Origin", "*" },
						{ "Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS" },
					},
				  DefaultContentType = ContentType.Json 
			});
						
			var config = new AppConfig(new ConfigurationResourceManager());
			container.Register(config);
						
            OrmLiteConfig.DialectProvider= MySqlDialectProvider.Instance;
			
			IDbConnectionFactory dbFactory = new OrmLiteConnectionFactory(
				ConfigUtils.GetConnectionString("ApplicationDb"));
			
			container.Register<Factory>(
				new Factory(){
					DbFactory=dbFactory
				}
			);		

            log.InfoFormat("Configurando sistema de autenticacion");
			var cu = ConfigureAuth(container);

            log.InfoFormat("Configurando role Admin");
            ConfigurePermissions(dbFactory, cu);

			CreateAppTables(dbFactory);
			CreateCiudades(dbFactory);

			log.InfoFormat("AppHost Configured: " + DateTime.Now);
		}
		

		void CreateAppTables(IDbConnectionFactory factory)
        {
			log.InfoFormat("Creando AppTables....");

			var appSettings = new ConfigurationResourceManager();

			var fileName= appSettings.Get<string>("AssemblyWithModels", string.Empty);
			if(string.IsNullOrEmpty( fileName )){
				log.InfoFormat("AssemblyWithModels NO Definido");
			}

			var nameSpace= appSettings.Get<string>("ModelsNamespace", string.Empty);

			Assembly assembly = Assembly.LoadFrom(fileName);

			if (assembly==null){
				log.InfoFormat("AssemblyWithModels NO pudo ser cargado");
			}


			var recreateAppTables = appSettings.Get<bool>("RecreateAppTables", false);

			factory.Exec(dbCmd=>{
				foreach(Type t in  assembly.GetTypes()){
					if (t.Namespace==nameSpace && !( t.Name.StartsWith("Auth") || t.Name.StartsWith("Userauth"))
					    && ! t.IsInterface
					    )
					{	
						log.InfoFormat( "Creando {0} ", t.Name);
						dbCmd.CreateTable(recreateAppTables, t);
						log.InfoFormat( "Tabla {0} creada", t.Name);
					}
				}
			});

			log.InfoFormat("AppTables ok");
		}

		void CreateCiudades(IDbConnectionFactory factory)
        {
			log.InfoFormat("Creando Ciudades....");

			var appSettings = new ConfigurationResourceManager();

			var crear= appSettings.Get<bool>("CrearCiudades", false);
			if(!crear){
				log.InfoFormat("Crear ciudades NO");
			}

			factory.Exec(dbCmd=>{
				dbCmd.DeleteAll<Ciudad>();
				dbCmd.InsertAll(new Ciudades());
			});

			log.InfoFormat("Crear Ciudades ok");
		}


        void ConfigurePermissions(IDbConnectionFactory factory, CreatedUsers users)
        {


            var appSettings = new ConfigurationResourceManager();

            if (!appSettings.Get<bool>("CreatePermissionsTables", false) ||
                !appSettings.Get("AddUsers", false)) return ;

            factory.Exec(dbCmd=>{

                log.InfoFormat("Creando Auth tablas");
                dbCmd.CreateTable<AuthPermission>();
                dbCmd.CreateTable<AuthRole>();
                dbCmd.CreateTable<AuthRolePermission>();
                dbCmd.CreateTable<AuthRoleUser>();
                log.InfoFormat("Auth Tablas creadas");

                AuthRole aur= dbCmd.FirstOrDefault<AuthRole>(r=> r.Name=="Admin");
                if(aur==default(AuthRole))
                {
                    log.InfoFormat("Creando Admin Role");
                    aur= new AuthRole(){Name="Admin", Title="Admin"};
                    dbCmd.Insert(aur);
                    aur.Id=Convert.ToInt32(dbCmd.GetLastInsertId());
                    log.InfoFormat("Admin Role Creado");
                }

                AuthRoleUser auru= dbCmd.FirstOrDefault<AuthRoleUser>(r=> r.AuthRoleId==aur.Id &&
                                                                      r.UserId==users.Admin.Id);
                if(auru==default(AuthRoleUser))
                {
                    log.InfoFormat("Asignando  Admin Role al usuario Admin");
                    auru=new AuthRoleUser(){UserId=users.Admin.Id, AuthRoleId= aur.Id};
                    dbCmd.Insert(auru);
                    log.InfoFormat("Admin Role asignado al usuario Admin");
                }

             });

        }

		
		CreatedUsers ConfigureAuth(Container container){
			
			var appSettings = new ConfigurationResourceManager();
			double se= appSettings.Get("DefaultSessionExpiry", 480);
			AuthProvider.DefaultSessionExpiry=TimeSpan.FromMinutes(se);			

			if (appSettings.Get("EnableRedisForAuthCache", false)){
				string cacheHost= appSettings.Get("AuthCacheHost", "localhost:6379");			
				int cacheDb= appSettings.Get("AuthCacheDb",8);				
										
				string cachePassword= appSettings.Get("AuthCachePassword",string.Empty);
						
				var p = new PooledRedisClientManager(new string[]{cacheHost},
							new string[]{cacheHost},
							cacheDb); 
				
				if(! string.IsNullOrEmpty(cachePassword))
					p.GetClient().Password= cachePassword;
				
				container.Register<ICacheClient>(p);
			}
			else
			{
				container.Register<ICacheClient>(new MemoryCacheClient());	
			}
			
			Plugins.Add(new AuthFeature(
				 () => new AuthUserSession(), // or Use your own typed Custom AuthUserSession type
				new IAuthProvider[]
        	{
				new AuthenticationProvider(){SessionExpiry=TimeSpan.FromMinutes(se)}
        	})
			{
				IncludeAssignRoleServices=false, 
			});
		    				
			var dbFactory = new OrmLiteConnectionFactory(ConfigUtils.GetConnectionString("UserAuth")) ;
			
			OrmLiteAuthRepository authRepo = new OrmLiteAuthRepository(
				dbFactory
			);
			
			container.Register<IUserAuthRepository>(
				c => authRepo
			); //Use OrmLite DB Connection to persist the UserAuth and AuthProvider info

			
			if (appSettings.Get("EnableRegistrationFeature", false))
				Plugins.Add( new  RegistrationFeature());
			
			
			
			if (!appSettings.Get("AddUsers", false)) return default(CreatedUsers);
			
			
			// addusers
			var oldL =MySqlDialectProvider.Instance.DefaultStringLength;
			
			MySqlDialectProvider.Instance.DefaultStringLength=64;
			if (appSettings.Get("RecreateAuthTables", false))
				authRepo.DropAndReCreateTables(); //Drop and re-create all Auth and registration tables
			else{
				authRepo.CreateMissingTables();   //Create only the missing tables				
			}
			MySqlDialectProvider.Instance.DefaultStringLength=oldL;
						
		    //Add admin user  
			string userName = "admin";
			string password = "aqPxym161t";
		
			List<string> permissions= new List<string>(
			new string[]{	
		
			});
			
            CreatedUsers cu = new CreatedUsers();

            var userAuth=authRepo.GetUserAuthByUserName(userName);

			if ( userAuth== default(UserAuth) ){
                log.InfoFormat("creando usuario:'{0}'", userName);
				List<string> roles= new List<string>();
				roles.Add(RoleNames.Admin);
			    string hash;
			    string salt;
			    new SaltedHash().GetHashAndSaltString(password, out hash, out salt);
			    authRepo.CreateUserAuth(new UserAuth {
				    DisplayName = userName,
			        Email = userName+"@mail.com",
			        UserName = userName,
			        FirstName = "",
			        LastName = "",
			        PasswordHash = hash,
			        Salt = salt,
					Roles =roles,
					Permissions=permissions
			    }, password);
                log.InfoFormat("Usuario:'{0}' creado", userName);
                userAuth= authRepo.GetUserAuthByUserName(userName);
			}
			
            cu.Admin= userAuth;

			userName = "alfredo.ramon";
			password = "74wdln12";
		
			permissions= new List<string>(
			new string[]{	
			
			});
			
            userAuth= authRepo.GetUserAuthByUserName(userName);
			if ( userAuth== default(UserAuth) ){
                log.InfoFormat("creando usuario:'{0}'", userName);
				List<string> roles= new List<string>();
				roles.Add("User");
				string hash;
			    string salt;
			    new SaltedHash().GetHashAndSaltString(password, out hash, out salt);
			    authRepo.CreateUserAuth(new UserAuth {
				    DisplayName = "Alfredo Ramon",
			        Email = "alfredoramon@colmetrik.com",
			        UserName = userName,
			        FirstName = "Alfredo",
			        LastName = "Ramon",
			        PasswordHash = hash,
			        Salt = salt,
					Roles =roles,
					Permissions=permissions
			    }, password);
                userAuth= authRepo.GetUserAuthByUserName(userName);
                log.InfoFormat("Usuario:'{0}' creado", userName);
			}

            cu.User= userAuth;

            return cu;
		}
		
	}

    public class CreatedUsers
    {
        public CreatedUsers(){}

        public UserAuth Admin {get; set;}
        public UserAuth User {get; set;}
    }
}