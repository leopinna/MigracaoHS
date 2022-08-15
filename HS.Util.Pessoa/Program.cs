using HS.Util.Pessoa;
using HS.Util.Pessoa.Controller;
using HS.Util.Pessoa.Models;

var builder = WebApplication.CreateBuilder(args);
string url = builder.Configuration.GetValue<string>("UrlDeploy:PROD");

// Add services to the container.

// Injetando as dependências do banco de dados
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
/* builder.Services.AddSwaggerGen((config =>
                            {
                                config.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Pessoa", Version = "v1" });
                            }));*/



builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwaggerUI(config =>
                {
                    config.SwaggerEndpoint("/swagger/v1/swagger.json", "Pessoa");
                    config.RoutePrefix = "";
                });

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    url = builder.Configuration.GetValue<string>("UrlDeploy:DSV");
    
}
app.UseSwagger();
app.UseSwaggerUI(config =>
                {
                    config.SwaggerEndpoint("/swagger/v1/swagger.json", "Pessoa - Pessoa");
                    config.RoutePrefix = "";
                });

//app.UseHttpsRedirection();

//app.UseAuthorization();

# region "Mapeamentos"
//PessoaController p = new PessoaController();
//p.ConnString = builder.Configuration.GetConnectionString("ORCL");


app.MapGet("Pessoa/GetByPessoaNum/{pessoanum}", async (int pessoanum) =>
    {
        List<PessoaModels>? ListaPessoa = new List<PessoaModels>();
        using (var client = new HttpClient())
        {
            
            client.BaseAddress = new Uri("http://"+url+":5060/");
            //client.BaseAddress = new System.Uri("http://10.1.0.143:5060/");
            client.DefaultRequestHeaders.Clear();

            HttpResponseMessage Res = await client.GetAsync("pessoa/"+pessoanum);

            if (Res.IsSuccessStatusCode)
            {
                ListaPessoa = await Res.Content.ReadFromJsonAsync<List<PessoaModels>>();
                return ListaPessoa is not null? ListaPessoa.Where(x => x.PessoaNum == pessoanum) : null;
            }
            return null;
        }
    }).WithName("GetByPessoaNum")
.Produces<PessoaModels>(StatusCodes.Status200OK);
# endregion "Mapeamentos"

//app.MapControllers();


app.Run();