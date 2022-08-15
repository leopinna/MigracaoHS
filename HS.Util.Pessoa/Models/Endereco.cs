using System;
using System.Collections;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace HS.Util.Pessoa.Models
{
    public class Endereco
    {
        [Key]
        public int PessoaNum { get; set; }

        [Key]
         public int EnderecoSeq { get; set; }

         public char AceitaCorresp { get; set; }
         public string Bairro { get; set; }
         public char CargaCep { get; set; }
         public string Cep { get; set; }
         public string Complemento { get; set; }
         public DateTime DtIncl { get; set; }
         public DateTime DtUltAtual { get; set; }
         public char EnderecoPendente { get; set; }
         public int EnderecoSiteId { get; set; }
         public char EnviaCorresp { get; set; }
         public int FuncInclNum { get; set; }
         public int FuncUltAtualNum { get; set; }
         public char IsAtivo { get; set; }
         public char IsMsf { get; set; }
         public string Localidade { get; set; }
         public string Logradouro { get; set; }
         public char MalaDevolvida { get; set; }
         public string Numero { get; set; }
         public char TipoEnderecoCod { get; set; }
         public string TipoLogrCod { get; set; }
         public string UfCod { get; set; }
         public int UsuarioInclNum { get; set; }
         public int UsuarioUltAtualNum { get; set; }
    }
}