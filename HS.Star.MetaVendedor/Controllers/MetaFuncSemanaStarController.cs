using HS.Star.MetaVendedor.Models;
using Microsoft.AspNetCore.Mvc;

namespace HS.Star.MetaVendedor.Controllers;

[ApiController]
[Route("StarMetaFuncionario")]

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

    [HttpPost]
    [Route("/MetaFunc/Get")]
    public  async Task<ActionResult<IEnumerable<MetaFuncSemanaStar>>> GetByFuncLojaPeriodo( [FromBody] Parametros parametros)
    {
        
        var xpto =  _metaContext.MetaFuncSemanaStars.ToList();
                    //.Where(m => (m.FuncNum == parametros.funcNum) &&
                    //            m.AnoNum == parametros.ano &&
                    //            m.CcustoGlCod == parametros.ccustoGlCod &&
                    //            m.SemanaNum == parametros.semana)
                    

        return xpto is null?  NotFound(StatusCodes.Status400BadRequest) : Ok(xpto);
        /* var meta =   _metaContext.MetaFuncSemanaStars
                        .Where(m => m.FuncNum == funcNum)
                        .ToArray();
        
        return Ok(meta);         */
    }

    [HttpPost]
    [Route("/MetaFunc/metas")]
    public async Task<ActionResult> PostMeta([FromBody] List<MetaFuncSemanaStar>  metaFuncSemana)
    {
        _metaContext.MetaFuncSemanaStars.AddRange(metaFuncSemana);
        await _metaContext.SaveChangesAsync();
        return Ok();
    }
}