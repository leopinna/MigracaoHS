import { Card, Container, ModalBody} from "reactstrap"
//import 'bootstrap/dist/css/bootstrap.css'
import DataTable from "react-data-table-component"
import Axios from 'axios'
import React, {useState, useEffect} from 'react'
import AutoComplete from '@components/autocomplete'
import {cols, dadosTS} from '../APL/STAR/TimeSheetDados'

/* const CargaDados = () => {

} */

const AutoCompleteBasic = () => {
  //setSuggestions(fetchTimeSheet())
  const [suggestions, setSuggestions]  = useState([])
  useEffect(() => {
    const axiosConfig = {
          headers: {
              "Content-Type": "application/x-www-form-urlencoded", //'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*"
          }
         } 
         console.log(suggestions.length)
    if (suggestions.length = 0) {     
         const serviceUrl = '/HSQuery/select%20c.descr_gl%20sg%2C%20ls.ccusto_gl_cod%20ccusto%2C%20c.praca_cod%20praca%20from%20hs.loja_star%20ls%2C%20ccusto%20c%20where%20ls.ccusto_gl_cod%20%3D%20c.ccusto_gl_cod%20and%20c.is_ativo%20%3D%20%27S%27%20order%20by%201'
         Axios.defaults.baseURL = 'http://din512.hstern.com.br:4100' 
         //Axios.defaults.headers.options['Content-Type'] = 'application/json;charset=utf-8'
         //Axios.defaults.headers.options['Access-Control-Allow-Origin'] = '*'
         //Axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8'
         //Axios.defaults.headers.get['Access-Control-Allow-Origin'] = 'localhost'
           Axios.get(serviceUrl, axiosConfig)
         .then(resp => {
             setSuggestions(resp.data)
             console.log("APICall")
         })
         .catch(error => {
           console.log("error")
           console.log(error)
         }) 
        }
  }
  )

  return (
    <AutoComplete
      id="selLoja"  
      suggestions={suggestions}
      className='lov'
      filterKey='SG'
      placeholder='Selecione a Loja'
      height='110px'
      //grouped={true}
      //onChange={xpto}
      //suggestionLimit={4}
    />
  )
}

const StarTimesheet = () => {

    const x = 
            <Container className='scrollable-container'>
                <AutoCompleteBasic />
                    <DataTable columns={cols} data={dadosTS} style="border:1px solid #fff">
                    </DataTable>
            </Container>

    return x
}


export default StarTimesheet
