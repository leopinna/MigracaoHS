
var builder = WebApplication.CreateBuilder(args);
string url = builder.Configuration.GetValue<string>("UrlDeploy:PROD");

// Add services to the container.

// Injetando as dependências do banco de dados

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen((config =>
                            {
                                config.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "HS Query", Version = "v1" });
                            })
  );

builder.Services.AddCors(opt =>
        {
            opt.AddPolicy(name: "API_CORS", b =>
            {
                b.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    url = builder.Configuration.GetValue<string>("UrlDeploy:DSV");
    app.UseSwaggerUI(config =>
                    {
                        config.SwaggerEndpoint("/swagger/v1/swagger.json", "HS Query");
                        config.RoutePrefix = "";
                    });
}

app.UseSwagger();
app.UseCors("API_CORS");



//app.UseHttpsRedirection();

//app.UseAuthorization();

# region "Mapeamentos"
string cs = builder.Configuration.GetConnectionString("ORCL");



app.MapGet("HSQuery/{SQL}", (string SQL) =>
    {
        QueryHelper x = new QueryHelper();
        return x.ExecutaQuery(SQL, cs).ToList();
    }
);

# endregion "Mapeamentos"

//app.MapControllers();
app.Run();
