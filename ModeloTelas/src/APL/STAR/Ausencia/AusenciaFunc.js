import { Card, CardBody, CardHeader, CardTitle, InputGroup, Button, Input, Row, Label, Col } from 'reactstrap'
import ListaValores  from '../../Componentes/LOV'
//src\APL\Componentes\LOV.js
import { Fragment, useState, useEffect, useRef } from 'react'
import { baseURL } from '../../../utility/Utils'
import { useForm } from 'react-hook-form'
import  pt from 'flatpickr/dist/l10n/pt'
//import "flatpickr/dist/themes/material_blue.css"
import 'flatpickr/dist/themes/dark.css'

import Flatpickr from "react-flatpickr"
import { Calendar } from 'react-feather'


const options = {
  mode: 'range',
  altInputClass: 'hide',
  dateFormat: 'd/m/y',
  minDate: new Date(),
  locale: pt.pt
}

const TiposAusencia = [{tipo: 'Evento'}, {tipo: 'Emprestado'}, {tipo: 'Férias'}, {tipo: 'Folga'}, {tipo: 'Licença'}, {tipo: 'Saída'}, {tipo: 'Transferido'}]

const SelectListaLojas = "select%20c.praca_cod%7C%7C%27%20-%20%27%7C%7Cc.sigla_cod%20sg%2Cc.descr_gl%20descr%2C%20ls.ccusto_gl_cod%20ccusto%2C%20c.praca_cod%20praca%20from%20hs.loja_star%20ls%2C%20ccusto%20c%20where%20ls.ccusto_gl_cod%20%253D%20c.ccusto_gl_cod%20and%20c.is_ativo%20%3D%20%27S%27%20order%20by%201"
/* let SelectListaFunc = "select%20a.func_num||' - '||a.nome%20IDFUNC%2a.func_num%20NUMHS%2a.nome%20NOME%20from%20v_func_alocacao%20a%20" +
"where%201=1%20and%20a.praca_cod||' - '||a.sigla_cod={0}" +
"%20or%20{0}%20is%20null%20order%20by%20a.nome" */
let SelectListaFunc = "select%20a.func_num%20IDFUNC%2C%20a.nome%20NOME%2C%20a.apelido%20APELIDO%20from%20v_func_alocacao%20a%20where%20a.praca_cod%7C%7C%27%20-%20%27%7C%7Ca.sigla_cod%20%3D%20%27{0}%27"

/* function quadro() {
const respQuadro =  (fetch(baseURL.concat(GetQuadroHoras)))
   // const json =  resp.json()
    console.log(respQuadro.json)
} */

export default function AusenciaFunc () {
  const [loj, setLoj] = useState([])
  const [vendedor, setVendedor] = useState([])
  const [lojaSelecionada, setLojaSelecionada] = useState('')
  const [ausencia, setAusencia] = useState('')

  const fp = useRef(null)

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
    console.log('<LOJ>:', loj)
    try {
      //const ccustoGlCod = loj[loj.findIndex(p => p.SG === lojaSelecionada)].CCUSTO
      SelectListaFunc = SelectListaFunc.replace("{0}", lojaSelecionada)
      //document.getElementById("selLoja").value
      console.log(baseURL.concat(`ListaFunc:${SelectListaFunc}`))
      const resp =  await fetch(baseURL.concat(`HSQuery/${SelectListaFunc}`))
    
      if (resp.ok) {
          const func =  await resp.json()
          console.log(`VENDEDOR:${(func)}`)
          setVendedor(func)
      } else console.log(`ERRO VENDEDOR:${(resp.text())}`)
    } catch (error) {
      return null
    }
     
    return null      
  }

  useEffect(() => {
    console.log(`Effect LOJA:${lojaSelecionada}`)
    fetchLoja()
  }, []) 

  useEffect(() => {
    console.log(`Effect FUNC:${lojaSelecionada}`)
/*     SelectListaFunc = SelectListaFunc.replace("{0}", lojaSelecionada)
    console.log(`select:${(SelectListaFunc)}`) */
    if (lojaSelecionada !== '') {
      fetchVendedor()
    }
    console.log("=========================================")
   // fetchDataInicio()
  }, [setLojaSelecionada]) 


  const XPTO = (local) => {
    setLojaSelecionada(local)
  }

  /* Flatpickr.l10n.set(Portuguese)
  Flatpickr.placeholder = 'Informe o período de ausência'
  Flatpickr.options.mode = 'range'
  Flatpickr.options.minDate = 'today' */
 
  return (
        <Fragment>
          <Card>
            <CardBody>  
              <Col className='sm-9 bgapp'>
              {/* <LOV id='selLoja' colFiltro='SG' placeholder='Escolha na lista' label="LOJA" query={SelectListaLojas} /> */}
                <Row className='row-form'>
              {/* <Input  className='form-control' id='loja'  placeholder='Selecione a loja' required={true}/> */}
              <ListaValores id='selLoja' colFiltro='SG' placeholder='Escolha na lista' label="LOJA" lista={loj} x={setLojaSelecionada} /*query={SelectListaLojas} */ 
              XPTO={XPTO} />
              </Row>

              <Row className='row-form'>
                <ListaValores id='selFunc' colFiltro='APELIDO' placeholder='Escolha o vendedor' label="VENDEDOR" lista={vendedor} x={setVendedor} />

              </Row>
              <Row className='row-form'>
                <InputGroup>
                <Label className='form-label' for="periodoAusencia" >PERÌODO</Label>
                 <Flatpickr  options={options} ref={fp} className='form-control' name="periodoAusencia"/>
                 <Calendar size={32}/>
                </InputGroup>
              </Row>

                 <Row className='row-form'>
                <ListaValores id='selTipoAusencia' colFiltro='tipo' placeholder='Selecione o tipo da ausência' label="MOTIVO" lista={TiposAusencia} x={setAusencia} />

              </Row>

              <Row className='row-form'>
              <Label className='form-label' for="justificativaAusencia" >JUSTIFICATIVA</Label>
                  <Input  id="justificativaAusencia" className='form-control' type="text" placeholder='' required={true} />
              </Row>
              </Col>
            </CardBody>
          </Card>
        </Fragment>
      )

}
//export default AusenciaFunc