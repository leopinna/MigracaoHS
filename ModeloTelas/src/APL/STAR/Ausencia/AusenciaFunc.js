import { Card, CardBody, CardHeader, CardTitle, InputGroup, Button, Input, Row } from 'reactstrap'
import {LOV}  from '@src/APL/Componentes/LOV.js'
import { Fragment, useState, useEffect } from 'react'
import { baseURL } from '../../../utility/Utils'

const SelectListaLojas = "select%20c.praca_cod||' - '||c.sigla_cod%20sg%2Cc.descr_gl%20descr%2C%20ls.ccusto_gl_cod%20ccusto%2C%20c.praca_cod%20praca%20from%20hs.loja_star%20ls%2C%20ccusto%20c%20where%20ls.ccusto_gl_cod%20%253D%20c.ccusto_gl_cod%20and%20c.is_ativo%20%3D%20%27S%27%20order%20by%201"
/* let SelectListaFunc = "select%20a.func_num||' - '||a.nome%20IDFUNC%2a.func_num%20NUMHS%2a.nome%20NOME%20from%20v_func_alocacao%20a%20" +
"where%201=1%20and%20a.praca_cod||' - '||a.sigla_cod={0}" +
"%20or%20{0}%20is%20null%20order%20by%20a.nome" */
let SelectListaFunc = "select%20a.func_num%20IDFUNC%2C%20a.nome%20NOME%20from%20v_func_alocacao%20a%20where%20a.praca_cod%7C%7C%27%20-%20%27%7C%7Ca.sigla_cod%20%3D%20%27{0}%27"

/* function quadro() {
const respQuadro =  (fetch(baseURL.concat(GetQuadroHoras)))
   // const json =  resp.json()
    console.log(respQuadro.json)
} */

const AusenciaFunc = () => {
  const [loj, setLoj] = useState([])
  const [vendedor, setVendedor] = useState([])

   async function fetchLoja () {
    console.log(baseURL.concat(`HSQuery/${SelectListaLojas}`))
    const resp =  await fetch(baseURL.concat(`HSQuery/${SelectListaLojas}`))
  
     if (resp.ok) {
        const lojas =  await resp.json()
        setLoj(lojas)
     } else console.log(`ERRO:${(resp.text())}`)
  
     return resp
  }
  
  async function fetchVendedor () {
    console.log(baseURL.concat(`HSQuery/${SelectListaFunc}`))
    const resp =  await fetch(baseURL.concat(`HSQuery/${SelectListaFunc}`))
  
     if (resp.ok) {
        const func =  await resp.json()
        console.log(`VENDEDOR:${(func)}`)
        setVendedor(func)
     } else console.log(`ERRO VENDEDOR:${(resp.text())}`)
  
     return resp
  }

  useEffect(() => {
    fetchLoja()
   // fetchDataInicio()
  }, []) 

  useEffect(() => {
    SelectListaFunc = SelectListaFunc.replace("{0}", document.getElementById("selLoja").value)
    console.log(`select:${(SelectListaFunc)}`)
    fetchVendedor()
    console.log("=========================================")
   // fetchDataInicio()
  }, [loj]) 

/*   function PreparaListaFunc() {
    SelectListaFunc = SelectListaFunc.replace("{0}", document.getElementById("selLoja").value)
    console.log(SelectListaFunc)
    return SelectListaFunc
  } */

  return (
        <div>
    
          <Card>
            <CardHeader>
              <CardTitle>Ausência</CardTitle>
            </CardHeader>
            <CardBody>  
              {/* <LOV id='selLoja' colFiltro='SG' placeholder='Escolha na lista' label="LOJA" query={SelectListaLojas} /> */}
              <Row>
            {/* <Input  className='form-control' id='loja'  placeholder='Selecione a loja' required={true}/> */}
            <LOV id='selLoja' colFiltro='SG' placeholder='Escolha na lista' label="LOJA" lista={loj} /* query={SelectListaLojas} */ 
            /* onChange={() => PreparaListaFunc()}/ *//>

            </Row>

            <Row>
            <Row>
            {/* <Input  className='form-control' id='loja'  placeholder='Selecione a loja' required={true}/> */}
            <LOV id='selFunc' colFiltro='NOME' placeholder='Escolha o vendedor' label="VENDEDOR" lista={vendedor} /* query={SelectListaFunc} */ />

            </Row>
          </Row>
        </CardBody>
          </Card>
        </div>
      )

}
export default AusenciaFunc