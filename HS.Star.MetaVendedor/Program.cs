using System.Reflection;
using HS.Star.MetaVendedor.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<postgresContext>();
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen((config =>
                            {   config.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Pontos Star - Meta Vendedor", Version="v1"});
                                var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                                config.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory.ToLower(), xmlFilename.ToLower()));
                            })
  );

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseSwagger();
app.UseSwaggerUI(config =>
                {
                    //config.SwaggerEndpoint("/swagger/v1/swagger.json", "Pontos Star - Meta Vendedor");
                    config.SwaggerEndpoint("/swagger/v1/swagger.json", "Pontos Star - Meta Vendedor");
                    config.RoutePrefix = "";
                });


//app.UseHttpsRedirection();

//app.UseAuthorization();

app.MapControllers();

app.Run();
