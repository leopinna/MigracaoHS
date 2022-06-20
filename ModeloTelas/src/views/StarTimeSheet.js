// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'

// ** Table Data & Columns
import { data, columns } from '../APL/STAR/data'

// ** Add New Modal Component
import  StarModalTimeSheet  from './StarModalTimeSheet'
import  {ListaLojas, dadosTS, cols, DiasSemana} from '../APL/STAR/StarTimeSheetDados'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, Calendar, Search } from 'react-feather'

// ** Reactstrap Imports
import {
  Card,
  Input,
  Button,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown,
  InputGroup
} from 'reactstrap'

import AutoComplete from '@components/autocomplete'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check-input'>
    <Input type='radio' ref={ref} {...props} />
  </div>
))

let SelectCalendario = ""

const BaseURL = "http://dev.hstern.com.br:4100/HSQuery/"
const SelectListaLojas = "select%20c.praca_cod||' - '||c.sigla_cod%20sg%2Cc.descr_gl%20descr%2C%20ls.ccusto_gl_cod%20ccusto%2C%20c.praca_cod%20praca%20from%20hs.loja_star%20ls%2C%20ccusto%20c%20where%20ls.ccusto_gl_cod%20%253D%20c.ccusto_gl_cod%20and%20c.is_ativo%20%3D%20%27S%27%20order%20by%201"
SelectCalendario = "select%20dt_inicio_semana%20from%20calendario_star%20where%20ano_num=^%20and%20semana_num=~%20and%20dt_inicio_semana%20<=%20dt_fim_semana"
const GetQuadroHoras = "MetaVendedor/GetQuadroHoras/CcustoGlCod={0}&Ano={1}&Semana={2}"
const AnoCorrente = new Date().getFullYear()
let ano = 0
let semana = 0


const StarTimeSheet = () => {
  // ** States
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [loj, setLoj] = useState([])
  const [label, setLabel] = useState([cols])
  const [quadro, setQuadro] = useState([])
  //const [lojaSelecionada, setLojaSelecionada] = useState()
  //const [semana, setSemana] = useState(0)
  //const [ano, setAno] = useState(0)
  //const [loja, setLoja] = useState(null)

 // console.log(data)
  //const [searchValue, setSearchValue] = useState('')
  //const [filteredData, setFilteredData] = useState([])
  const fetchLoja = (async () => {
    const resp = await fetch(BaseURL.concat(SelectListaLojas))
    const json = await resp.json()
    setLoj(json)
  })

  const fetchDataInicio = (async () => {
    let queryDiaSemana = SelectCalendario
    queryDiaSemana = queryDiaSemana.replace("^", ano)
    queryDiaSemana = queryDiaSemana.replace("~", semana)
    console.log(queryDiaSemana)

    const resp = await fetch(BaseURL.concat(queryDiaSemana))
   // console.log(`RESP:${resp}`)
    const dataInicio = await resp.json()//[0]["DT_INICIO_SEMANA"]
    console.log("************************")
    console.log(new Date(dataInicio[0].DT_INICIO_SEMANA))
    
    const dataAux = new Date(dataInicio[0].DT_INICIO_SEMANA)
    const dtInicio = new Date(dataAux)
    let dia = 0
    let diaSemana = 0
    let mes = 0
    console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;")
    
    for (let index = 0; index < 7; index++) {


       dtInicio.setDate(dataAux.getDate() + index)
      // dataAux = dtInicio

       dia = new Date(dtInicio).getDate()
       diaSemana = new Date(dtInicio).getDay()
       mes = new Date(dtInicio).getMonth() + 1
/*        console.log("+++++++++++++++++++++++++")
       console.log(dia)
       console.log(dataAux)
       console.log(dtInicio)
       console.log(index)
       console.log("+++++++++++++++++++++++++") */
       console.log(`${String(dia).padStart(2, '0')  }/${  String(mes).padStart(2, '0')  }\n${  DiasSemana[diaSemana]}`)
       cols[index + 2].name = `${String(dia).padStart(2, '0')  }/${  String(mes).padStart(2, '0')  }\n${  DiasSemana[diaSemana]}`
      
    }
    //console.log("------------------------------------------------------------------")
    //console.log(cols)
    setLabel([])
    setLabel(cols)

    const ccusto_gl_cod = loj[document.getElementById("selLoja")]
    let auxQuadroHoras = GetQuadroHoras
    auxQuadroHoras = auxQuadroHoras.replace("{0}", ccusto_gl_cod)
    auxQuadroHoras = auxQuadroHoras.replace("{1}", ano)
    auxQuadroHoras = auxQuadroHoras.replace("{2}", semana)

    console.log(auxQuadroHoras)
    const respQuadro = await fetch(BaseURL.concat(auxQuadroHoras))
    console.log("-------------------------------- ---------------------")
    console.log(respQuadro)

    setQuadro([])
    setQuadro(respQuadro)


  })
  
  function validate(e) {
    console.log(`ID:${e.target.id}`)
      if (e.target.id === 'semana') {
        if (e.target.value < 1 || e.target.value > 52) console.log('Semana Inválida')
        else {
          semana = e.target.value
          console.log(`S:${semana} / ${e.target.value}`)
        }
        if (e.target.value === null) semana = 0
      }
          
      if (e.target.id === 'ano') {
        if (e.target.value === null) ano = 0 

        if (String(e.target.value).length === 4) {
          console.log(`V:${e.target.value}`)
          console.log(`D:${AnoCorrente}`)
          if (e.target.value < 2019 || e.target.value > AnoCorrente) console.log('Ano Inválido')
          else {
            ano = e.target.value
            console.log(`A:${ano} / ${e.target.value}`)
          }
        } else console.log("ZEROU")//setAno(0)
      }

      console.log(`SA:${semana} / ${ano}`)
      if (semana > 0 && ano > 0) fetchDataInicio()
  }

  useEffect(() => {
      fetchLoja()
     // fetchDataInicio()
  }, [])

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)

/*  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value) 

    const status = {
      1: { title: 'Current', color: 'light-primary' },
      2: { title: 'Professional', color: 'light-success' },
      3: { title: 'Rejected', color: 'light-danger' },
      4: { title: 'Resigned', color: 'light-warning' },
      5: { title: 'Applied', color: 'light-info' }
    }

    if (value.length) {
      updatedData = data.filter(item => {
        const startsWith =
          item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.post.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.age.toLowerCase().startsWith(value.toLowerCase()) ||
          item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
          item.start_date.toLowerCase().startsWith(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.full_name.toLowerCase().includes(value.toLowerCase()) ||
          item.post.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.age.toLowerCase().includes(value.toLowerCase()) ||
          item.salary.toLowerCase().includes(value.toLowerCase()) ||
          item.start_date.toLowerCase().includes(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }
 */
  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount= {1} //{1 ? Math.ceil(filteredData.length / 7) : Math.ceil(data.length / 7) || 1}
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      nextLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakLinkClassName='page-link'
      previousLinkClassName='page-link'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
    />
  )

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }


  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }
 // console.log(ListaLojas)
 // console.log(columns)
 // console.log(dadosTS)
// console.log("LOJArray:".concat(loj))

  return (
    <Fragment>
      <Card  className='flex-md-column flex-column align-md-items-center border-bottom' /*' align-items-start  ' */> 
            <AutoComplete
              id='selLoja'  
              name='lovloja'
              suggestions={loj}
              filterKey='SG'
              placeholder='Selecione a Loja'
              suggestionLimit={6}
              className='form-control lov'
              //onSuggestionItemClick={(url, e) => valorcampo(url, e)} //{(e) => valorcampo(e)}
             //onBlur={(e) => valorcampo(e)}
              
            />

         <InputGroup className='align-items-start d-flex mt-md-0 mt-1' >
{/*              <InputGroupText>
              <Calendar size={15} />   Mês/Ano  
            </InputGroupText> */}
            <Input className='d-flex flex-column align-md-items-center form-control' id='ano' min="2019" type="number" size="4" placeholder='Selecione o ano' 
            onChange={(e) => validate(e)}
           // onClear={setAno(0)}
            />
            <span className='align-middle ms-50'></span>
            <Input className='d-flex flex-column align-md-items-center form-control' id='semana' placeholder='Selecione a semana' 
              onChange={(e) => validate(e)} 
              //onClear={setSemana(0)}
              min="1" max="52" sixe="2" required/>
            

           </InputGroup>
      </Card>
      
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <div className='d-flex mt-md-0 mt-1'>
            <Button className='ms-2' color='primary' onClick={handleModal}>
              <Plus size={15} />
              <span className='align-middle ms-50'>Alterar</span>
            </Button>
            <UncontrolledButtonDropdown>
              <DropdownToggle color='secondary' caret outline>
                <Share size={15} />
                <span className='align-middle ms-50'>Exportar</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className='w-100'>
                  <Printer size={15} />
                  <span className='align-middle ms-50'>Print</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => downloadCSV(data)}>
                  <FileText size={15} />
                  <span className='align-middle ms-50'>CSV</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Grid size={15} />
                  <span className='align-middle ms-50'>Excel</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <File size={15} />
                  <span className='align-middle ms-50'>PDF</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Copy size={15} />
                  <span className='align-middle ms-50'>Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>
        </CardHeader>
{/*         <Row className='justify-content-end mx-0'>
          <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
            <Label className='me-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter mb-50'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row> */}
        <div className='react-dataTable'>
          <DataTable
            //noHeader
            pagination
            selectableRows
            columns={label}
            paginationPerPage={7}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            //data={searchValue.length ? filteredData : data}
            data={quadro}
            //selectableRowsComponent={BootstrapCheckbox}
          />
        </div>
      </Card>
      <StarModalTimeSheet open={modal} handleModal={handleModal} />
    </Fragment>
  )
}
export default StarTimeSheet