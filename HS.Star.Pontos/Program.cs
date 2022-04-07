using HS.Star.Pontos;

var builder = WebApplication.CreateBuilder(args);
string url = builder.Configuration.GetValue<string>("UrlDeploy:PROD");

// Add services to the container.

// Injetando as dependências do banco de dados

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen((config =>
                            {
                                config.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Pontos Star - Valor Ponto Loja", Version = "v1" });
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
                    config.SwaggerEndpoint("/swagger/v1/swagger.json", "Pontos Star - Valor Ponto");
                    config.RoutePrefix = "";
                });


//app.UseHttpsRedirection();

//app.UseAuthorization();

# region "Mapeamentos"
string cs = builder.Configuration.GetConnectionString("ORCL");


app.MapGet("Pontos/GetAll",() =>
    {
        ValorPontoLojaHelper x = new ValorPontoLojaHelper();
        return x.Pontos(cs, String.Empty).ToArray();
    }       
).WithName("GetAll")
.Produces<ValorPontoLoja>(StatusCodes.Status200OK);

app.MapGet("Pontos/GetByCcusto/{ccusto}", (string ccusto) =>
    {
        ValorPontoLojaHelper x = new ValorPontoLojaHelper();
        return x.Pontos(cs, String.Format("and ccusto_gl_cod = '{0}'", ccusto)).ToArray();
    }
).WithName("GetByCcusto")
.Produces<ValorPontoLoja>(StatusCodes.Status200OK);

app.MapGet("Pontos/GetByCcustoAnoMes/{ccusto}/{ano}/{mes}", async (string ccusto, int ano, int mes) =>
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
.Produces<ValorPontoLoja>(StatusCodes.Status200OK);
# endregion "Mapeamentos"

//app.MapControllers();
app.Run();
