// ** React Imports
import { Fragment, useState, forwardRef } from 'react'

// ** Table Data & Columns
import { data, columns } from '../APL/STAR/data'

// ** Add New Modal Component
import  StarModalTimeSheet  from './StarModalTimeSheet'
import  {ListaLojas, dadosTS, cols} from '../APL/STAR/StarTimeSheetDados'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, Calendar } from 'react-feather'

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

const StarTimeSheet = () => {
  // ** States
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  console.log(data)
  //const [searchValue, setSearchValue] = useState('')
  //const [filteredData, setFilteredData] = useState([])

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

  function validate(e) {
      if (e.target.id === 'semana' && (e.target.value < 1 || e.target.value > 52)) console.log('Semana Inválida')
      if (e.target.id === 'ano' && (e.target.value < 2019 || e.target.value > new Date().getFullYear)) console.log('Ano Inválido')
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
  console.log(ListaLojas)
  console.log(columns)
  console.log(dadosTS)
  return (
    <Fragment>
      <Card  className='flex-md-column flex-column align-md-items-center border-bottom' /*' align-items-start  ' */>      
            <AutoComplete
              id="selLoja"  
              suggestions={ListaLojas}
              filterKey='SG'
              placeholder='Selecione a Loja'
              suggestionLimit={6}
              className='form-control lov'
            />
          <InputGroup className='align-items-start d-flex mt-md-0 mt-1' >
{/*             <InputGroupText>
              <Calendar size={15} />   Mês/Ano  
            </InputGroupText> */}
            <Input className='form-control' id='semana' placeholder='Selecione a semana' onChange={(e) => validate(e)} />
            <Input className='form-control' id='ano' placeholder='Selecione o ano' onChange={(e) => validate(e)}/>
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
            columns={cols}
            paginationPerPage={7}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            //data={searchValue.length ? filteredData : data}
            data={dadosTS}
            selectableRowsComponent={BootstrapCheckbox}
          />
        </div>
      </Card>
      <StarModalTimeSheet open={modal} handleModal={handleModal} />
    </Fragment>
  )
}
export default StarTimeSheet