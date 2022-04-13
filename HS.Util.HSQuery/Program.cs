
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


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    url = builder.Configuration.GetValue<string>("UrlDeploy:DSV");
}

app.UseSwagger();
app.UseSwaggerUI(config =>
                {
                    config.SwaggerEndpoint("/swagger/v1/swagger.json", "HS Query");
                    config.RoutePrefix = "";
                });


//app.UseHttpsRedirection();

//app.UseAuthorization();

# region "Mapeamentos"
string cs = builder.Configuration.GetConnectionString("ORCL");



app.MapGet("api/Query/{SQL}", (string SQL) =>
    {
        QueryHelper x = new QueryHelper();
        return x.ExecutaQuery(SQL, cs).ToList();
    }
);

/* app.MapGet("Pontos/GetByCcustoAnoMes/{ccusto}/{ano}/{mes}", async (string ccusto, int ano, int mes) =>
    {
        List<ValorPontoLoja> ListaPontos = new List<ValorPontoLoja>();
        using (var client = new HttpClient())
        {
            
            client.BaseAddress = new Uri("http://"+url+":5010/");
            client.DefaultRequestHeaders.Clear();

            HttpResponseMessage Res = await client.GetAsync("Pontos/GetByCcusto/"+ccusto);

            if (Res.IsSuccessStatusCode)
            {
                ListaPontos = await Res.Content.ReadFromJsonAsync<List<ValorPontoLoja>>();
                return ListaPontos is not null? ListaPontos.Where(x => x.AnoInicioVigenciaNum == ano && x.MesInicioVigenciaNum == mes) : null;
            }
            return null;
        }
    }).WithName("GetByCcustoAnoMes")
.Produces<ValorPontoLoja>(StatusCodes.Status200OK); */
# endregion "Mapeamentos"

//app.MapControllers();
app.Run();
