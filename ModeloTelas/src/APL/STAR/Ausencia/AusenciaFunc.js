import { Card, CardBody, CardHeader, CardTitle, InputGroup, Button, Input, Row, Label, Col, Container, Form } from 'reactstrap'
import ListaValores  from '../../Componentes/LOV'
//src\APL\Componentes\LOV.js
import { Fragment, useState, useEffect, useRef } from 'react'
import { baseURL } from '../../../utility/Utils'
import  pt from 'flatpickr/dist/l10n/pt'
//import "flatpickr/dist/themes/material_blue.css"
import 'flatpickr/dist/themes/dark.css'

import Flatpickr from "react-flatpickr"
import { Calendar, Plus, Minus } from 'react-feather'
import DataTable from 'react-data-table-component'


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
const SelectListaFunc = "select%20a.apelido%20APELIDO%2Ca.nome%20NOME%2Ca.func_num%20IDFUNC%20from%20v_func_alocacao%20a%2C%20ccusto%20c%20where%20a.praca_cod%3Dc.praca_cod%20and%20a.sigla_cod%20%3D%20c.sigla_cod%20and%20c.ccusto_gl_cod%3D%27{0}%27"
//"select%20a.func_num%20IDFUNC%2C%20a.nome%20NOME%2C%20a.apelido%20APELIDO%20from%20v_func_alocacao%20a%20where%20a.praca_cod%7C%7C%27%20-%20%27%7C%7Ca.sigla_cod%20%3D%20%27{0}%27"

/* function quadro() {
const respQuadro =  (fetch(baseURL.concat(GetQuadroHoras)))
   // const json =  resp.json()
    console.log(respQuadro.json)
} */

export default function AusenciaFunc () {
  const [loj, setLoj] = useState([])
  const [vendedor, setVendedor] = useState([])
  const [vendedorSelecionado, setVendedorSelecionado] = useState()
  const [lojaSelecionada, setLojaSelecionada] = useState()
  const [ausencia, setAusencia] = useState()

  const [formObject, setFormObject] = useState({
    loja: '',
    vendedor: '',
    dt_inicio: '',
    dt_fim: '',
    motivo: '',
    justificativa: ''
  })

  const [ausenciaAnterior, setAusenciaAnterior] = useState([])
  const lblAusenciaAnterior = [
    { name:"Vendedor", selector: row => row.vendedor},
    { name:"Início", selector: row => row.dt_inicio},
    { name:"Fim", selector: row => row.dt_fim},
    { name:"Motivo", selector: row => row.motivo},
    { name:"Justificativa", selector: row => row.justificativa}
]

  const [funcionario] = [{IDFUNC: '8691', NOME: 'Leonardo', APELIDO: 'LEO'}, {IDFUNC: '3483', NOME: 'Marcelo Cavichioli', APELIDO: 'CAVI'}]
  const fp = useRef(null)

   async function fetchLoja () {
    //console.log(baseURL.concat(`HSQuery/${SelectListaLojas}`))
    const resp =  await fetch(baseURL.concat(`HSQuery/${SelectListaLojas}`))
  
     if (resp.ok) {
        const lojas =  await resp.json()
        console.log("<LOJAS>", lojas)
        setLoj(lojas)
        //setVendedor(lojas)
     } else console.log(`ERRO:${(resp.text())}`)
  
     return resp
  }
  
 async function fetchVendedor () {
    try {
      //const paramLojaSelecionada = lojaSelecionada.replaceAll(" ", "%20")
      const ccustoGlCod = loj[loj.findIndex(p => p.SG === document.getElementById("selLoja").value)].CCUSTO
      console.log('<LOJ>:', lojaSelecionada)
      console.log('<CCUSTO>:', ccustoGlCod)
      const auxSelectListaFunc = SelectListaFunc.replace("{0}", ccustoGlCod)
      //document.getElementById("selLoja").value
      console.log(baseURL.concat(`HSQUERY/${auxSelectListaFunc}`))
      const resp =  await fetch(baseURL.concat(`HSQuery/${auxSelectListaFunc}`))
      //console.log(`RESP:${(resp.json())}`)

      if (resp.ok) {
          const func =  await resp.json()
          if (func.length > 0) {
            console.log("VENDEDOR:", func)
            setVendedor(func)
          } else {
            console.log("VAZIO", func)
            setVendedor([])
          }
      } else console.log(`ERRO VENDEDOR:${(resp.text)}`)
    } catch (error) {
      console.log("ERRO:", error)
      return null
    }
     
    return null      
  }

  useEffect(() => {
    fetchLoja()
  }, []) 

  useEffect(() => {
/*     SelectListaFunc = SelectListaFunc.replace("{0}", lojaSelecionada)
    console.log(`select:${(SelectListaFunc)}`) */
    if (lojaSelecionada !== undefined && lojaSelecionada.length > 6) {
        console.log(`Effect FUNC:${lojaSelecionada}`)
        fetchVendedor()
    }
    console.log("=========================================")
   // fetchDataInicio()
  }, [lojaSelecionada]) 


  const handleSubmit = () => {
    console.log("<FORM>:", vendedorSelecionado)
    console.log("<FORM>:", lojaSelecionada)
    console.log("<FORM>:", ausencia)
    console.log("<FP>:", fp.selectedDates)



    formObject.loja = lojaSelecionada
    formObject.vendedor = vendedorSelecionado
    formObject.motivo = ausencia

    setFormObject({...formObject})

    
    console.log("Form:", formObject)
    alert(JSON.stringify(formObject, null, '  '))
  }

  //console.log("Watch:", watch("justificativaAusencia"))

  const Ausencias = () => {
    //console.log(`LabelQuadro:${(label)}`)
    return (ausenciaAnterior &&
      <div>
        <hr/>
        <DataTable
          columns={lblAusenciaAnterior}
          data={ausenciaAnterior}
          responsive={true}
        />
      </div>
    )
  }


  return (
        <Fragment>
          <Container>
          <Card>
            <CardBody >
            <Form onSubmit={handleSubmit}>

              <ListaValores id='selLoja' colFiltro='SG' placeholder='Escolha na lista' label="LOJA" lista={loj} x={setLojaSelecionada} 
              className='form-control'/>

              <ListaValores id='selFunc' colFiltro='APELIDO' placeholder='Escolha o vendedor' label="VENDEDOR" lista={vendedor} x={setVendedorSelecionado} 
              className='form-control pb-md-3'/>

              <Row>
                <InputGroup >
                  <Calendar  size={32}/>
                  <Label className='form-label' for="periodoAusencia" >PERÍODO</Label>
                 <Flatpickr  options={options} ref={fp} className='form-control flatpicker-input' name="periodoAusencia" onChange={e => console.log(e.selectedDates)}/>
                 </InputGroup>
              </Row>

                <ListaValores  id='selTipoAusencia'  colFiltro='tipo' placeholder='Selecione o tipo da ausência' label="MOTIVO" lista={TiposAusencia} x={setAusencia} 
                className='pb-md-3'/>

              <Label className='form-label' for="justificativaAusencia" >JUSTIFICATIVA</Label>
                      <Input  className='form-control' type="text" placeholder='' required={true} onChange={e => setFormObject({ justificativa: e.target.value })}/>

                <Button  color='primary' id="submitAusencia" type='submit'>SALVAR</Button>
                </Form>
            </CardBody>
          </Card>
          </Container>

            <Ausencias />
        </Fragment>
      )

}
//export default AusenciaFunc