import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createType } from '../../http/deviceAPI';

export const CreateType = ({show, onHide}) => {
  const [value, SetValue] = useState('');
  const addType = () => {
    createType({name: value}).then(data =>{
      SetValue('')
      onHide()
    })
  }
  return (
    <Modal
        show={show}
        onHide={onHide}
        centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новый тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Control
                placeholder={"Введите название типа"}
                value = {value}
                onChange = {e => SetValue(e.target.value)}
            />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
        <Button variant={"outline-success"} onClick={addType}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  )
}
