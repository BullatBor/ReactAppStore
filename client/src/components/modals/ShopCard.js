import React, { useState } from 'react'
import { Button, Card, Form, Modal } from 'react-bootstrap'

export const ShopCard = ({show, onHide}) => {
    const [CardNumber, setCardNumber] = useState('');
    const [Date, setDate] = useState('');
    const CardNumberFetch = (number) => {
        let text = number.replace(/[^a-z0-9]+/gi, '').replace(/(.{4})/g, '$1 ')
        setCardNumber(text); 
    }
    const DateFetch = (date) => {
        if(date.length === 2){
            date += '/'
            setDate(date); // преобразуем строку в число и устанавливаем состояние
        }
        setDate(date); // преобразуем строку в число и устанавливаем состояние
    }
    
  return (
    <Modal
          show={show}
          onHide={onHide}
          centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Заказать
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Card bg={"success"} border="dark"> 
                <div className='ml-3 mt-4 mb-2'>
                <h6>Card Number</h6>
                <Form.Control className='mb-3'
                style={{width: 400, fontSize:"25px",
                    fontFamily: 'Space Mono'}}
                    placeholder={"НОМЕР КАРТЫ"}
                    value={CardNumber}
                    onChange={e => e.target.value.length <= 19 && CardNumberFetch(e.target.value)}
                />
                </div>
                <div className='d-flex ml-3 mr-3 mb-3 justify-content-between'>
                    <div className='flex-column'>
                        <h6>CardHolder</h6>
                        <Form.Control className='mb-3'
                        style={{width: 180, fontSize:"18px",
                        fontFamily: 'Space Mono'}}
                            placeholder={"ИМЯ ВЛАДЕЛЬЦА"}
                        />
                    </div>
                    <div className='flex-column'>
                        <h6>Exp. Date</h6>
                        <Form.Control className='mb-3'
                        style={{width: 100, fontSize:"18px",
                        fontFamily: 'Space Mono'}}
                        placeholder={"ДАТА"}
                        value={Date}
                        onChange={e => e.target.value.length <= 5 && DateFetch(e.target.value)}
                        />
                    </div>
                    <div className='flex-column'>
                        <h6>CVV</h6>
                        <Form.Control className='mb-3'
                        style={{width: 100, fontSize:"18px",
                        fontFamily: 'Space Mono'}}
                        placeholder={"132"}
                        />
                    </div>
                </div>
            </Card>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
          <Button variant={"outline-success"} >Добавить</Button>
        </Modal.Footer>        
      </Modal>
  )
}
