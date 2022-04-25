using Dapper;
using HS.Star.Pontos;

internal class ValorPontoLojaHelper
{
///
    public List<ValorPontoLoja> Pontos(string conn_string, string predicado)
    {
        string queryBase = "SELECT ccusto_gl_cod CcustoGlCod, ano_inicio_vigencia_num AnoInicioVigenciaNum, "+
                            "mes_inicio_vigencia_num MesInicioVigenciaNum, val_ponto ValPonto FROM valor_ponto_loja "+
                            "where 1=1 "; 

        queryBase+= predicado;

        using (var con = new Oracle.ManagedDataAccess.Client.OracleConnection(conn_string))
        {
            con.Open();

            var aux = con.Query<ValorPontoLoja>(queryBase).ToList();

            con.Close();

            return aux;
        }
    }
}