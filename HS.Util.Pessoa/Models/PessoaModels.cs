using System;
using System.Collections;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace HS.Util.Pessoa.Models
{
    public class PessoaModels
    {
        [Key]
        public int? PessoaNum {get; set;}
         public string Apelido { get; set; }
         public int CasamentoAno { get; set; }
         public int CasamentoDia { get; set; }
         public int CasamentoMes { get; set; }
         public int ClienteSiteNum { get; set; }
         public string CodCapta { get; set; }
         public string Cpf { get; set; }
         public string Custid { get; set; }
         public string DocEstrangeiro1 { get; set; }
         public string DocEstrangeiro2 { get; set; }
         public DateTime? DtCadastro { get; set; }
         public DateTime DtCasamento { get; set; }
         public DateTime DtCobrancaRespCli { get; set; }
         public DateTime DtEnvioCapta { get; set; }
         public DateTime DtExpedicaoRg { get; set; }
         public DateTime? DtIncl { get; set; }
         public DateTime DtNasc { get; set; }
         public DateTime DtProposta { get; set; }
         public DateTime? DtUltAtual { get; set; }
         public DateTime DtValidadePassaporte { get; set; }
         public string Email { get; set; }
         public string EmailDocumentos { get; set; }
         public string EmailNfe { get; set; }
         public char EstadoCivil { get; set; }
         public int FuncInclNum { get; set; }
         public int FuncNum { get; set; }
         public int FuncUltAtualNum { get; set; }
         public string FxPot { get; set; }
         public int Idade { get; set; }
         public string IdiomaCod { get; set; }
         public char? IsAceitaEmail { get; set; }
         public char? IsAgencia { get; set; }
         public char? IsAtivo { get; set; }
         public char? IsBanco { get; set; }
         public char? IsBaseHistorica { get; set; }
         public char? IsCalcPotencial { get; set; }
         public char IsCliente { get; set; }
         public char? IsComissExt { get; set; }
         public char? IsContato { get; set; }
         public char? IsEnderecoFornecido { get; set; }
         public char? IsEnderecoInconsistente { get; set; }
         public char? IsEstab { get; set; }
         public char? IsEstrangeiro { get; set; }
         public char? IsFicticio { get; set; }
         public char? IsForn { get; set; }
         public char? IsFunc { get; set; }
         public char? IsFuncCoirma { get; set; }
         public char? IsGuia { get; set; }
         public char? IsHotel { get; set; }
         public char? IsListaNegra { get; set; }
         public string IsPossuiNif { get; set; }
         public char? IsProspect { get; set; }
         public char? IsRp { get; set; }
         public char? IsTc { get; set; }
         public char? IsVendedorCoirma { get; set; }
         public int MedidaNum { get; set; }
         public char MotivoExclusaoCalcPotencial { get; set; }
         public int NascAno { get; set; }
         public int NascDia { get; set; }
         public int NascMes { get; set; }
         public string Nif { get; set; }
         public string? Nome { get; set; }
         public string OrgaoExpedidorRg { get; set; }
         public int PaisClienteNum { get; set; }
         public int PaisCoirmaCod { get; set; }
         public int PaisEmissorPassaporteNum { get; set; }
         public int? PaisRespClienteNum { get; set; }
         public int? PaisRespNum { get; set; }
         public string Permid { get; set; }
         public string PessoaCoirmaCod { get; set; }
         public string Rg { get; set; }
         public char Sexo { get; set; }
         public string Sobrenome { get; set; }
         public int TitularNum { get; set; }
         public string TratamentoClienteCod { get; set; }
         public string TratamentoCodComplementar { get; set; }
         public int? UsuarioInclNum { get; set; }
         public int UsuarioUltAtualNum { get; set; }
    }
}