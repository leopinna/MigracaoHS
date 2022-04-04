namespace HS.Star.Pontos;
using System.ComponentModel.DataAnnotations.Schema;

public class ValorPontoLoja
{
    public int MesInicioVigenciaNum { get; set; }

    public int AnoInicioVigenciaNum { get; set; }

    public string? CcustoGlCod { get; set; }

    public double ValPonto { get; set; }


}
