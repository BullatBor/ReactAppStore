import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Row } from 'react-bootstrap';
import { Context } from '..';
import { BasketItem } from './BasketItem';

export const BasketList = observer(() => {
    const {device} = useContext(Context);
    const filteredArr2 = device.basket.filter(item => {
      return device.devices.some(obj => {
        return obj.id === item.deviceId;
      });
    });
    const CountDevices = filteredArr2.reduce((acc, item) => {
      const key = item.deviceId;
      return {
          ...acc,
          [key]: (acc[key] || 0) + 1
      };
  }, {}); //высчитываем кол-во повторяющихся девайсов
  const uniqueArr2 = device.basket.filter(
    (item, index, array) => array.findIndex((t) => t.deviceId === item.deviceId) === index
  );//девайся без повторений для отрисовки в корзину
  return (
    <Row className='flex-column d-flex mt-3'
    style={{width:700, backgroundColor: '#FFFAFA', padding: '10px', justifyContent: 'center', boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)"}}
    >     
    <h2>Корзина</h2>
    {
      device.devices.map(deviceId =>
        uniqueArr2.map(item => {
          return (
            deviceId.id === item.deviceId && 
            <BasketItem key={item.id} devices={deviceId} count={CountDevices[`${item.deviceId}`]}/>
          )
        }) 
      )
    }

    </Row>
  )
})
