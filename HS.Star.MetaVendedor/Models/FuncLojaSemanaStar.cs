using System;
using System.Collections.Generic;

namespace HS.Star.MetaVendedor.Models
{
    public partial class FuncLojaSemanaStar
    {
        public int FuncLojaSemanaStarNum { get; set; }
        public int AnoNum { get; set; }
        public string CcustoGlCod { get; set; } = null!;
        public int FuncNum { get; set; }
        public string IsFuncArredondamento { get; set; } = null!;
        public int SemanaNum { get; set; }
        public int TipoFuncNum { get; set; }
        public DateOnly DtIncl { get; set; }
        public DateOnly DtUltAtual { get; set; }
        public int UsuarioInclNum { get; set; }
        public int UsuarioUltAtualNum { get; set; }
    }
}
