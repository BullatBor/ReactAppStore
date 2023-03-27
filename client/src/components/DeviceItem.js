import React from 'react'
import { Card, Col, Image } from 'react-bootstrap'
import star from "../assets/star.png"
import {useNavigate } from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts'

export const DeviceItem = ({device}) => {
  const Navigator = useNavigate();//для перехода на другую страницу
  return (
    <Col md={3} className = {"mt-3"} onClick={() => Navigator(`${DEVICE_ROUTE}/${device.id}`)}>{/*Так пишется ссылка на дргую страницу useNavigator*/}
        <Card style={{width:150, cursor: 'pointer'}} border={"light"}>
            <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
            <div className='text-black-50 mt-1 d-flex justify-content-between align-items-center'>
                <div>Samsung</div>
                <div className='d-flex align-items-center'>
                    <div>{device.rating}</div>
                    <Image widht={18} height={18} src={star}/>
                </div>
            </div>
        </Card>
    </Col>
  )
}
