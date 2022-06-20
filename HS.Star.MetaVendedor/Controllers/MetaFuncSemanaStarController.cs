using HS.Star.MetaVendedor.Models;
using Microsoft.AspNetCore.Mvc;

namespace HS.Star.MetaVendedor.Controllers;


[ApiController]
[Route("MetaVendedor")]

public class MetaFuncSemanaStarController : Controller
{
    
    private postgresContext _metaContext;

    public MetaFuncSemanaStarController(postgresContext context)
    {
        _metaContext = context;
    }

    public class Parametros{
        public int? FuncNum { get; set; }
        public string? CcustoGlCod { get; set; }
        public int Ano { get; set; }
        public int Semana { get; set; }
    }

    /// <summary>
    ///     Meta do vendedor da Loja, no Ano e Semana
    /// </summary>
    /// <remarks>
    ///     Abaixo segue o modelo de chamada: 
    ///{
    ///     "funcNum": 1000,
    ///     "ccustoGlCod": "10252",
    ///     "ano": 2022,
    ///     "semana": 1
    /// } 
    /// </remarks>
    [HttpGet]
    [Route("GetMetaVendedor")]
    public   ActionResult<IList<MetaFuncSemanaStar>> GetByFuncLojaPeriodo( [FromBody] Parametros parametros)
    {
        var xpto =  _metaContext.MetaFuncSemanaStars
                    .Where(m => (m.FuncNum == parametros.FuncNum) &&
                                m.AnoNum == parametros.Ano &&
                                m.CcustoGlCod == parametros.CcustoGlCod &&
                                m.SemanaNum == parametros.Semana)
                    .ToList();

        return xpto is null?  NotFound(StatusCodes.Status400BadRequest) : Ok(xpto);
    }


    /// <summary>
    ///     Cadastra as horas semanais de cada vendedor. Pode ser enviado
    ///     mais de um registro simultaneamente
    /// </summary>
    /// <remarks>
    /// ex.:   List /<MetaFuncSemanaStar/>  
    ///         veja modelo abaixo na área de parâmetros
    ///  
    /// </remarks>
    [HttpPost]
    [Route("AtualizaQuadroHoras")]
    public async Task<ActionResult> CadastraHoraPrevista([FromBody] List<MetaFuncSemanaStar>  metaFuncSemana)
    {
        try
        {
            var regUpd = metaFuncSemana.Where(f => f.MetaFuncSemanaStarId == 0);

            var regIns = metaFuncSemana.Where(f => f.MetaFuncSemanaStarId != 0);

            if (regUpd.Count() > 0)
                _metaContext.MetaFuncSemanaStars.UpdateRange(regUpd);

            if (regIns.Count() > 0)
                _metaContext.MetaFuncSemanaStars.AddRange(regIns);

            if (regUpd.Count() > 0 || regIns.Count() > 0)
                await _metaContext.SaveChangesAsync();

            return Ok();       
        }
        catch (System.Exception)
        {
            return Problem();
        }

    }

    
    /// <summary>
    ///     Grava as alterações realizadada no quadro de horas
    /// </summary>
    /// <remarks>
    ///   
    /// } 
    /// </remarks>
    [HttpGet]
    [Route("GetQuadroHoras")]
    public   ActionResult<IList<MetaFuncSemanaStar>> QuadroHorasPrevistas( [FromQuery] Parametros parametros)
    {
/*         var xpto =   _metaContext.MetaFuncSemanaStars
                    .Select(s => new {s.MetaFuncSemanaStarId, s.MetaFuncQuadroHoras, s.AnoNum,s.CcustoGlCod,s.SemanaNum})
                    .Where(m => m.AnoNum == parametros.Ano &&
                                m.CcustoGlCod == parametros.CcustoGlCod &&
                                m.SemanaNum == parametros.Semana)
                    .ToList(); */

         var quadro = (from qd in _metaContext.MetaFuncSemanaStars
                    join f in _metaContext.Func
                    on qd.FuncNum equals f.FuncNum
                    select new {
                        Nome = String.Format("{0} {1}", f.Nome, f.Sobrenome),
                        Id = qd.MetaFuncSemanaStarId,
                        Quadro = qd.MetaFuncQuadroHoras,
                        Ano = qd.AnoNum,
                        Semana = qd.SemanaNum,
                        Ccusto = qd.CcustoGlCod
                    }).Where(q => q.Ano == parametros.Ano &&
                        q.Ccusto == parametros.CcustoGlCod &&
                        q.Semana== parametros.Semana)
                    .ToList(); 


        return quadro is null?  NotFound(StatusCodes.Status400BadRequest) : Ok(quadro);
    }

    [HttpGet]
    [Route("IsAlive")]
    public string IsAlive()
    {
        try
        {
           return _metaContext.Database.CanConnect() ? "Sucesso" : "Banco de dados não acessível.";
           
        }
        catch (System.Exception ex) 
        {
            return String.Format("Erro: {0} - {1}",StatusCodes.Status500InternalServerError.ToString(),ex.Message);
        }
    }
}