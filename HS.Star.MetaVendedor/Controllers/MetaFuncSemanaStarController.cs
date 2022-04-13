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
        public int funcNum { get; set; }
        public string? ccustoGlCod { get; set; }
        public int ano { get; set; }
        public int semana { get; set; }
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
    [HttpPost]
    [Route("/GetMetaVendedor")]
    public  async Task<ActionResult<IList<MetaFuncSemanaStar>>> GetByFuncLojaPeriodo( [FromBody] Parametros parametros)
    {
        
        var xpto =  _metaContext.MetaFuncSemanaStars
                    .Where(m => (m.FuncNum == parametros.funcNum) &&
                                m.AnoNum == parametros.ano &&
                                m.CcustoGlCod == parametros.ccustoGlCod &&
                                m.SemanaNum == parametros.semana).ToList();


        return xpto is null?  NotFound(StatusCodes.Status400BadRequest) : Ok(xpto);
    }

    [HttpPost]
    [Route("/Metas")]
    public async Task<ActionResult> PostMeta([FromBody] List<MetaFuncSemanaStar>  metaFuncSemana)
    {
        await _metaContext.MetaFuncSemanaStars.AddRangeAsync(metaFuncSemana);
        await _metaContext.SaveChangesAsync();
        return Ok();
    }

    [HttpGet]
    [Route("/IsAlive")]
    public string IsAlive()
    {
        try
        {
           return _metaContext.MetaFuncSemanaStars.FirstOrDefault() is not null ? "Sucesso" : "A tabe META pode estar vazia.";
        }
        catch (System.Exception ex) 
        {
            return String.Format("Erro: {0} - {1}",StatusCodes.Status500InternalServerError.ToString(),ex.Message);
        }
    }
}