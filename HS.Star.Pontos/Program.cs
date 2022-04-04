//using Swashbuckle.AspNetCore.Swagger;
using Dapper;
using HS.Star.Pontos;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Injetando as dependências do banco de dados
//builder.Services.AddDbContext<ORCLContext>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen((config =>
  {
      config.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Pontos Star - Valor Ponto Loja", Version = "v1" });
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
    config.SwaggerEndpoint("/swagger/v1/swagger.json", "Pontos Star - Valor Ponto");
    config.RoutePrefix = "";
});
}

//app.UseHttpsRedirection();

//app.UseAuthorization();

var cs = @"User Id=stkdsv;Password=stkdsv;Data Source=(DESCRIPTION = (ADDRESS_LIST =(ADDRESS = (PROTOCOL=tcp)(HOST=10.1.0.140)(PORT=1532)))(CONNECT_DATA = (SID = hsdsv10g)));";

using var con = new Oracle.ManagedDataAccess.Client.OracleConnection(cs);
con.Open();

var cars = con.Query<ValorPontoLoja>("SELECT ccusto_gl_cod CcustoGlCod, ano_inicio_vigencia_num AnoInicioVigenciaNum, mes_inicio_vigencia_num MesInicioVigenciaNum, val_ponto  FROM valor_ponto_loja where ano_inicio_vigencia_num=2021").ToList();
con.Close();
//cars.ForEach(car => Console.WriteLine(car.ValPonto));
/* using (var d = new ORCLContext())
{
    foreach (var a in d.ValorPontos)
    {
        Console.WriteLine("{0} | Ano", a.AnoInicioVigenciaNum);
    }
} */

 app.MapGet("/cars",() =>
         {
             return cars.ToArray();
         }       
).WithName("Pontos");


//app.MapControllers();
app.Run();
