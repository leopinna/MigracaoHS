import {Col, InputGroup, Button} from 'reactstrap'
import AutoComplete from '@components/autocomplete'
import PropTypes from 'prop-types'
import { baseURL } from '../../utility/Utils'
import { useState, useEffect } from 'react'


export const LOV  = ({id, lista, colFiltro, placeholder, label, query}) => {
  const [listaValores, setListaValores] = useState([])
  console.log(".......................................")
  console.log(lista)
  if (typeof lista !== 'undefined') {
    console.log(`LISTA:${lista}`)
    //setListaValores(lista)
    //listaValores = lista
  } else {  
    if (typeof query !== 'undefined') {
      console.log(`QUERY:${query}`)
      const fetchLista = (async () => {
        const resp = await fetch(baseURL.concat(`HSQuery/${query}`))
        const json = await resp.json()
        console.log(`JSON:${json}`)
        setListaValores(json)
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
          <Button color='primary'>
            {label}
          </Button>
          <AutoComplete
            id={id}  
            suggestions={lista ? lista : listaValores}
            filterKey={colFiltro}
            placeholder={placeholder}
            suggestionLimit={8}
            className='form-control' 
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
  query: PropTypes.string
}