using System;
using System.Collections;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace HS.Util.Pessoa.Models
{
    public class TelPessoa
    {   
        [Key]
        public int? PessoaNum { get; set; }

        [Key]
        public int? TelPessoaSeq { get; set; }
        public string Ddd { get; set; }
        public string Ddi { get; set; }
        public DateTime? DtIncl { get; set; }
        public DateTime? DtUltAtual { get; set; }
        public int? FuncInclNum { get; set; }
        public int? FuncUltAtualNum { get; set; }
        public DateTime HorPrefContato { get; set; }
        public char? IsAceitaContato { get; set; }
        public char? IsAtivo { get; set; }
        public char? IsPrefContato { get; set; }
        public char? IsTelOrigemSite { get; set; }
        public char LocalTel { get; set; }
        public int Numero { get; set; }

        public int Ramal { get; set; }
        public char TipoTel { get; set; }
        public int? UsuarioInclNum { get; set; }
        public int UsuarioUltAtualNum { get; set; }
    }
}