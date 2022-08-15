using Dapper;
using HS.Util.Pessoa.Models;

namespace HS.Util.Pessoa.Controller
{
    public class PessoaController
    {
        private string queryBase = "SELECT pessoa_num PessoaNum, apelido Apelido, " +
                               "casamento_ano CasamentoAno, casamento_dia CasamentoDia, " +
                               "casamento_mes CasamentoMes, cliente_site_num ClienteSiteNum, " +
                               "cod_capta CodCapta, cpf Cpf, custid Custid, doc_estrangeiro_1 DocEstrangeiro1, " +
                               "doc_estrangeiro_2 DocEstrangeiro2, dt_cadastro DtCadastro, dt_casamento DtCasamento, " +
                               "dt_cobranca_resp_cli DtCobrancaRespCli, dt_envio_capta DtEnvioCapta, " +
                               "dt_expedicao_rg DtExpedicaoRg, dt_incl DtIncl, dt_nasc DtNasc, dt_proposta DtProposta, " +
                               "dt_ult_atual DtUltAtual, dt_validade_passaporte DtValidadePassaporte, email Email, " + 
                               "email_documentos EmailDocumentos, email_nfe EmailNfe, estado_civil EstadoCivil, " +
                               "func_incl_num FuncInclNum, func_num FuncNum, func_ult_atual_num FuncUltAtualNum, " +
                               "fx_pot FxPot, idade Idade, idioma_cod IdiomaCod, is_aceita_email IsAceitaEmail, " +
                               "is_agencia IsAgencia, is_ativo IsAtivo, is_banco IsBanco, is_base_historica IsBaseHistorica, " +
                               "is_calc_potencial IsCalcPotencial, is_cliente IsCliente, is_comiss_ext IsComissExt, " +
                               "is_contato IsContato, is_endereco_fornecido IsEnderecoFornecido, " +
                               "is_endereco_inconsistente IsEnderecoInconsistente, is_estab IsEstab, " +
                               "is_estrangeiro IsEstrangeiro, is_ficticio IsFicticio, is_forn IsForn, is_func IsFunc,  " +
                               "is_func_coirma IsFuncCoirma, is_guia IsGuia, is_hotel IsHotel, is_lista_negra IsListaNegra, " +
                               "is_possui_nif IsPossuiNif, is_prospect IsProspect, is_rp IsRp, is_tc IsTc, " +
                               "is_vendedor_coirma IsVendedorCoirma, medida_num MedidaNum, " +
                               "motivo_exclusao_calc_potencial MotivoExclusaoCalcPotencial, nasc_ano NascAno, " +
                               "nasc_dia NascDia, nasc_mes NascMes, nif Nif, nome Nome, orgao_expedidor_rg OrgaoExpedidorRg, " +
                               "pais_cliente_num PaisClienteNum, pais_coirma_cod PaisCoirmaCod, " +
                               "pais_emissor_passaporte_num PaisEmissorPassaporteNum, pais_resp_cliente_num PaisRespClienteNum, " +
                               "permid Permid, pessoa_coirma_cod PessoaCoirmaCod, rg Rg, " +
                               "sexo Sexo, sobrenome Sobrenome, titular_num TitularNum, " +
                               "tratamento_cliente_cod TratamentoClienteCod, " +
                               "tratamento_cod_complementar TratamentoCodComplementar, usuario_incl_num UsuarioInclNum, " +
                               "usuario_ult_atual_num UsuarioUltAtualNum FROM pessoa where 1=1 ";
 
        public string? ConnString { get; set; }

        public List<PessoaModels> Pessoa (string predicado)
    {
        queryBase+= predicado;

        using (var con = new Oracle.ManagedDataAccess.Client.OracleConnection(ConnString))
        {
            con.Open();

            var aux = con.Query<PessoaModels>(queryBase).ToList();

            con.Close();

            return aux;
        }
    }

    }
}