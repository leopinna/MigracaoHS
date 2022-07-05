import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'
import {LOV}  from '@src/APL/Componentes/LOV.js'


const SelectListaLojas = "select%20c.praca_cod||' - '||c.sigla_cod%20sg%2Cc.descr_gl%20descr%2C%20ls.ccusto_gl_cod%20ccusto%2C%20c.praca_cod%20praca%20from%20hs.loja_star%20ls%2C%20ccusto%20c%20where%20ls.ccusto_gl_cod%20%253D%20c.ccusto_gl_cod%20and%20c.is_ativo%20%3D%20%27S%27%20order%20by%201"

/* const fetchLoja = (async () => {
  const resp = await fetch(baseURL.concat(`HSQuery/${SelectListaLojas}`))
  const json = await resp.json()
  setLoj(json)
})

useEffect(() => {
  fetchLoja()
  console.log(`UseEffect:${loj}`)
 // fetchDataInicio()
}, []) */

/* function quadro() {
const respQuadro =  (fetch(baseURL.concat(GetQuadroHoras)))
   // const json =  resp.json()
    console.log(respQuadro.json)
} */

const AusenciaFunc = () => {
    return (
        <div>
    
          <Card>
            <CardHeader>
              <CardTitle>Ausencia</CardTitle>
            </CardHeader>
            <CardBody>  
              <LOV id='selLoja' colFiltro='SG' placeholder='Escolha na lista' label="LOJA" query={SelectListaLojas} />
        </CardBody>
          </Card>
        </div>
      )

}
export default AusenciaFunc