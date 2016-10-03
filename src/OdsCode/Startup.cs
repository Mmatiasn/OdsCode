using AutoMapper;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using OdsCode.Models;
using OdsCode.Repository;
using OdsCode.Services;
using OdsCode.ViewModels;
using System.Threading.Tasks;

namespace OdsCode
{
    public class Startup
    {
        private IHostingEnvironment _env;
        private IConfigurationRoot _config;

        public Startup(IHostingEnvironment env)
        {
            _env = env;

            var builder = new ConfigurationBuilder()
                .SetBasePath(_env.ContentRootPath)
                .AddJsonFile("config.json")
                .AddEnvironmentVariables();

            _config = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(_config);
            
            // ASP.NET core requires dependency injection.
            // The job on configureServices is to set up the service container, that container of all the different services that different part of your application requires.

            // Registering our services is done here, even our own.
            // Three ways of handling the services
            // Needs an interface that is fulfilled by a class
            // AddTransient is going to create an instance when it's needed and can keep it cached around
            // AddScoped will create an instance for each set of request
            // AddSingleton will create one instance the first time is needed and past that over and over again.
            if (_env.IsDevelopment())
            {
                services.AddScoped<IMailService, DebugMailService>();
            }
            else
            {
                //Implement a real Mail Service
            }

            // AddDbContext is used to tell the webservice about a repository?
            services.AddDbContext<WorldContext>();

            services.AddScoped<IWorldRepository, WorldRepository>(); //MockWorldRepository can be used to test.

            // BingMap is registered.
            services.AddTransient<GeoCoordsService>();

            // Is used to create data in the database.
            services.AddTransient<WorldContextSeedData>();

            // AddMvc → UseMvc | All MVC services are configures here.
            services.AddMvc(config =>
            {
                if (_env.IsProduction())
                {
                    config.Filters.Add(new RequireHttpsAttribute());
                }
            })
            .AddJsonOptions(config =>
                {
                    config.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                });

            services.AddIdentity<WorldUser, IdentityRole>(config =>
            {
                config.User.RequireUniqueEmail = true;
                config.Password.RequiredLength = 5;
                config.Password.RequireDigit = false;
                config.Password.RequireNonAlphanumeric = false;
                config.Password.RequireLowercase = false;
                config.Password.RequireUppercase = false;
                config.Cookies.ApplicationCookie.LoginPath = "/Login";
                config.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents()
                {
                    OnRedirectToLogin = async ctx =>
                    {
                        if (ctx.Request.Path.StartsWithSegments("/api") && ctx.Response.StatusCode == 200)
                        {
                            ctx.Response.StatusCode = 401;
                        }
                        else
                        {
                            ctx.Response.Redirect(ctx.RedirectUri);
                        }
                        await Task.Yield();
                    }
                };
            })
            .AddEntityFrameworkStores<WorldContext>();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app,
            IHostingEnvironment env,
            WorldContextSeedData seeder,
            ILoggerFactory factory)
        {
            //Middleware- software that acts as a bridge between an operating system or database and applications, especially on a network.
            app.UseStaticFiles();

            app.UseIdentity();

            Mapper.Initialize(config =>
            {
                config.CreateMap<TripViewModel, Trip>().ReverseMap();
                config.CreateMap<StopViewModel, Stop>().ReverseMap();
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                factory.AddDebug(LogLevel.Information);
            }
            else
            {
                // Temporary
                app.UseDeveloperExceptionPage();
                factory.AddDebug(LogLevel.Error);
            }

            // AddMvc → UseMvc | Lisens for operations to perform
            app.UseMvc(config =>
            {
                config.MapRoute(
                    name: "Login",
                    template: "Login/{action}/{id?}",
                    defaults: new { controller = "Login", action = "Login" }
                    );
                config.MapRoute(
                    name: "Logout",
                    template: "Logout/{action}/{id?}",
                    defaults: new { controller = "Logout", action = "Logout" }
                    );

                config.MapRoute(
                    name: "Home",
                    template: "Home/{action}/{id?}",
                    defaults: new { controller = "Home", action = "Home" }
                    );

                config.MapRoute(
                    name: "Trips",
                    template: "Trips/{action}/{id?}",
                    defaults: new { controller = "Trips", action = "Trips" }
                    );

                config.MapRoute(
                    name: "YouTube",
                    template: "YouTube/{action}/{id?}",
                    defaults: new { controller = "YouTube", action = "YouTube" }
                    );

                config.MapRoute(
                    name: "Contact",
                    template: "Contact/{action}/{id?}",
                    defaults: new { controller = "Contact", action = "Contact" }
                    );

                config.MapRoute(
                    name: "About",
                    template: "About/{action}/{id?}",
                    defaults: new { controller="About", action = "About" }
                    );

                config.MapRoute(
                    name: "Default",
                    template: "{controller}/{action}/{id?}",
                    defaults: new { controller = "Home", action = "Home" }
                    );
            });

            seeder.EnsureSeedData().Wait();

        }
    }
}
