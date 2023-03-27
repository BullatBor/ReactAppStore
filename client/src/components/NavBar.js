import React, { useContext } from 'react'
import { Context } from '..'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import {Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import {observer} from "mobx-react-lite"; //чтобы рисовалось в режиме реального времени
import { useNavigate } from 'react-router-dom';

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const route = useNavigate();

    const logOut = () => {
      user.setUser({})
      user.setIsAuth(false)
    }
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
         <NavLink style = {{color:"white"}} to={SHOP_ROUTE}>СуперМагаз</NavLink>
          {user.isAuth ?
            <Nav className="me-auto" style = {{color:"white"}}>
                <Button variant={"outline-light"} onClick={() => route(ADMIN_ROUTE)}>Админ панель</Button>
                <Button variant={"outline-light"} onClick={() => logOut()} style={{marginLeft: 4}} className="ml-4">Выйти</Button>
            </Nav>
            :
            <Nav className="me-auto" style = {{color:"white"}}>
            <Button variant={"outline-light"} onClick = {() => route(LOGIN_ROUTE)}>Авторизация</Button>
          </Nav>
        }
        </Container>
      </Navbar>
  )
})

export default NavBar