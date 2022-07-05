
/* SELECTs utilizados */
//const SelectListaLojas = "select c.descr_gl sg, ls.ccusto_gl_cod ccusto, c.praca_cod praca from hs.loja_star ls, ccusto c where ls.ccusto_gl_cod %3D c.ccusto_gl_cod and c.is_ativo = 'S' order by 1"
const SelectListaLojas = "select%20c.praca_cod||' - '||c.sigla_cod%20sg%2Cc.descr_gl%20descr%2C%20ls.ccusto_gl_cod%20ccusto%2C%20c.praca_cod%20praca%20from%20hs.loja_star%20ls%2C%20ccusto%20c%20where%20ls.ccusto_gl_cod%20%253D%20c.ccusto_gl_cod%20and%20c.is_ativo%20%3D%20%27S%27%20order%20by%201"
//const SelectSemanasStar = "s"

//date.clone().startOf
export const ListaLojas = []
export const DiasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']


export  const cols = [
    { name:"", selector: row => row.id},  
    { name:"", selector: row => row.nome},
    { name:"d1", selector: row => row.d1},
    { name:"d2", selector: row => row.d2},
    { name:"d3", selector: row => row.d3},
    { name:"d4", selector: row => row.d4},
    { name:"d5", selector: row => row.d5},
    { name:"d6", selector: row => row.d6},
    { name:"d7", selector: row => row.d7}
]
export const dadosLBL = [
    {
        id : "1",
        nome : "A",
        d1:"0",
        d2:"4",
        d3:"6"
    },
    {
        id : "2",
        nome : "B",
        d1:"0",
        d5:"4",
        d6:"6"
    }
]

export const dadosTS = [
    {
        id : "1",
        nome : "A",
        d1:"0",
        d2:"4",
        d3:"6"
    },
    {
        id : "2",
        nome : "B",
        d1:"0",
        d5:"4",
        d6:"6"
    },
    {
        id : "4",
        nome : "V",
        d1:"0",
        d2:"4",
        d3:"6",
        d3:"7"
    },
    {
        id : "3",
        nome : "F",
        d1:"0",
        d6:"4",
        d7:"6"
    },
    {
        id : "5",
        nome : "H",
        d4:"0",
        d2:"4",
        d3:"6",
        d4:"6",
        d6:"6",
        d7:"6"
    }
    ]

export const dadosTeste = [
    {
      id: 6,
      nome: "MARCIO JOSE TOREZIN",
      /* ano: 2020,
      semana: 2,
      ccusto: "11252", */
      d1: "",
      d2: "1",
      d3: "1",
      d4: "1",
      d5: "0",
      d6: "0",
      d7: "0"
    },
    {
        id: 9,
        nome: "MARCIO JOSE TOREZIN",
         ano: 2020,
        semana: 2,
        ccusto: "11252", 
        d1: "",
        d2: "1",
        d3: "1",
        d4: "1",
        d5: "0",
        d6: "0",
        d7: "0"
      },
      {
        id: 7,
        nome: "ANDREIA DURAES LEITE",
        d1: [6],
        d2: [0],
        d3: [6],
        d4: [6],
        d5: [6],
        d6: [0],
        d7: [0]
      }
]
