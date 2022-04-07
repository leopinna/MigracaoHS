namespace RepositoryPattern
{
    class Program
    {
        static void Main(string[] args)
        {
            var usuario = new Usuario
            {
                Nome = "Teste",
                Sobrenome = "Teste"
            };

            Irepositorio<Usuario> repositorioUsuarios = new Repositorio<Usuario>();
            repositorioUsuarios.Inserir(usuario);


            var resultado = repositorioUsuarios.PesquisarTodos();
        }
    }
}