using System;
using System.Collections;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace HS.Util.Pessoa.Models
{
    public class Empresa
    {
        [Key]
         public int? EmpresaNum { get; set; }
         public string CgcBase { get; set; }
         public string CodFiscalEstrangeiro { get; set; }
         public DateTime DtIncl { get; set; }
         public DateTime DtUltAtual { get; set; }
         public int EmpresaBaseCiNum { get; set; }
         public int EmpresaContabSg { get; set; }
         public int FuncInclNum { get; set; }
         public int FuncUltAtualNum { get; set; }
         public char? IsImportaPgeRi { get; set; }
         public char? IsMontaRelogio { get; set; }
         public string? RazaoSocial { get; set; }
         public string RegimeTributarioCod { get; set; }
         public char TipoEmpresa { get; set; }
         public int UsuarioInclNum { get; set; }
         public int UsuarioUltAtualNum { get; set; }
    }
}