using System.ComponentModel.DataAnnotations.Schema;

namespace RepositoryPattern
{
    [Table("Usuario")]
    public class Usuario : Entidade
    {
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Apelido { get; set; }
        public string Email { get; set; }

    }
}