import axios from 'axios'

/* SELECTs utilizados */
//const SelectListaLojas = "select c.descr_gl sg, ls.ccusto_gl_cod ccusto, c.praca_cod praca from hs.loja_star ls, ccusto c where ls.ccusto_gl_cod %3D c.ccusto_gl_cod and c.is_ativo = 'S' order by 1"
const SelectListaLojas = "select%20c.praca_cod||' - '||c.sigla_cod%20sg%2Cc.descr_gl%20descr%2C%20ls.ccusto_gl_cod%20ccusto%2C%20c.praca_cod%20praca%20from%20hs.loja_star%20ls%2C%20ccusto%20c%20where%20ls.ccusto_gl_cod%20%253D%20c.ccusto_gl_cod%20and%20c.is_ativo%20%3D%20%27S%27%20order%20by%201"
//const SelectSemanasStar = "s"
const BaseURL = 'http://din512.hstern.com.br:4100/HSQuery/'


//date.clone().startOf
export let ListaLojas = []
export const DiasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

// ** Get initial Data
axios.get("".concat(BaseURL, SelectListaLojas), 
    {headers: {"Access-Control-Allow-Origin": "*"} })
    .then(response => {
        ListaLojas = response.data
})

export  const cols = [
    { name:"", selector: row => row.id},  
    { name:"", selector: row => row.nome},
    { name:"1", selector: row => row.d1},
    { name:"2", selector: row => row.d2},
    { name:"3", selector: row => row.d3},
    { name:"4", selector: row => row.d4},
    { name:"5", selector: row => row.d5},
    { name:"6", selector: row => row.d6},
    { name:"7", selector: row => row.d7}
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
