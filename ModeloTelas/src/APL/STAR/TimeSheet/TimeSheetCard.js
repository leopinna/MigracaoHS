import { Fragment } from "react"
import { Card, Col, InputGroup, Label, Row, Button, Input, CardGroup } from "reactstrap"
import { Plus, Minus, Star } from "react-feather"
import Avatar from '@components/avatar'
import avatarImg from '../../../assets/images/portrait/small/user-07.jpg' //'@src/assets/images/portrait/small/user-07.jpg'

const pathImg =    'src/assets/images/Avatar/128.jpg' //'src\assets\images\Avatar'
// '@src/assets/images/Avatar/'
//src\APL\STAR\TimeSheet
//src\assets\images\Avatar
const Meta = props => {
    return (
        <Fragment>
            <Col className="sm-3">
                <h5 className="text-center titulo">Meta</h5>
            </Col>
        </Fragment>
    )
}

const Dias = props => {
    const detalheDias = (l, i) => {
        <InputGroup>
        <Button color='primary' className='hs_label' name={`$btn_{l}i`}>
            {l}
        </Button>

        <Input  className='form-control' name={`$inp_{l}i`}/>
        <Minus color='secondary' className='hs_label' name={`$btndown_{l}i`}/>
        <Plus color='secondary' className='hs_label' name={`$btnup_{l}i`}/>
        </InputGroup> 
}
    if (String(l).length !== 0) {
    return (
        <Fragment>
            {
                props.label.map((lbl, i) => (detalheDias(lbl.name[i], [i])))
            }
        </Fragment>
    )
    }
    return null
}

const TimeSheetCard = props => {
     return <h2>{props.vendedor.nome}</h2>
    return (
        <Fragment>
            <Col className="sm-9">
                <Card  className="card-vendedor-timesheet">
                <Row className="sm-9">
                        <Col className="sm-6 titulo">
                            <h6>{props.vendedor.nome}</h6>
                            <Avatar img={require('@src/assets/images/Avatar/user01.jpg').default} size='sm'/>
                        </Col>
                    </Row>

                    <hr/>
                    {props.label} 
 {/*                    <Row className="sm-9">
                        <Dias label={props.label} />
                    </Row>*/}
                    <hr/>

                    <Row className="sm-6">
                        <Meta />
                    </Row> 
                </Card>
            </Col>
        </Fragment>
    )
}

export default TimeSheetCard