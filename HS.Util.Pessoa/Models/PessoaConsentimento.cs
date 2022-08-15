using System;
using System.Collections;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace HS.Util.Pessoa.Models
{
    public class PessoaConsentimento
    {
        [Key]
        public int? PessoaNum { get; set; }

        [Key]
        public int? PessoaConsSeq { get; set; }
        public DateTime DtIncl { get; set; }
        public DateTime DtResposta { get; set; }
        public DateTime DtSolicitacao { get; set; }
        public DateTime DtUltAtual { get; set; }
        public int FuncInclNum { get; set; }
        public int FuncRespostaNum { get; set; }
        public int FuncSolicitacaoNum { get; set; }
        public int FuncUltAtualNum { get; set; }
        public char IsAceitaEntrEncomenda { get; set; }
        public char IsAceitaInfoComercial { get; set; }
        public int LocalSolicitacaoNum { get; set; }
        public string NomeArquivo { get; set; }
        
        //public  PdfConsentimento { get; set; }
        public int UsuarioInclNum { get; set; }
        public int UsuarioUltAtualNum { get; set; }

    }
}