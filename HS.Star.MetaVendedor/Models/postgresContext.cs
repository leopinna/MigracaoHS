using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Npgsql;

namespace HS.Star.MetaVendedor.Models
{
    public  class postgresContext : DbContext
    {
        //public postgresContext()
        //{
        //}

        public postgresContext(DbContextOptions<postgresContext> options)
            : base(options)
        {
        }

        public  DbSet<MetaFuncQuadroHora> MetaFuncQuadroHoras { get; set; } = null!;
        public  DbSet<MetaFuncSemanaStar> MetaFuncSemanaStars { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseNpgsql("Host=localhost;Database=postgres;Username=postgres;Password=hspgadm");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresExtension("pg_catalog", "adminpack")
                .HasPostgresExtension("oracle_fdw");

            modelBuilder.Entity<MetaFuncQuadroHora>(entity =>
            {
                entity.HasKey(e => e.MetaFuncQuadroHorasId)
                    .HasName("meta_func_quadro_horas_pk");

                entity.ToTable("meta_func_quadro_horas", "HS");

                entity.Property(e => e.MetaFuncQuadroHorasId).HasColumnName("meta_func_quadro_horas_id");

                entity.Property(e => e.Dia).HasColumnName("dia");

                entity.Property(e => e.DtIncl).HasColumnName("dt_incl").HasDefaultValue(DateTime.UtcNow);

                entity.Property(e => e.DtUltAtual).HasColumnName("dt_ult_atual").HasDefaultValue(DateTime.UtcNow);

                entity.Property(e => e.Justificativa)
                    .HasMaxLength(60)
                    .HasColumnName("justificativa");

                entity.Property(e => e.MetaFuncSemanaStarId).HasColumnName("meta_func_semana_star_id");

                entity.Property(e => e.QtdHorasPrevista).HasColumnName("qtd_horas_prevista");

                entity.Property(e => e.QtdHorasRealizada).HasColumnName("qtd_horas_realizada");

                entity.Property(e => e.UsuarioInclNum).HasColumnName("usuario_incl_num");

                entity.Property(e => e.UsuarioUltAtualNum).HasColumnName("usuario_ult_atual_num");

                /* entity.HasOne(d => d.MetaFuncSemanaStar)
                    .WithMany(p => p.MetaFuncQuadroHoras)
                    .HasForeignKey(d => d.MetaFuncSemanaStarId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("meta_func_quadro_hora_fk01"); */
            });

            modelBuilder.Entity<MetaFuncSemanaStar>(entity =>
            {
                entity.ToTable("meta_func_semana_star", "HS");

                entity.HasIndex(e => new { e.CcustoGlCod, e.FuncNum, e.AnoNum, e.SemanaNum }, "meta_func_semana_star_uk")
                    .IsUnique();

                entity.Property(e => e.MetaFuncSemanaStarId).HasColumnName("meta_func_semana_star_id");

                entity.Property(e => e.AnoNum).HasColumnName("ano_num");

                entity.Property(e => e.CcustoGlCod)
                    .HasMaxLength(5)
                    .HasColumnName("ccusto_gl_cod");

                entity.Property(e => e.DtIncl).HasColumnName("dt_incl").HasDefaultValue(DateTime.UtcNow);

                entity.Property(e => e.DtUltAtual).HasColumnName("dt_ult_atual").HasDefaultValue(DateTime.UtcNow);

                entity.Property(e => e.FuncNum).HasColumnName("func_num");

                entity.Property(e => e.MetaMinimaPrevista).HasColumnName("meta_minima_prevista");

                entity.Property(e => e.MetaMinimaRealizada).HasColumnName("meta_minima_realizada");

                entity.Property(e => e.MetaOuroNobrePrevista).HasColumnName("meta_ouro_nobre_prevista");

                entity.Property(e => e.MetaOuroNobreRealizada).HasColumnName("meta_ouro_nobre_realizada");

                entity.Property(e => e.MetaStarPrevista).HasColumnName("meta_star_prevista");

                entity.Property(e => e.MetaStarRealizada).HasColumnName("meta_star_realizada");

                entity.Property(e => e.SemanaNum).HasColumnName("semana_num");

                entity.Property(e => e.UsuarioInclNum).HasColumnName("usuario_incl_num");

                entity.Property(e => e.UsuarioUltAtualNum).HasColumnName("usuario_ult_atual_num");
            });

            //OnModelCreatingPartial(modelBuilder);
        }

        //partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
