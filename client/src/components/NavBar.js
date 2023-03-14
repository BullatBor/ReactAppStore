import React, { useContext } from 'react'
import { Context } from '..'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import {Button} from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';
import {observer} from "mobx-react-lite"; //чтобы рисовалось в режиме реального времени

const NavBar = observer(() => {
    const {user} = useContext(Context);
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          {/*<NavLink style = {{color:"white"}} to={SHOP_ROUTE}>СуперМагаз</NavLink>*/}
          {user.isAuth ?
            <Nav className="me-auto" style = {{color:"white"}}>
                <Button variant={"outline-light"}>Супер Админ</Button>
                <Button variant={"outline-light"} className="ml-2">Выйти</Button>
            </Nav>
            :
            <Nav className="me-auto" style = {{color:"white"}}>
            <Button variant={"outline-light"} onClick = {() => user.setIsAuth(true)}>Авторизация</Button>
          </Nav>
        }
        </Container>
      </Navbar>
  )
})

export default NavBar