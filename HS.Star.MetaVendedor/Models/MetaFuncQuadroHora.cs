using System;
using System.Collections.Generic;

namespace HS.Star.MetaVendedor.Models
{
    public partial class MetaFuncQuadroHora
    {
        public int MetaFuncQuadroHorasId { get; set; }
        public short Dia { get; set; }
        public string? Justificativa { get; set; }
        public double QtdHorasPrevista { get; set; }
        public double QtdHorasRealizada { get; set; }
      //  public DateTime DtIncl { get; set; }
      //  public DateTime DtUltAtual { get; set; }
        public int UsuarioInclNum { get; set; }
        public int UsuarioUltAtualNum { get; set; }
        public int MetaFuncSemanaStarId { get; set; }

       // public virtual MetaFuncSemanaStar MetaFuncSemanaStar { get; set; } = null!;
    }
}
