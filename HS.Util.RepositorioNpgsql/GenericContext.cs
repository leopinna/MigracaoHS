using Microsoft.EntityFrameworkCore;

namespace RepositoryPattern
{
    public class GenericContext<T> : DbContext where T : Entidade
    {
        public DbSet<T> Entity { get; set; }

        // public GenericContext()
        // {
        //     Database.EnsureCreated();//Cria o banco de dados, caso o mesmo não exista
        // }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Database=postgres;Username=postgres;Password=hspgadm");
            base.OnConfiguring(optionsBuilder);
        }
    }
}