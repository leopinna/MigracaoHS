import { api } from "./Config/axiosConfigs"
import { defineCancelApiObject } from "./Config/axiosUtils"

const SelectListaLojas = "select%20c.praca_cod%7C%7C%27%20-%20%27%7C%7Cc.sigla_cod%20sg%2Cc.descr_gl%20descr%2C%20ls.ccusto_gl_cod%20ccusto%2C%20c.praca_cod%20praca%20from%20hs.loja_star%20ls%2C%20ccusto%20c%20where%20ls.ccusto_gl_cod%20%253D%20c.ccusto_gl_cod%20and%20c.is_ativo%20%3D%20%27S%27%20order%20by%201"
// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(StarAPI)

export const StarAPI = {
    get: async function (name, cancel = false) {
        const response = await api.request({
            url: `${SelectListaLojas}`,
            method: "GET",
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined
        })

        return response.data
    },
    getPaginated: async function ({ limit, offset }, cancel = false) {
        const response = await api.request({
            url: "/pokemon/",
            method: "GET",
            params: {
                limit: limit,
                offset: offset
            },
            signal: cancel ? cancelApiObject[this.getPaginated.name].handleRequestCancellation().signal : undefined
        })

        return response.data.results
    }
}

