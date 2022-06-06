using System;
using System.Collections.Generic;

namespace HS.Star.MetaVendedor.Models
{
    public partial class MetaFuncSemanaStar
    {
/*         public MetaFuncSemanaStar()
        {
            MetaFuncQuadroHoras = new HashSet<MetaFuncQuadroHora>();
        } */

        public int MetaFuncSemanaStarId { get; set; }
        public int FuncNum { get; set; }
        public int AnoNum { get; set; }
        public int SemanaNum { get; set; }
        public string CcustoGlCod { get; set; } = null!;
        public int MetaMinimaPrevista { get; set; }
        public int MetaMinimaRealizada { get; set; }
        public int MetaOuroNobrePrevista { get; set; }
        public int MetaOuroNobreRealizada { get; set; }
        public int MetaStarPrevista { get; set; }
        public int MetaStarRealizada { get; set; }
        public DateTime DtIncl { get; set; }
        public DateTime DtUltAtual { get; set; }
        public int UsuarioInclNum { get; set; }
        public int UsuarioUltAtualNum { get; set; }

        public virtual ICollection<MetaFuncQuadroHora> MetaFuncQuadroHoras { get; set; } = default!;
        //public virtual ICollection<RegDiarioFuncStar> RegDiarioFuncStars {get; set;} = default!;
    }
}
