// ** Reactstrap Imports
import { Popover, PopoverBody, UncontrolledPopover, Button, Col } from 'reactstrap'
import { Fragment } from 'react'
import { Printer, Plus, Minus, Trash } from 'react-feather'

const MenuContexto = () => {

    return (
        <Fragment>
            <Button color='primary' outline id='uncontrolledPopover'>
                    ...
            </Button>
            
            <UncontrolledPopover placement='bottom' target='uncontrolledPopover'>
                <Col sm='1' style={{width: "60px", justifyContent:"center"}}>
                <PopoverBody>
                <Button size='xs' outline color='primary' id='item1' style={{padding: "10px"}}><Printer size={16} /> </Button>
                <Button size='xs' outline color='primary' id='item2' style={{padding: "10px"}}><Plus  size={16} /> </Button>
                <Button size='xs' outline color='primary' id='item3' style={{padding: "10px"}}><Minus size={16} /> </Button>
                <Button size='xs' outline color='primary' id='item4' style={{padding: "10px"}}><Trash size={16} /> </Button>
                
                </PopoverBody>
                </Col>
            </UncontrolledPopover>
        </Fragment>
        )
}

export default MenuContexto