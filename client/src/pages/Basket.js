import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useMemo } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Context } from '..';
import { PriceCard } from '../components/Basket/PriceCard';
import { BasketList } from '../components/BasketList';
import { fetchBasket, fetchDevices } from '../http/deviceAPI';
import {useNavigate } from 'react-router-dom'
import { SHOP_ROUTE } from '../utils/consts';


const Basket = observer(() => {
  const Navigator = useNavigate();
  const {device} = useContext(Context);
  const basketId = localStorage.getItem('UserId')
  const memoizedValues = useMemo(() => {
    let TotalPrice = 0;
    let TotalCount = 0;
  
    device.basket.forEach(basketId => {
      device.devices.forEach(deviceId => {
        if (deviceId.id === basketId.deviceId) {
          TotalPrice += deviceId.price;
          TotalCount += 1;
        }
      });
    });
    return {
      TotalPrice,
      TotalCount,
    };
  }, [device.basket]);
  const { TotalPrice, TotalCount} = memoizedValues;
  useEffect(() => {
    fetchBasket(basketId).then(data => {
      device.setBasketDevices(data) 
    })
    fetchDevices(null, null, 1, null).then(
      data =>  {device.setDevices(data.rows)
      device.setTotalCount(data.count)
      }
      )
//1241
  }, [device])
  return (
    <Container>
      <Row>
      {device.basket.length !== 0 
          ? (<>
          <Col md={8}>
            <BasketList/>
        </Col>
        <Col md={2}>
            <PriceCard AllCount={TotalCount} AllPrice={TotalPrice}/>
        </Col>
        </>)
          :
          (<>
          <Row className='flex-column d-flex mt-3'>
            <h1 style={{textAlign: 'center'}}>В корзине пока пусто</h1>
            <Button className = {"mt-3"} variant={"success"} onClick={() => Navigator(SHOP_ROUTE)}>Перейти на главную</Button>
          </Row>
            </>
          )
          
          }
        
      </Row>
    </Container>
  )
})

export default Basket