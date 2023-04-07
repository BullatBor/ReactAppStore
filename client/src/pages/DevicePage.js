import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Image, Row, Card } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '..'
import bigStar from '../assets/bigStar.png'
import { addDeviceBasket, fetchOneDevice } from '../http/deviceAPI'
import { BASKET_ROUTE } from '../utils/consts'

const DevicePage = observer(() => {
  const [devices, setDevice] = useState({info:[]})
  const [inBasket, setInBasket] = useState(false)
  const Navigator = useNavigate();//для перехода на другую страницу
  const {device} = useContext(Context);
  const basketId = localStorage.getItem('UserId')
  const {id} = useParams();
  useEffect(() => {
    fetchOneDevice(id).then(data => setDevice(data))
  }, [])
  useEffect(() => { //для проверки находится ли девайс в корзине
    const isInBasket = device.basket.some(item => item.deviceId === devices.id);
    setInBasket(isInBasket);
  }, [device.basket, devices.id])
  const addDeviceInBasket = (id) => {
    const formData = new FormData();//в передаем через формдату
        formData.append('basketId', `${basketId}`)
        formData.append('deviceId', id)
        addDeviceBasket(formData).then(data => {
        });        
        setInBasket(inBasket ? false : true)
  }
  return (
    <Container className='mt-3'>
      <Row>
          <Col md={4}>
              <Image width={300} height={300} src={process.env.REACT_APP_API_URL + devices.img}/>
          </Col>
          <Col md={4}>
            <Row className='d-flex flex-column align-items-center'>
              <h2>{devices.name}</h2>
              <div 
                className='d-flex align-items-center justify-content-center'
                style={{background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64}}
              >
                {devices.rating}
              </div>
            </Row>
          </Col>
          <Col md={4}>
              <Card
                className='d-flex flex-column align-items-center justify-content-around'
                style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
              >
                <h3>От: {devices.price} руб.</h3>
                <Button variant={inBasket ? "secondary" :"outline-dark"}
                 onClick={() => {
                  inBasket 
                  ?
                  Navigator(BASKET_ROUTE)
                  :
                   addDeviceInBasket(id)
                 }}
                >
                  {inBasket ? "В корзине" : "Добавить в корзину"}
                  </Button>
              </Card>
          </Col>
      </Row>
      <Row className='d-flex flex-column m-3'>
        <h1>Характеристики</h1>
        {devices.info.map((info, index )=> 
          <Row key={info.id} style={{background: index %2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
            {info.title}: {info.description}
          </Row>
          )}
      </Row>
    </Container>
  )
})

export default DevicePage