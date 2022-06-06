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

        public virtual DbSet<RegDiarioFuncStar> RegDiarioFuncStars { get; set; } = null!;
        public DbSet<MetaFuncQuadroHora> MetaFuncQuadroHoras { get; set; } = null!;
        public DbSet<MetaFuncSemanaStar> MetaFuncSemanaStars { get; set; } = null!;    

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
/* #warning To protect potentially sensitive information in your connection string, you should move it out of source code. 
#You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - 
#see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263. */
                optionsBuilder.UseNpgsql("Host=localhost;Database=postgres;Username=postgres;Password=hspgadm");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresExtension("pg_catalog", "adminpack")
                .HasPostgresExtension("oracle_fdw");

            modelBuilder.Entity<RegDiarioFuncStar>(entity =>
            {
                entity.ToTable("reg_diario_func_star", "HS");

                entity.HasIndex(e => new { e.MetaFuncSemanaStarId, e.DtAtendimento }, "reg_diario_func_star_uk")
                    .IsUnique();

                entity.Property(e => e.RegDiarioFuncStarId).HasColumnName("reg_diario_func_star_id").UseSerialColumn();

                entity.Property(e => e.DtAtendimento).HasColumnName("dt_atendimento");

                entity.Property(e => e.DtIncl).HasColumnName("dt_incl");

                entity.Property(e => e.DtUltAtual).HasColumnName("dt_ult_atual");

                entity.Property(e => e.MetaFuncSemanaStarId).HasColumnName("meta_func_semana_star_id");

                entity.Property(e => e.QtdApproaches).HasColumnName("qtd_approaches");

                entity.Property(e => e.QtdApproachesVenda).HasColumnName("qtd_approaches_venda");

                entity.Property(e => e.QtdClientesAntigos).HasColumnName("qtd_clientes_antigos");

                entity.Property(e => e.QtdClientesAntigosVenda).HasColumnName("qtd_clientes_antigos_venda");

                entity.Property(e => e.QtdClientesNovos).HasColumnName("qtd_clientes_novos");

                entity.Property(e => e.QtdClientesNovosVenda).HasColumnName("qtd_clientes_novos_venda");

                entity.Property(e => e.QtdPassesDados).HasColumnName("qtd_passes_dados");

                entity.Property(e => e.QtdPassesDadosVenda).HasColumnName("qtd_passes_dados_venda");

                entity.Property(e => e.QtdPassesRecebidos).HasColumnName("qtd_passes_recebidos");

                entity.Property(e => e.QtdPassesRecebidosGerente).HasColumnName("qtd_passes_recebidos_gerente");

                entity.Property(e => e.QtdPassesRecebidosVenda).HasColumnName("qtd_passes_recebidos_venda");

                entity.Property(e => e.QtdPool).HasColumnName("qtd_pool");

                entity.Property(e => e.QtdTransacoesOutrasLojas).HasColumnName("qtd_transacoes_outras_lojas");

                entity.Property(e => e.UsuarioInclNum).HasColumnName("usuario_incl_num");

                entity.Property(e => e.UsuarioUltAtualNum).HasColumnName("usuario_ult_atual_num");

            });

            modelBuilder.Entity<MetaFuncQuadroHora>(entity =>
            {
                entity.HasKey(e => e.MetaFuncQuadroHorasId)
                    .HasName("meta_func_quadro_horas_pk");

                entity.ToTable("meta_func_quadro_horas", "HS");

                entity.Property(e => e.MetaFuncQuadroHorasId).HasColumnName("meta_func_quadro_horas_id").UseSerialColumn();

                entity.Property(e => e.Dia).HasColumnName("dia");

                entity.Property(e => e.DtIncl).HasColumnName("dt_incl");//.HasDefaultValue(DateTime.Today);

                entity.Property(e => e.DtUltAtual).HasColumnName("dt_ult_atual");//.HasDefaultValue(DateTime.Today);

                entity.Property(e => e.Justificativa)
                    .HasMaxLength(60)
                    .HasColumnName("justificativa");

                entity.Property(e => e.MetaFuncSemanaStarId).HasColumnName("meta_func_semana_star_id");

                entity.Property(e => e.QtdHorasPrevista).HasColumnName("qtd_horas_prevista");

                entity.Property(e => e.QtdHorasRealizada).HasColumnName("qtd_horas_realizada");

                entity.Property(e => e.UsuarioInclNum).HasColumnName("usuario_incl_num");

                entity.Property(e => e.UsuarioUltAtualNum).HasColumnName("usuario_ult_atual_num");
            //teste
            //entity.Navigation(e => e.MetaFuncSemanaStar);

            //  entity.HasOne(d => d.MetaFuncSemanaStarId)
            //     .WithMany(p => p.MetaFuncQuadroHoras)
            //     .HasForeignKey(d => d.MetaFuncSemanaStarId)
            //     .OnDelete(DeleteBehavior.ClientSetNull)
            //     .HasConstraintName("meta_func_quadro_hora_fk01"); 
            });

                //modelBuilder.Entity<MetaFuncSemanaStar>().HasMany(d=> d.MetaFuncQuadroHoras);
                modelBuilder.Entity<MetaFuncSemanaStar>(entity =>
                {
                    entity.ToTable("meta_func_semana_star", "HS");

                    entity.HasIndex(e => new { e.CcustoGlCod, e.FuncNum, e.AnoNum, e.SemanaNum }, "meta_func_semana_star_uk")
                        .IsUnique();

                    entity.Property(e => e.MetaFuncSemanaStarId).HasColumnName("meta_func_semana_star_id").UseSerialColumn();

                    entity.Property(e => e.AnoNum).HasColumnName("ano_num");

                    entity.Property(e => e.CcustoGlCod)
                        .HasMaxLength(5)
                        .HasColumnName("ccusto_gl_cod");

                    entity.Property(e => e.DtIncl).HasColumnName("dt_incl");//.HasDefaultValue(DateTime.Today);

                    entity.Property(e => e.DtUltAtual).HasColumnName("dt_ult_atual");//.HasDefaultValue(DateTime.Today);

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

                //entity.HasMany(q => q.MetaFuncQuadroHoras);
                    entity.Navigation(e => e.MetaFuncQuadroHoras).AutoInclude();
                   // entity.Navigation(r=> r.RegDiarioFuncStars).AutoInclude();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
