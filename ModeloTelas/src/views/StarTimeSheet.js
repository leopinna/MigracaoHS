// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Table Data & Columns

// ** Add New Modal Component
import  StarModalTimeSheet  from './StarModalTimeSheet'
import  {cols, DiasSemana, dadosTeste} from '../APL/STAR/StarTimeSheetDados'
import LOV from '../APL/Componentes/LOV'

// ** Third Party Components
import DataTable from 'react-data-table-component'
import { baseURL } from '../utility/Utils'

// ** Reactstrap Imports
import {
  Col,
  Card,
  Input,
  Button,
  InputGroup} from 'reactstrap'

import AutoComplete from '@components/autocomplete'


let SelectCalendario = ""


const SelectListaLojas = "select%20c.praca_cod||' - '||c.sigla_cod%20sg%2Cc.descr_gl%20descr%2C%20ls.ccusto_gl_cod%20ccusto%2C%20c.praca_cod%20praca%20from%20hs.loja_star%20ls%2C%20ccusto%20c%20where%20ls.ccusto_gl_cod%20%253D%20c.ccusto_gl_cod%20and%20c.is_ativo%20%3D%20%27S%27%20order%20by%201"
SelectCalendario = "select%20dt_inicio_semana%20from%20calendario_star%20where%20ano_num=^%20and%20semana_num=~%20and%20dt_inicio_semana%20<=%20dt_fim_semana"
const QuadroHorasURL = "MetaVendedor/GetQuadroHoras?CcustoGlCod={0}&Ano={1}&Semana={2}"
const AnoCorrente = new Date().getFullYear()
let ano = 0
let semana = 0


const StarTimeSheet = () => {
  // ** States
  const [modal, setModal] = useState(false)
  const [loj, setLoj] = useState([])
  const [label, setLabel] = useState([cols])
  const [quadro, setQuadro] = useState([dadosTeste])
  const [dadosEdicao, setDadosEdicao] = useState([])
  let respQuadro

  const fetchDataInicio = (async () => {
    let queryDiaSemana = SelectCalendario
    queryDiaSemana = queryDiaSemana.replace("^", ano)
    queryDiaSemana = queryDiaSemana.replace("~", semana)
    //console.log(queryDiaSemana)

    const resp = await fetch(baseURL.concat(`HSQuery/${queryDiaSemana}`))
   // console.log(`RESP:${resp}`)
    const dataInicio = await resp.json()//[0]["DT_INICIO_SEMANA"]
    //console.log("************************")
   // console.log(new Date(dataInicio[0].DT_INICIO_SEMANA))
    
    const dataAux = new Date(dataInicio[0].DT_INICIO_SEMANA)
    const dtInicio = new Date(dataAux)
    let dia = 0
    let diaSemana = 0
    let mes = 0
   // console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;")
    
    for (let index = 0; index < 7; index++) {
       dtInicio.setDate(dataAux.getDate() + index)

       dia = new Date(dtInicio).getDate()
       diaSemana = new Date(dtInicio).getDay()
       mes = new Date(dtInicio).getMonth() + 1

       cols[index + 2].name = `${String(dia).padStart(2, '0')  }/${  String(mes).padStart(2, '0')  } ${  DiasSemana[diaSemana]}`
      
    }
    //console.log("------------------------------------------------------------------")
    //console.log(cols)
  
    setLabel([])
    setLabel(cols)
/*     setQuadro([])
    setQuadro(dadosTeste) */
   // console.log(loj)

   // console.log(`INDICE> ${document.getElementById("selLoja").value} / ${loj.findIndex(p => p.SG === document.getElementById("selLoja").value)}`)
    const ccustoGlCod = loj[loj.findIndex(p => p.SG === document.getElementById("selLoja").value)].CCUSTO

    // [document.getElementById("selLoja").value]
    //console.log(`${document.getElementById("selLoja").value}/${  ccustoGlCod  }`)
    let auxQuadroHoras = QuadroHorasURL
    auxQuadroHoras = auxQuadroHoras.replace("{0}", ccustoGlCod)
    auxQuadroHoras = auxQuadroHoras.replace("{1}", ano)
    auxQuadroHoras = auxQuadroHoras.replace("{2}", semana)

    //console.log(auxQuadroHoras)
    respQuadro = await (await fetch(baseURL.concat(auxQuadroHoras))).json()
   // console.log("-------------------------------- ---------------------")
   // console.log(respQuadro)

/*     respQuadro.forEach(q => {
      q.nome = q.nome.split(' ')[0]
    })
   */
    setQuadro([])
    setQuadro(respQuadro)


  })
  
  function validate(e) {
    //console.log(`ID:${e.target.id}`)
      if (e.target.id === 'semana') {
        const campo = document.getElementById("semana")
        if (e.target.value < 1 || e.target.value > 52 || e.target.value === "") {
          campo.style.borderColor = "red"
          campo.style.borderWidth = "1px"
          
          console.log('Semana Inválida')
          campo.setCustomValidity('Inválida')

          campo.innerHTML = "A semana deve estar entre 1 e 52"

          semana = 0
          setQuadro([])
        } else {
          semana = e.target.value
          campo.setCustomValidity("")
          campo.innerText = ""
          campo.style.borderColor = ""
          campo.style.borderWidth = "1px"
          //console.log(`S:${semana} / ${e.target.value}`)
        }
      }
          
      if (e.target.id === 'ano') {
        if (e.target.value === null) ano = 0 

        if (String(e.target.value).length === 4) {
          console.log(`V:${e.target.value}`)
          console.log(`D:${AnoCorrente}`)
          if (e.target.value < 2019 || e.target.value > AnoCorrente) console.log('Ano Inválido')
          else {
            ano = e.target.value
            //console.log(`A:${ano} / ${e.target.value}`)
          }
        } else console.log("ZEROU")//setAno(0)
      }

     // console.log(`SA:${semana} / ${ano}`)
      if (semana > 0 && ano > 0) fetchDataInicio()
  }

    // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)

  
  function editaregistro(e) {
    console.log({modal})
    console.log(e)
    setDadosEdicao(e)
    handleModal()
    //<StarModalTimeSheet open={modal} handleModal={handleModal}/>
  }

  const atlz = (vetor) => {
   // const idQuadro = respQuadro.findIndex(p => p.id === vetor.id)
    //respQuadro[idQuadro] = vetor
    console.log(`Vetor:${vetor}`)
    setQuadro(`Quadro:${respQuadro}`)
  }

  async function fetchLoja () {
    console.log(baseURL.concat(`HSQuery/${SelectListaLojas}`))
    const resp =  await fetch(baseURL.concat(`HSQuery/${SelectListaLojas}`))

     if (resp.ok) {
        const lojas =  await resp.json()
        setLoj(lojas)
     } else console.log(`ERRO:${(resp.text())}`)

     return resp
/*     console.log(baseURL.concat(`HSQuery/${SelectListaLojas}`))
    console.log(`UseEffect:${lojas}`)

    console.log(`Use:${loj}`) */
  }

  useEffect(() => {
    fetchLoja()
   // fetchDataInicio()
}, [])

  return (

    <Fragment>
      <Card className='flex-md-row'>
          {typeof loj !== 'undefined' ? <LOV id='selLoja' lista={loj} colFiltro='SG' placeholder='Escolha na lista' label="LOJA"/> : "Lista de Lojas não carregada"}
{/*         <Col className='sm-3'>
          <InputGroup>
            <Button color='primary'>
              LOJA
            </Button>
            <AutoComplete
              id='selLoja'  
              suggestions={loj}
              filterKey='SG'
              placeholder='Selecione a Loja'
              suggestionLimit={6}
              className='form-control' 
            />
        </InputGroup>
        </Col> */}

        <Col className='sm-3'>

        <InputGroup>
        <Button color='primary' className='hs_label'>
              ANO  |  SEMANA
            </Button>
            <Input  className='form-control' id='ano' min="2019" type="number" size="4" placeholder='Selecione o ano' 
            onChange={(e) => validate(e)} required={true}
          // onClear={setAno(0)}
            />
            <Input className= 'form-control' /* className='d-flex flex-column align-md-items-center form-control' */ id='semana' placeholder='Selecione a semana' 
              onChange={(e) => validate(e)} 
              //onClear={setSemana(0)}
              min="1" max="52" size="2" required={true}/>
          {/* </InputGroup> */}
          </InputGroup>
          </Col> 
      </Card>

      <Card>

        <div>
          <DataTable
            //noHeader
            //pagination
            //selectableRows
            columns={label}
            //paginationPerPage={20}
            //className='react-dataTable'
            //sortIcon={<ChevronDown size={10} />}
            //paginationDefaultPage={currentPage + 1}
            //paginationComponent={CustomPagination}
            //data={searchValue.length ? filteredData : data}
            data={quadro}//{quadro}
            onRowDoubleClicked={(e) => editaregistro(e)}
            responsive={true}
            //selectableRowsComponent={BootstrapCheckbox}
          />
        </div>
      </Card>
     <StarModalTimeSheet open={modal} handleModal={handleModal} registro={dadosEdicao ? dadosEdicao : "Vazio"} labels={cols} xpto={atlz} />
      
    </Fragment>
  )
}
export default StarTimeSheet