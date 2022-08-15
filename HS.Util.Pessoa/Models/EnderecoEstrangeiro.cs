using System;
using System.Collections;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace HS.Util.Pessoa.Models
{
    public class EnderecoEstrangeiro
    {
        [Key]
        public int PessoaNum { get; set; }

        [Key]
        public int EnderecoEstrangeiroSeq { get; set; }
        public char AceitaCorresp { get; set; }
        public string Cidade { get; set; }
        public string CidadeEstrangeiro { get; set; }
        public DateTime DtIncl { get; set; }
        public DateTime DtUltAtual { get; set; }
        public char EnderecoPendente { get; set; }
        public char EnviaCorresp { get; set; }
        public string Estado { get; set; }
        public string EstadoProvCod { get; set; }
        public string Etiqueta { get; set; }
        public int FuncInclNum { get; set; }
        public int FuncUltAtualNum { get; set; }
        public char IsAtivo { get; set; }
        public string Logradouro { get; set; }
        public string Logradouro2 { get; set; }
        public char MalaDevolvida { get; set; }
        public string Numero { get; set; }
        public int PaisNum { get; set; }
        public char TipoEnderecoCod { get; set; }
        public int UsuarioInclNum { get; set; }
        public int UsuarioUltAtualNum { get; set; }
        public string Zip { get; set; }
        public string Zipcode { get; set; }
        
    }
}