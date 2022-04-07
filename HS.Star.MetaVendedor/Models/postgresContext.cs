using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace HS.Star.MetaVendedor.Models
{
    public partial class postgresContext : DbContext
    {
        public postgresContext()
        {
        }

        public postgresContext(DbContextOptions<postgresContext> options)
            : base(options)
        {
        }

        public virtual DbSet<FuncLojaSemanaStar> FuncLojaSemanaStars { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("Host=localhost;Database=postgres;Username=postgres;Password=hspgadm");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresExtension("pg_catalog", "adminpack")
                .HasPostgresExtension("oracle_fdw");

            modelBuilder.Entity<FuncLojaSemanaStar>(entity =>
            {
                entity.HasKey(e => e.FuncLojaSemanaStarNum)
                    .HasName("func_loja_semana_star_pk");

                entity.ToTable("func_loja_semana_star", "HS");

                entity.HasIndex(e => new { e.CcustoGlCod, e.AnoNum, e.SemanaNum, e.FuncNum }, "func_loja_semana_star_uk")
                    .IsUnique();

                entity.Property(e => e.FuncLojaSemanaStarNum).HasColumnName("func_loja_semana_star_num");

                entity.Property(e => e.AnoNum).HasColumnName("ano_num");

                entity.Property(e => e.CcustoGlCod)
                    .HasMaxLength(5)
                    .HasColumnName("ccusto_gl_cod");

                entity.Property(e => e.DtIncl).HasColumnName("dt_incl");

                entity.Property(e => e.DtUltAtual).HasColumnName("dt_ult_atual");

                entity.Property(e => e.FuncNum).HasColumnName("func_num");

                entity.Property(e => e.IsFuncArredondamento)
                    .HasMaxLength(1)
                    .HasColumnName("is_func_arredondamento");

                entity.Property(e => e.SemanaNum).HasColumnName("semana_num");

                entity.Property(e => e.TipoFuncNum).HasColumnName("tipo_func_num");

                entity.Property(e => e.UsuarioInclNum).HasColumnName("usuario_incl_num");

                entity.Property(e => e.UsuarioUltAtualNum).HasColumnName("usuario_ult_atual_num");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
