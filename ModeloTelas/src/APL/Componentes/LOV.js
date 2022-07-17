import {Col, InputGroup, Label} from 'reactstrap'
import AutoComplete from '@components/autocomplete'
import PropTypes from 'prop-types'
import { useState, Fragment, useEffect } from 'react'
import { X } from 'react-feather'


//const ListaValores = props => {
  export default function ListaValores(props) {

  const [valListaSelec, setvalListaSelec] = useState()
  let sel

  console.log(".......................................")
 
  useEffect(() => {
    console.log(`ValorSelecionadoLOV:${valListaSelec}`)
    //XPTO(valListaSelec)
  }, [valListaSelec])


  const valSelecionado = (item) => {
      sel = item
      setvalListaSelec(sel)  
      console.log(`Item:${item}`) 
      console.log(`LOV:${sel}`)
      console.log(`ValorState:${valListaSelec}`)
      //XPTO(sel)
  
      props.x(sel)
      console.log('props obj:', props)
  }

  const valorLOV = (item) => {
  }

  return (
    <Fragment>
      <Col className='sm-3'>
          <InputGroup>
            <Label className='form-label' size='sm'>
              {props.label}
            </Label>
            <AutoComplete
              id={props.id}  
              suggestions={props.lista}
              filterKey={props.colFiltro}
              placeholder={props.placeholder}
              suggestionLimit={8}
              className='form-control lov'
              selectedValue={valSelecionado}
              //onBlur={props.onBlur}         
              //autoFocus={true}
              //onChange={e => onChange(e)} 
            />
          </InputGroup>
          {/* {props.valorLov(valor)} */}
      </Col>
    </Fragment>
  )
}

//export default ListaValores

/* ListaValores.propTypes = {
  id: PropTypes.string.isRequired,
  colFiltro: PropTypes.string.isRequired,
  lista: PropTypes.array,
  valorLOV: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  query: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  x: PropTypes.func
  } */