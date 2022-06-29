import { baseURL } from '../utility/Utils'
import { Card, CardHeader, CardTitle } from 'reactstrap'

const GetQuadroHoras = "MetaVendedor/GetQuadroHoras?CcustoGlCod=11252&Ano=2020&Semana=2"


 function quadro() {
const respQuadro =  (fetch(baseURL.concat(GetQuadroHoras)))
   // const json =  resp.json()
    console.log(respQuadro.json)
}

const AusenciaFunc = () => {
    return (
        <div>
    
          <Card>
            <CardHeader>
              <CardTitle>Ausencia</CardTitle>


            </CardHeader>
            <input
        className='btn btn-primary'
        type='submit'
        value='Submit'
        onSubmit={() => quadro()}
        onClick={() => quadro()}
      />
          </Card>
        </div>
      )

}
export default AusenciaFunc