using System;
using System.Collections;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace HS.Util.Pessoa.Models
{
    public class Estab
    {   
        [Key]
        public int EstabNum { get; set; }
        public string CgcComplemento { get; set; }
        public string Cnae { get; set; }
        public string CnpjContador { get; set; }
        public string ContratoShoppingNum { get; set; }
        public string CpfContador { get; set; }
        public DateTime DtAbertLoja { get; set; }
        public DateTime DtFechamento { get; set; }
        public DateTime DtIncl { get; set; }
        public DateTime DtInicioCapta { get; set; }
        public DateTime DtInicioMensageriaCapta { get; set; }
        public DateTime DtInicioNfe { get; set; }
        public DateTime DtUltAtual { get; set; }
        public char EmiteNfceServico { get; set; }
        public int EmpresaNum { get; set; }
        public int EstabContabSg { get; set; }
        public int EstabNfeCod { get; set; }
        public int FuncInclNum { get; set; }
        public int FuncUltAtualNum { get; set; }
        public int IndOperPresencial { get; set; }
        public string InscricaoEstadual { get; set; }
        public string InscricaoMunicipal { get; set; }
        public string InscricaoSuframa { get; set; }
        public char IsAtivoDestino { get; set; }
        public char IsAtivoEmissor { get; set; }
        public char IsDistrib { get; set; }
        public char IsIndustria { get; set; }
        public char IsMtr { get; set; }
        public char IsTaxFree { get; set; }
        public char IsTransportadora { get; set; }
        public string NomeEstabelecimento { get; set; }
        public int QtdMaxItensNf { get; set; }
        public int QtdMaxItensNfc { get; set; }
        public int RegimeTributarioCod { get; set; }
        public string SerieNf { get; set; }
        public string SerieNfce { get; set; }
        public string SerieNfe { get; set; }
        public string SgCapta { get; set; }
        public char TemReservaNfe { get; set; }
        public int UltDocFiscalENum { get; set; }
        public int UltDocFiscalSNum { get; set; }
        public int UltNumeroDocEntregaDomic { get; set; }
        public int UltNumeroNfce { get; set; }
        public int UltNumeroNfe { get; set; }
        public int UltNumeroNotaVenda { get; set; }
        public int UltPreVendaNum { get; set; }
        public int UsuarioInclNum { get; set; }
        public int UsuarioUltAtualNum { get; set; }
        public int ValLimiteDestinatario { get; set; }
        public string VersaoLayoutNfce { get; set; }
        public string VersaoLayoutNfe { get; set; }
    }
}