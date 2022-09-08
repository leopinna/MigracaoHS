import {Label} from 'reactstrap'
import AutoComplete from '@components/autocomplete'
import PropTypes from 'prop-types'
import { useState, Fragment, useEffect } from 'react'


//const ListaValores = props => {
  export default function ListaValores  (props) {

  const [valListaSelec, setvalListaSelec] = useState()
  let sel

/*   useEffect(() => {
    console.log(`ValorSelecionadoLOV:${valListaSelec}`)
    //XPTO(valListaSelec)
  }, [valListaSelec]) */


  const valSelecionado = (item) => {
      sel = item
      setvalListaSelec(sel)  
     // console.log(`LOV:${sel}`)
  
      props.x(sel)
      //console.log('props obj:', props)
  }

  return (
    <Fragment>
            <Label className='form-label' for={props.id}>
              {props.label}
            </Label>
            <AutoComplete
              id={props.id}  
              suggestions={props.lista}
              filterKey={props.colFiltro}
              placeholder={props.placeholder}
              suggestionLimit={8}
              className='form-control'
              selectedValue={valSelecionado}
            />
    </Fragment>
  )
}

//export default ListaValores

 ListaValores.propTypes = {
  id: PropTypes.string.isRequired,
  colFiltro: PropTypes.string.isRequired,
  lista: PropTypes.array.isRequired,
  valorLOV: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  query: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  x: PropTypes.func
  } 