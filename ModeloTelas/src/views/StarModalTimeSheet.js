// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import { X } from 'react-feather'
import { Axios} from 'axios'
import { baseURL } from '../utility/Utils'

// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText } from 'reactstrap'


const StarModalTimeSheet = ({ open, handleModal, registro, labels, xpto }) => {
  // ** State
  //const [Picker, setPicker] = useState(new Date())
  const dadosAlteracao = registro
  const labelDias = labels

  //console.log(`Labels:${labelDias}`)

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

function timeToDecimal(t) {
    const arr = t.split(':')

    if (t === arr[0]) {
      return parseFloat(t.replace(',', '.'))
    } else {
      const dec = parseInt((arr[1] / 6) * 10, 10)      
      return parseFloat(`${parseInt(arr[0], 10)  }.${  dec < 10 ? '0' : ''  }${dec}`)
    }
  }

const onSubmit = () => {
  const dadosUpdateBD = dadosAlteracao

    dadosUpdateBD.d1 = timeToDecimal(document.getElementById('modal_d1').value)
    dadosUpdateBD.d2 = timeToDecimal(document.getElementById('modal_d2').value)
    dadosUpdateBD.d3 = timeToDecimal(document.getElementById('modal_d3').value)
    dadosUpdateBD.d4 = timeToDecimal(document.getElementById('modal_d4').value)
    dadosUpdateBD.d5 = timeToDecimal(document.getElementById('modal_d5').value)  
    dadosUpdateBD.d6 = timeToDecimal(document.getElementById('modal_d6').value)
    dadosUpdateBD.d7 = timeToDecimal(document.getElementById('modal_d7').value)
 
    console.log(JSON.stringify(dadosUpdateBD))
    xpto(dadosUpdateBD)
console.log("--------------- ------------ ---------")
handleModal()

/*   Axios.post(baseURL.concat("MetaVendedor"), dadosUpdateBD)
  .then(res => {
    console.log(res)
    handleModal()
  }).catch(err => {
    console.log(err)
  }
  ) */
}

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='modal-dialog-centered modal-lg'
      //modalClassName='modal-slide-in'
      //contentClassName='pt-0'
      centered={true}
    >
      <ModalHeader className='mb-1 modal-lg' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title titulo'>ALTERAR</h5>
      </ModalHeader>
      <ModalBody /* className='flex-grow-1' */>
        <div /* className='mb-1' */>
          <Label className='form-label' for='full-name'>
            Vendedor
          </Label>
          <Label className='form-label' for='modal_d1'>
            ABC
          </Label>
          <div>
            <input id='full-name' className='input-group-text-timesheet-nome' Value={dadosAlteracao.nome}></input>
            <input id='modal_d1' className='input-group-text-timesheet' defaultValue={dadosAlteracao.d1} ></input>
            <input id='modal_d2' className='input-group-text-timesheet' defaultValue={dadosAlteracao.d2} ></input>
            <input id='modal_d3' className='input-group-text-timesheet' defaultValue={dadosAlteracao.d3}></input>
            <input id='modal_d4' className='input-group-text-timesheet' defaultValue={dadosAlteracao.d4}></input>
            <input id='modal_d5' className='input-group-text-timesheet' defaultValue={dadosAlteracao.d5}></input>
            <input id='modal_d6' className='input-group-text-timesheet' defaultValue={dadosAlteracao.d6}></input>
            <input id='modal_d7' className='input-group-text-timesheet' defaultValue={dadosAlteracao.d7}></input>
            <input id='modal_total' className='input-group-text-timesheet' defaultValue={dadosAlteracao.total}></input>
          </div>
        </div>
        <div>
        <Button className='me-1' color='primary' onClick={onSubmit}>
          Submit
        </Button>
        <Button color='secondary' onClick={handleModal} outline>
          Cancel
        </Button>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default StarModalTimeSheet
