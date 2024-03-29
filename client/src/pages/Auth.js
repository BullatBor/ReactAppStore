import React, { useContext, useState } from 'react'
import { Container, Card, Form, Button} from 'react-bootstrap';
import {NavLink, useLocation, useNavigate} from 'react-router-dom'
import { REGISTRATION_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import Row from "react-bootstrap/Row";
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const Auth = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation();
  const navigator = useNavigate();
  //const isLogin = true;
  const isLogin = location.pathname === LOGIN_ROUTE//если маршрут совпадает с LOGIN_ROUTE
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')


  const click = async () => {
    try{
      let data;
      if(isLogin){
        data = await login(email, password)
      } else {
        data = await registration(email, password)
      }
      user.setUser(user);//как запрос прошел в userStore сохраняем данные о пользователей
      user.setIsAuth(true);
      navigator(SHOP_ROUTE)
    } catch(e) {
      alert(e.responce.data.message)
    }
    
  }
  return(
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{height: window.innerHeight-54}}
    >
      <Card style={{width: 600}} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className = "d-flex flex-column">
            <Form.Control
              className="mt-3"
              placeholder="Введите ваш email..."
              value={email}
              onChange={e => setEmail(e.target.value)}//передаем value который находится в инпуте
            />
            <Form.Control
              className="mt-3"
              placeholder="Введите ваш пароль..."
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
            <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
              {isLogin ?
                <div>
                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                </div>
              :
                <div>
                    Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                </div>
              }   
              <Button 
                  variant={"outline-success"}
                  onClick={click}
              >
                {isLogin ? "Войти" : "Зарегистрироваться"}
              </Button>
            </Row>
            
        </Form> 
      </Card>
          
    </Container>
  )
})

export default Auth;