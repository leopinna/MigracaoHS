using Dapper;
using HS.Star.Pontos;

public class ValorPontoLojaHelper
{
///
    //internal string connString = "";
    private string queryBase = "SELECT ccusto_gl_cod CcustoGlCod, ano_inicio_vigencia_num AnoInicioVigenciaNum, " +
                            "mes_inicio_vigencia_num MesInicioVigenciaNum, val_ponto ValPonto FROM valor_ponto_loja " +
                            "where 1=1 ";

    public string? ConnString { get; set; }

    public List<ValorPontoLoja> Pontos(string predicado)
    {
        queryBase+= predicado;

        using (var con = new Oracle.ManagedDataAccess.Client.OracleConnection(ConnString))
        {
            con.Open();

            var aux = con.Query<ValorPontoLoja>(queryBase).ToList();

            con.Close();

            return aux;
        }
    }

    public double Conversao(string CcustoGlCod, int ano, int mes, double ValorEmMoeda, double ValorEmPonto)
    {

        string complemento = String.Format("and ccusto_gl_cod = '{0}'", CcustoGlCod);

        var Ponto = Pontos(complemento)
                    .Where(p => p.AnoInicioVigenciaNum >= ano)
                    .OrderBy(p => p.AnoInicioVigenciaNum & p.MesInicioVigenciaNum)
                    .FirstOrDefault();
        if (ValorEmMoeda > 0 && ValorEmPonto == 0) 
            return Ponto is null ? throw new ArgumentException(String.Format("Não há uma conversão registrada para o período {0}/{1}", ano, mes)) : ValorEmMoeda / Ponto.ValPonto;
        
        if (ValorEmPonto > 0 && ValorEmMoeda == 0)
            return Ponto is null ? throw new ArgumentException(String.Format("Não há uma conversão registrada para o período {0}/{1}", ano, mes)) : ValorEmPonto * Ponto.ValPonto;

        return 0;
    }
    public double ConverteValorEmPonto(string CcustoGlCod, int ano, int mes, double ValorEmMoeda)
    {    
        return Conversao(CcustoGlCod, ano, mes, ValorEmMoeda, 0);
    }

    public double ConvertePontoEmValor(string CcustoGlCod, int ano, int mes, double ValorEmPonto)
    {
        return Conversao(CcustoGlCod, ano, mes, 0, ValorEmPonto);
    }
}