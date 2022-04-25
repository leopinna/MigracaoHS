using Ocelot.Cache.CacheManager;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
//using Ocelot.Provider.Eureka;
namespace Microsoft.AspNetCore.Hosting;

public class Program
{
    public static void Main(string[] args)
    {
        BuildWebHost(args).Run();
    }

    public static IWebHost BuildWebHost(string[] args)
    {
        return WebHost.CreateDefaultBuilder(args)
            .UseUrls("http://localhost:800")
            .ConfigureAppConfiguration((hostingContext, config) =>
            {
                config
                    .SetBasePath(hostingContext.HostingEnvironment.ContentRootPath)
                    .AddJsonFile("appsettings.json", true, true)
                    .AddJsonFile($"appsettings.{hostingContext.HostingEnvironment.EnvironmentName}.json", true,
                        true)
                    .AddJsonFile("ocelot.json", false, false)
                    .AddEnvironmentVariables();
            })
            .ConfigureServices(s =>
            {
                s.AddOcelot().AddCacheManager(x => x.WithDictionaryHandle());
                //.AddEureka()
            })
            .Configure(a =>
            {
                a.UseOcelot().Wait();
            })
            .Build();
    }
}

/*public class Program
{
    public static void Main(string[] args)
    {
        new WebHostBuilder()
        .UseKestrel()
        .UseContentRoot(Directory.GetCurrentDirectory())
        .UseUrls("http://localhost:8000")
        .ConfigureAppConfiguration((hostingContext, config) =>
        {
            config
                .SetBasePath(hostingContext.HostingEnvironment.ContentRootPath)
                .AddJsonFile("appsettings.json", true, true)
                .AddJsonFile($"appsettings.{hostingContext.HostingEnvironment.EnvironmentName}.json", true, true)
                .AddJsonFile("ocelot.json",false, true)
                .AddEnvironmentVariables();
        })
        .ConfigureServices(s =>
        {
            s.AddOcelot();//.AddEureka();
        })
        .ConfigureLogging((hostingContext, logging) =>
        {
                //add your logging
        })
        //.UseIISIntegration()
        .Configure(app =>
        {
            app.UseOcelot();//.Wait();
            
        })
        .Build()
        .Run();
    }
}*/