using Swashbuckle.AspNetCore.Swagger;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen((config =>
  {
      config.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Serv 1", Version = "v1" });
  }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseSwagger();

if (app.Environment.IsDevelopment())
{
    app.UseSwaggerUI(config =>
{
    config.SwaggerEndpoint("/swagger/v1/swagger.json", "Payment Card Info API");
    config.RoutePrefix = "";
});
}

//app.UseHttpsRedirection();

//app.UseAuthorization();

app.MapControllers();

app.Run();
