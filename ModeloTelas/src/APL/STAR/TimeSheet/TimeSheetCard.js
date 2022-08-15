import { Fragment } from "react"
import { Card, Col, InputGroup, Label, Row, Button, Input, CardGroup, InputGroupText } from "reactstrap"
import { Plus, Minus, Star, Circle } from "react-feather"
import Avatar from '@components/avatar'
import avatarImg from '../../../assets/images/portrait/small/user-07.jpg' //'@src/assets/images/portrait/small/user-07.jpg'

const pathImg =    'src/assets/images/Avatar/128.jpg' //'src\assets\images\Avatar'
// '@src/assets/images/Avatar/'
//src\APL\STAR\TimeSheet
//src\assets\images\Avatar
const Meta = props => {
    const val = Math.floor(Math.random() * (3 - 0)) + 0
    return (
        <Fragment>
            <Col className="sm-3">
                <h5 className="text-center titulo">Meta</h5>
                {val === 0 ? <Star size={32} color='gold'/> : val === 1 ? <Circle size={32} color='red'/> : <Circle size={32} color='black'/>}
                
            </Col>
        </Fragment>
    )
}

{ /* <div className='cart-item-qty'>
<InputNumber
  min={1}
  max={10}
  upHandler={<Plus />}
  className='cart-input'
  defaultValue={item.qty}
  downHandler={<Minus />}
/>
</div> */ }
const Dias = props => {
    //console.log("PROPDIAS : ", props)
    const { label, indice, vendedor } = props
    const detalheDias = (l, i) => {
        console.log("DetalheDias : ", l, i)
        const valor = 'vendedor.d'.concat(i)
        console.log("Valor : ", valor, eval(valor))

        return (
        <InputGroup>
        <InputGroupText style={{height: "1em", justifyItems:"center", marginTop: "24px"}} /* name={`btn${key[i]}`} */>
            {l}
        </InputGroupText>

        <Input  style={{fontSize: "initial"}} className='form-control mt-1' /* name={`inp${key[i]}`} */ defaultValue={eval(valor)} />
{/*          <Button color="primary" size="xs">+</Button>
        <Button color="primary" size="xs">-</Button> */}
        </InputGroup> 

        
    )
    }   
    return label.name ? detalheDias(label.name, indice) : null
}

export  const TimeSheetCard = (props) => {
 //   const listaLabelDias = [props.label]
    //console.log("PROPS : ", props)
 //return <h2>{props.vendedor.nome}</h2>
    return (
        <Fragment>
            <Col  className="card-vendedor-timesheet">
                <Card >
                <Row>
                    <Col xs="3">
                    <Avatar img={require('@src/assets/images/Avatar/user01.jpg').default} size='xs'/>
                    </Col>
                    <Col className="mt-1 sm-9 titulo">
                        <h6>{props.vendedor.nome}</h6>
                    </Col>

                    </Row>

                    <hr/>
                                       
                    <Row sm="9">
                        {props.label.map((lbl, i) => (
                            //console.log("ITEM : ", i)
                             <Dias label={lbl} indice={i - 1} vendedor={props.vendedor} />
                        ))} 
                    </Row>
                    <hr/>

                    <Row sm="12">
                        <Meta />
                    </Row> 
                </Card>
            </Col>
        </Fragment>
    )
}