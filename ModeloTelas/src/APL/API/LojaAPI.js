import { api } from "./Config/axiosConfigs"
import { defineCancelApiObject } from "./Config/axiosUtils"

const SelectListaLojas = "select%20c.praca_cod%7C%7C%27%20-%20%27%7C%7Cc.sigla_cod%20sg%2Cc.descr_gl%20descr%2C%20ls.ccusto_gl_cod%20ccusto%2C%20c.praca_cod%20praca%20from%20hs.loja_star%20ls%2C%20ccusto%20c%20where%20ls.ccusto_gl_cod%20%253D%20c.ccusto_gl_cod%20and%20c.is_ativo%20%3D%20%27S%27%20order%20by%201"
let cancelApiObject = {}

export const LojaAPI = {
    getLojasStar: async function (cancel = false) {
        const response = await api.request({
            url: `HSQuery/${SelectListaLojas}`,
            method: "GET",
            signal: cancel ? cancelApiObject[this.getLojasStar.name].handleRequestCancellation().signal : undefined
        })

        return response.data
    },
    getLojasStarPaginated: async function ({ limit, offset }, cancel = false) {

        const response = await api.request({
            url:  `HSQuery/${SelectListaLojas}`,
            method: "GET",
            params: {
                limit: limit,
                offset: offset
            },
            signal: cancel ? cancelApiObject[this.getLojasStarPaginated.name].handleRequestCancellation().signal : undefined
        })

        return  response.data
    }
}

// defining the cancel API object for ProductAPI
cancelApiObject = defineCancelApiObject(LojaAPI)