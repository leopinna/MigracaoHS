using System;
using System.Collections.Generic;

namespace HS.Star.MetaVendedor.Models
{
    public partial class RegDiarioFuncStar
    {
        public int RegDiarioFuncStarId { get; set; }
        public DateOnly DtAtendimento { get; set; }
        public int MetaFuncSemanaStarId { get; set; }
        public int QtdApproaches { get; set; }
        public int QtdApproachesVenda { get; set; }
        public int QtdClientesAntigos { get; set; }
        public int QtdClientesAntigosVenda { get; set; }
        public int QtdClientesNovos { get; set; }
        public int QtdClientesNovosVenda { get; set; }
        public int QtdPassesDados { get; set; }
        public int QtdPassesDadosVenda { get; set; }
        public int QtdPassesRecebidos { get; set; }
        public int? QtdPassesRecebidosGerente { get; set; }
        public int QtdPassesRecebidosVenda { get; set; }
        public int QtdPool { get; set; }
        public int QtdTransacoesOutrasLojas { get; set; }
        public DateOnly DtIncl { get; set; }
        public DateOnly DtUltAtual { get; set; }
        public int UsuarioInclNum { get; set; }
        public int UsuarioUltAtualNum { get; set; }
    }
}
