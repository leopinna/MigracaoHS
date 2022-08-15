/* eslint-disable multiline-ternary */
// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Table Data & Columns

// ** Add New Modal Component
import  StarModalTimeSheet  from './StarModalTimeSheet'
import  {cols, DiasSemana, dadosTeste} from '../APL/STAR/StarTimeSheetDados'
import ListaValores from '../APL/Componentes/LOV'
import MenuContexto from '../APL/Componentes/MenuContexto'
import {TimeSheetCard} from '../APL/STAR/TimeSheet/TimeSheetCard'

// ** Third Party Components
import DataTable from 'react-data-table-component'
import { baseURL } from '../utility/Utils'
import { Plus } from 'react-feather'

// ** Reactstrap Imports
import {
  Col, Row, Label,
  Card,
  Input,
  Button,
  InputGroup} from 'reactstrap'
  import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
  import { Navigation, Pagination, Virtual, A11y } from 'swiper'
  import 'swiper/swiper-bundle.css' // core Swiper
  //import 'swiper/swiper.scss'
  import 'swiper/modules/navigation/navigation.scss' // Navigation module
import 'swiper/modules/pagination/pagination.scss' // Pagination module
import InputNumber from 'rc-input-number'

  let SelectCalendario = ""


const SelectListaLojas = "select%20c.praca_cod||' - '||c.sigla_cod%20sg%2Cc.descr_gl%20descr%2C%20ls.ccusto_gl_cod%20ccusto%2C%20c.praca_cod%20praca%20from%20hs.loja_star%20ls%2C%20ccusto%20c%20where%20ls.ccusto_gl_cod%20%253D%20c.ccusto_gl_cod%20and%20c.is_ativo%20%3D%20%27S%27%20order%20by%201"
SelectCalendario = "select%20dt_inicio_semana%20from%20calendario_star%20where%20ano_num=^%20and%20semana_num=~%20and%20dt_inicio_semana%20<=%20dt_fim_semana"
const QuadroHorasURL = "MetaVendedor/GetQuadroHoras?CcustoGlCod={0}&Ano={1}&Semana={2}"
const AnoCorrente = new Date().getFullYear()
const AnoMinimo = AnoCorrente - 3
let ano = 0
let semana = 0


const StarTimeSheet = () => {
  // ** States
  const [modal, setModal] = useState(false)
  const [loj, setLoj] = useState([])
  const [label, setLabel] = useState([cols])
  const [quadro, setQuadro] = useState([dadosTeste])
  const [dadosEdicao, setDadosEdicao] = useState([])
  const [formato, setFormato] = useState(true)
  const [lojaSelecionada, setLojaSelecionada] = useState('')

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

       cols[index + 2].name = `${String(dia).padStart(2, '0')  }/${  String(mes).padStart(2, '0')  }`
      /*  ${  DiasSemana[diaSemana] */
    }
    //console.log("------------------------------------------------------------------")
    
  
    setLabel([])
    setLabel(cols)
    console.log("FetchDataInicio:", label)
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
    const campo = document.getElementById(e.target.id)
      if (e.target.id === 'semana') {
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
          if (e.target.value < 2019 || e.target.value > AnoCorrente) {
            campo.style.borderColor = "red"
            campo.style.borderWidth = "1px"
            
            console.log('Ano Inválidoa')
            campo.setCustomValidity('Inválido')
  
            campo.innerHTML =  `O ano deve estar entre ${  AnoMinimo  } e ${  AnoCorrente}`
  
            semana = 0
            setQuadro([])
          } else {
            ano = e.target.value
            
            campo.setCustomValidity("")
            campo.innerText = ""
            campo.style.borderColor = ""
            campo.style.borderWidth = "1px"            
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

const VendedorStar = (q) => {
console.log("VendedorStar")
/*    if (label === null || label === undefined || label.length === 0) {
    console.log("FETCH")
  fetchDataInicio()
  } */
/*            quadro.forEach(e => {
              console.log(`${e.nome} ${e.id}`)
              //<TimeSheetCard id={e.id} vendedor={e} label={label} />
              //<div>"XPTO1234"</div>
              //saida(e)
              //<saida />
              //<Label>DETALHE</Label>
            }
              //<TimeSheetCard id={e.id} vendedor={e} label={label}/>
            )*/

  const labelDia = label
  const listaCard = []
  let item
  console.log("Q", q.quadro)
  console.log("LabelVendedo:", label)
  
  for (item in q.quadro) {
    console.log(`${item} ${q.quadro[item].id} ${q.quadro[item]}`)
      listaCard.push(<TimeSheetCard key={q.quadro[item].id} vendedor={q.quadro[item]} label={labelDia}/>) 
     // <TimeSheetCard id={quadro[item].id} vendedor={quadro[item]} label={labelDia} />
    } 
    console.log("Cards:", listaCard)

    return (listaCard)
}

const QuadroHorarios = () => {
  //console.log(`LabelQuadro:${(label)}`)
  console.log('LabelQuadro:', label)
  return (
    <div>
      <DataTable
        columns={label}
        data={quadro}
        onRowDoubleClicked={(e) => editaregistro(e)}
        responsive={true}
      />
    </div>)
}


  return (

    <Fragment>
       <Card className='flex-md-row'>
          {typeof loj !== 'undefined' ? 
          <Col className='px-2'>
          <ListaValores id='selLoja' lista={loj} colFiltro='SG' placeholder='Escolha na lista' label="LOJA" x={setLojaSelecionada}/>
          </Col>
           : "Lista de Lojas não carregada"}

        <Col className='sm-3  px-3'>

            <Label className='form-label'>ANO</Label>
{/*             <InputNumber
                        min={2019}
                        max={2022}
                        upHandler={<Plus size={32}/>}
                        //className='form-control'
                        defaultValue={AnoCorrente}
                        downHandler={<Minus size={32}/>}
                       // onChange={(e) => validate(e)}
                      /> */}
             <Input  className='form-control' id='ano' min={AnoMinimo} max={AnoCorrente} type="number" size="4" placeholder='Selecione o ano' 
            onChange={(e) => validate(e)} required={true}/> 
          </Col>
          
          <Col sm="3" className='px-3'>
            <Label className='form-label'>SEMANA</Label>
            <Input className= 'form-control' id='semana' placeholder='Selecione a semana' type='number'
              onChange={(e) => validate(e)} 
              //onClear={setSemana(0)}
              min="1" max="52" size="2" required={true}/>
          </Col> 

          <Col className='sm-3 d-inline pt-2'>
            <Col className='xs-2 d-inline'>BÁSICO</Col>
            <Col className='sm-4 form-switch d-inline'>
           <Input type='checkbox' id='switch-primary' name='tipoSaida' onChange={(e) => setFormato(e.target.checked) } defaultChecked /> 
           </Col>
           <Col className='xs-2 d-inline'>MODERNO</Col>
          </Col>
          <Col sm="1">
                      <MenuContexto />
          </Col>
          
      </Card>

      <Card className='flex-md-row'>
      {/* <InputNumber id="anoID" min="2019" max="2022" controls={true}>S E M A</InputNumber> */}
          {typeof quadro !== 'undefined' ? 
            formato ? 
            <Swiper
            modules={[Navigation, Pagination, Virtual, A11y]}
      spaceBetween={100}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      //scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      virtual
      //onSlideChange={() => console.log('slide change')}
    >

            {quadro.map((reg, idx) => {
               return       <SwiperSlide> <TimeSheetCard   key={idx} vendedor={reg} label={label} /> </SwiperSlide>
               //console.log("E:", reg) 
              }) 
          }
              <SwiperSlide> <Plus size={64} color='primary'/> </SwiperSlide>
              </Swiper>
                        //
            //console.log("E:", e) }
            //{ quadro.map(e => {<TimeSheetCard {...e} />} , quadro) } 
              //<VendedorStar quadro={quadro}/> 
            : <QuadroHorarios /> : "Quadro não carregada"}
        {/* <QuadroHorarios /> */}     
      </Card>
     <StarModalTimeSheet open={modal} handleModal={handleModal} registro={dadosEdicao ? dadosEdicao : "Vazio"} labels={cols} xpto={atlz} />
      
    </Fragment>
  )
}
export default StarTimeSheet