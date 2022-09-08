import { api } from "./Config/axiosConfigs"
import { defineCancelApiObject } from "./Config/axiosUtils"

const SelectListaFunc = "select%20a.apelido%20APELIDO%2Ca.nome%20NOME%2Ca.func_num%20IDFUNC%20from%20v_func_alocacao%20a%2C%20ccusto%20c%20where%20a.praca_cod%3Dc.praca_cod%20and%20a.sigla_cod%20%3D%20c.sigla_cod%20and%20c.ccusto_gl_cod%3D%27{0}%27"
let cancelApiObject = {}

export const PessoaAPI = {
    getFuncionariosLoja: async function (codCcusto, cancel = false) {
        let auxSelectListaFunc = null
/*         if (codCcusto != undefined){
            auxSelectListaFunc = SelectListaFunc.replace("{0}", codCcusto)
        } else {
            auxSelectListaFunc = SelectListaFunc.replace("'{0}'", "c.ccusto_gl_cod")
        } */
        auxSelectListaFunc = SelectListaFunc.replace("%27{0}%27", codCcusto ? `%27${codCcusto}%27` : "c.ccusto_gl_cod")
        console.log(auxSelectListaFunc)
        const response = await api.request({
            url: `HSQuery/${auxSelectListaFunc}`,
            method: "GET",
            signal: cancel ? cancelApiObject[this.getFuncionariosLoja.name].handleRequestCancellation().signal : undefined
        })

        return response.data
    },
    getAllFuncionarios: async function (cancel = false) {
        return await PessoaAPI.getFuncionariosLoja("", cancel)
    }
}

// defining the cancel API object for ProductAPI
cancelApiObject = defineCancelApiObject(PessoaAPI)