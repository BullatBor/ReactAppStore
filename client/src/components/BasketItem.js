import React, { useState, useContext } from 'react'
import { Button, Card, Col, Image } from 'react-bootstrap'
import star from "../assets/star.png"
import {useNavigate } from 'react-router-dom'
import { BASKET_ROUTE, DEVICE_ROUTE } from '../utils/consts'
import { removeDeviceFromBasket } from '../http/deviceAPI'
import { Context } from '..'

export const BasketItem = ({devices}) => {
    const {device} = useContext(Context);
    const Navigator = useNavigate();//для перехода на другую страницу
    const basketId = localStorage.getItem('UserId')
    const removeDevice = (id) => {
        const formData = new FormData();//в передаем через формдату
            formData.append('basketId', `${basketId}`)
            formData.append('deviceId', id)
            removeDeviceFromBasket(formData).then(data => {
                device.setBasketDevices(data) 
            });        
      }
    
    return (
        <Col md={1} className = {"mt-3 mb-2"} >
            <Card style={{width:550, cursor: 'pointer'}} border={"light"} >{/*Так пишется ссылка на дргую страницу useNavigator onClick={() => Navigator(`${DEVICE_ROUTE}/${device.id}`)}*/}
                <div >
                <Image width={120} height={120} src={process.env.REACT_APP_API_URL + devices.img}/>
                <Button variant={"danger"}
                onClick={() => removeDevice(devices.id)}
                >Удалить</Button>
                  <div className='text-black-50 mt-1 d-flex justify-content-between align-items-center'>
                      <div>{devices.name}</div>
                      <div className='d-flex align-items-center'>
                          <div>{devices.rating}</div>
                          <Image widht={18} height={18} src={star}/>
                      </div>
                  </div>    
                </div>     
            </Card>               
        </Col>
      )
}
