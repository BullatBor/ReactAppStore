import React, { useState, useContext, useEffect } from 'react'
import { Button, Card, Col, Image } from 'react-bootstrap'
import star from "../assets/star.png"
import {useNavigate } from 'react-router-dom'
import { BASKET_ROUTE, DEVICE_ROUTE } from '../utils/consts'
import { addDeviceBasket } from '../http/deviceAPI'
import { Context } from '..'
import { observer } from 'mobx-react-lite'


export const DeviceItem = observer(({devices}) => {
  const {device} = useContext(Context);
  const basketId = localStorage.getItem('UserId')
  const Navigator = useNavigate();//для перехода на другую страницу
  const [inBasket, setInBasket] = useState(false);
  const addDeviceInBasket = (id) => {
    const formData = new FormData();//в передаем через формдату
        formData.append('basketId', `${basketId}`)
        formData.append('deviceId', id)
        addDeviceBasket(formData).then(data => {
        });        
        setInBasket(inBasket ? false : true)
  }
  useEffect(() => { //для проверки находится ли девайс в корзине
    const isInBasket = device.basket.some(item => item.deviceId === devices.id);
    setInBasket(isInBasket);
  }, [device.basket, devices.id])
  return (
    <Col md={3} className = {"mt-3"} >
        <Card style={{width:150, cursor: 'pointer'}} border={"light"} >{/*Так пишется ссылка на дргую страницу useNavigator*/}
            <div onClick={() => Navigator(`${DEVICE_ROUTE}/${devices.id}`)}>
              <Image width={150} height={150} src={process.env.REACT_APP_API_URL + devices.img}/>
              <div className='text-black-50 mt-1 d-flex justify-content-between align-items-center text-overflow-ellipsis'
              >
                  <div style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{devices.name}</div>
                  <div className='d-flex align-items-center'>
                      <div>{devices.rating}</div>
                      <Image widht={18} height={18} src={star}/>
                  </div>
              </div>    
            </div> 
            <div style={{cursor: 'pointer'}} className='d-flex align-items-center mt-2 ml-1' >
                    <Button 
                    variant={inBasket ? "secondary" : "success"}
                    onClick={() => {
                    inBasket 
                    ?
                    Navigator(BASKET_ROUTE)
                    :
                     addDeviceInBasket(devices.id)
                    }}>{inBasket ? "В корзине" : "В корзину"}</Button>
            </div>       
        </Card>               
    </Col>
  )
})
