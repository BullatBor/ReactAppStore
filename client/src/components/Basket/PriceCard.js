import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { Context } from '../..';
import { fetchBasket, fetchDevices } from '../../http/deviceAPI';
import { CreateBrand } from '../modals/CreateBrand';
import { ShopCard } from '../modals/ShopCard';

export const PriceCard = observer(({AllCount, AllPrice}) => {
    const [ShopCardVisible, setShopCardVisible] = useState(false);
  return (
    <Col md={1} className = {"mt-3 mb-2 position-fixed"} > 
            <Card style={{width:400, boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)", justifyContent: 'center', padding:20}} border={"light"} >
                <div>
                    <div className='text-black-50 mt-1 d-flex justify-content-between align-items-center'>
                        <div>Товары, {AllCount} шт.</div>
                        <div className='d-flex align-items-center'>
                        {AllPrice} руб.
                        </div>
                        </div>
                        <div className='text-black-50 mt-1 d-flex justify-content-between align-items-center'>
                        <div><h3>Итого</h3></div>
                        <div className='d-flex align-items-center'>
                        <h4>{AllPrice} руб.</h4>
                        </div>
                    </div>
                    <Button className = {"mt-3"} variant={"success"} onClick={() => setShopCardVisible(true)}>Заказать</Button>
                </div>
            </Card>            
            <ShopCard show={ShopCardVisible} onHide={() => setShopCardVisible(false)}/>
        </Col>
  )
})
