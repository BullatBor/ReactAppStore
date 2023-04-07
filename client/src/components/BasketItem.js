import React, { useState, useContext } from 'react'
import { Button, Card, Col, Image } from 'react-bootstrap'
import BasketForDelete from "../assets/BasketDelete.svg"
import {useNavigate } from 'react-router-dom'
import { BASKET_ROUTE, DEVICE_ROUTE } from '../utils/consts'
import { addDeviceBasket, removeDeviceFromBasket, removeAllDevice} from '../http/deviceAPI'
import { Context } from '..'
import { observer } from 'mobx-react-lite'


export const BasketItem = observer(({devices, count}) => {
    const {device} = useContext(Context);
    const Navigator = useNavigate();//для перехода на другую страницу
    const basketId = localStorage.getItem('UserId')
    const addDevice = (id) => {//Добавляем новый девайс в корзину, запрос на сервер
        const formData = new FormData();//в передаем через формдату
        formData.append('basketId', `${basketId}`)
        formData.append('deviceId', id)
        addDeviceBasket(formData).then(data => {
            device.setBasketDevices(data) 
        });  
    }
    const removeDevice = (id) => {//Удаление из корзины одного девайса
        const formData = new FormData();//в передаем через формдату
            formData.append('basketId', `${basketId}`)
            formData.append('deviceId', id)
            removeDeviceFromBasket(formData).then(data => {
                device.setBasketDevices(data) 
            });        
      }
      const removeDeviceAll = (id) => {//Удаление из корзины всех одинаковых девайсов
        const formData = new FormData();//в передаем через формдату
            formData.append('basketId', `${basketId}`)
            formData.append('deviceId', id)
            removeAllDevice(formData).then(data => {
                device.setBasketDevices(data) 
            });        
      }
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
                            <Button variant={count <= 1 ? "secondary" : "success"}
                                style={{width:32, height:32}}
                                disabled={count <= 1 ? true : false}
                                onClick={() => { if(count >1)  {
                                    removeDevice(devices.id)//Удаление одного девайса
                                }
                                }}
                                >-
                            </Button> 
                            {count}
                            <Button variant={"success"}
                                style={{width:32, height:32}}
                                onClick={() => {
                                    addDevice(devices.id)//добавление
                                }}
                                >+
                            </Button>  
                        </div> 
                    </div>
                    <div className='mt-2 d-flex flex-column align-items-end'
                    >
                        <h6 className='mb-4'>{devices.price * count} руб</h6>
                        <Image widht={20} height={22} src={BasketForDelete}
                            style={{cursor:"pointer"}}
                            className="mr-5"
                            onClick={() => {
                                removeDeviceAll(devices.id)//Удаление одинаковых девайсов        
                            }}
                        /> 
                    </div> 
                  </div>  
                </div>                   
            </Card>               
        </Col>
      )
})
