import React, { useState, useContext } from 'react'
import { Button, Card, Col, Image } from 'react-bootstrap'
import BasketForDelete from "../assets/BasketDelete.svg"
import {useNavigate } from 'react-router-dom'
import { BASKET_ROUTE, DEVICE_ROUTE } from '../utils/consts'
import { removeDeviceFromBasket } from '../http/deviceAPI'
import { Context } from '..'
import { observer } from 'mobx-react-lite'

export const BasketItem = observer(({devices}) => {
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
    const [CountDevices, setCountDevices] = useState(1)
    return (
        <Col md={1} className = {"mt-3 mb-2"} >
            <Card style={{width:650}} border={"light"} >{/*Так пишется ссылка на дргую страницу useNavigator onClick={() => Navigator(`${DEVICE_ROUTE}/${device.id}`)}*/}
                <div className="d-flex">
                    <div style={{width:120, height:120}}>
                        <Image width={120} height={120} src={process.env.REACT_APP_API_URL + devices.img}/>    
                    </div>            
                  <div className = {"mt-2 mb-2 ml-4"}
                        style={{width:250}}
                  >
                      <div style={{ cursor: "pointer"}}
                        onClick={() => Navigator(`${DEVICE_ROUTE}/${devices.id}`)}
                        >{devices.name}                       
                      </div>                       
                  </div>
                  <div className='d-flex justify-content-between'>
                    <div style={{width:180, height:33}}>
                        <div className='mt-2 d-flex justify-content-between'
                                style={{width:106, height:33, right:0}}>
                            <Button variant={CountDevices <= 1 ? "secondary" : "success"}
                                style={{width:32, height:32}}
                                disabled={CountDevices <= 1 ? true : false}
                                onClick={() => CountDevices >1 && setCountDevices(CountDevices-1)}
                                >-
                            </Button> 
                            {CountDevices}
                            <Button variant={"success"}
                                style={{width:32, height:32}}
                                onClick={() => {
                                    setCountDevices(CountDevices+1)}}
                                >+
                            </Button>  
                        </div> 
                    </div>
                    <div className='mt-2 d-flex flex-column align-items-end'
                    >
                        <h6 className='mb-4'>{devices.price} руб</h6>
                        <Image widht={20} height={22} src={BasketForDelete}
                            style={{cursor:"pointer"}}
                            className="mr-5"
                            onClick={() => removeDevice(devices.id)}
                        /> 
                    </div> 
                  </div>  
                </div>                   
            </Card>               
        </Col>
      )
})
