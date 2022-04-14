using Dapper;

internal class QueryHelper
{
    public IList<Object> ExecutaQuery(string SQL, string conn_string)
    {
        //using (IDbConnection cmd = new SqlConnection(ConfigurationManager.ConnectionStrings[DbName].ConnectionString))
        using (var con = new Oracle.ManagedDataAccess.Client.OracleConnection(conn_string))
        {

            if (!SQL.Substring(0, 6).ToUpper().Equals("SELECT"))
                throw new ArgumentException("Tenta de Novo. Esse SQL está errado.'"+SQL.Substring(0, 6).ToUpper()+"'");



            var xpto = con.Query(SQL);
            return xpto.ToList();
            //con.Query(SQL).ToList();
        }
    }
/* 
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
    } */
}