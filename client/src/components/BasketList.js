import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Row } from 'react-bootstrap';
import { Context } from '..';
import { BasketItem } from './BasketItem';

export const BasketList = observer(() => {
    const {device} = useContext(Context);
    let TotalPrice = 0;
  return (
    <Row className='flex-column d-flex mt-3'
    style={{width:700, backgroundColor: '#FFFAFA', padding: '10px', justifyContent: 'center', boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)"}}
    >     
    <h2>Корзина</h2>
          {
          device.devices.map(deviceId =>
            device.basket.map(basketId =>
              deviceId.id === basketId.deviceId && 
              <BasketItem key={basketId.id} devices={deviceId}/>
  
              ) 
            )
          }

    </Row>
  )
})
