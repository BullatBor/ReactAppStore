import React, { useContext, useEffect } from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { Context } from '../..';
import { fetchDevices } from '../../http/deviceAPI';

export const PriceCard = () => {
    const {device} = useContext(Context);
    let TotalPrice = 0;
    let TotalCount = 0;   
    const result = { TotalPrice, TotalCount };
    device.devices.forEach(deviceId => {
        device.basket.forEach(basketId => {
          if (deviceId.id === basketId.deviceId) {
            result.TotalPrice += deviceId.price;
            result.TotalCount += 1;
          }
        });
      });
  return (
    <Col md={1} className = {"mt-3 mb-2"} >
            <Card style={{width:400, boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)", justifyContent: 'center', padding:20}} border={"light"} >
                <div>
                    <div className='text-black-50 mt-1 d-flex justify-content-between align-items-center'>
                        <div>Товары, {result.TotalCount} шт.</div>
                        <div className='d-flex align-items-center'>
                        {result.TotalPrice} руб.
                        </div>
                        </div>
                        <div className='text-black-50 mt-1 d-flex justify-content-between align-items-center'>
                        <div><h3>Итого</h3></div>
                        <div className='d-flex align-items-center'>
                        <h4>{result.TotalPrice} руб.</h4>
                        </div>
                    </div>
                    <Button className = {"mt-3"} variant={"success"} onClick={() => console.log("work")}>Заказать</Button>
                </div>
            </Card>            
        </Col>
  )
}
