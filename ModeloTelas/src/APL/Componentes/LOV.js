import {Col, InputGroup, Button} from 'reactstrap'
import AutoComplete from '@components/autocomplete'
import PropTypes from 'prop-types'
import { baseURL } from '../../utility/Utils'
import { useState, useEffect } from 'react'

/* => ({id, lista, colFiltro, placeholder, label, query, onChange}) */
export const LOV = props => {
  //const [listaValores, setListaValores] = useState([])
  let listaValores = props.lista

  console.log(".......................................")
  //console.log(props.onChange())

  console.log(props.colFiltro)
  if (typeof props.lista !== 'undefined') {
    console.log(`LISTA:${props.lista}`)
    //setListaValores(lista)
    //listaValores = lista
  } else {  
    if (typeof props.query !== 'undefined') {
      console.log(`QUERY:${props.query}`)
      const fetchLista = (async () => {
        const resp = await fetch(baseURL.concat(`HSQuery/${props.query}`))
        const json = await resp.json()
        console.log(`JSON:${json}`)
        listaValores = json
        //setListaValores(json)
      })
    
      useEffect(() => {
        fetchLista()
        console.log(`UseEffect:${listaValores}`)
      // fetchDataInicio()
      }, [])
    }
  }

  return (
    <Col className='sm-3'>
        <InputGroup>
          <Button color='primary' className='hs_label'>
            {props.label}
          </Button>
          <AutoComplete
            id={props.id}  
            suggestions={props.lista}
            filterKey={props.colFiltro}
            placeholder={props.placeholder}
            suggestionLimit={8}
            className='form-control lov'
            //autoFocus={true}
            //onChange={e => onChange(e)} 
          />
        </InputGroup>
    </Col>
  )
}

export default LOV

LOV.propTypes = {
  id: PropTypes.string.isRequired,
  colFiltro: PropTypes.string.isRequired,
  lista: PropTypes.array,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  query: PropTypes.string,
  onChange: PropTypes.func
}