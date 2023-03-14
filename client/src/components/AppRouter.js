import React, { useContext } from 'react'
import { Navbar } from 'react-bootstrap';
import {Route, Routes} from 'react-router-dom'
import {Context} from "../index";
import { authRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils/consts';

function AppRouter() {
    const {user} = useContext(Context)
  return (
    <Routes>
        {user.isAuth && authRoutes.map(({path, Component}) =>
        <Route element={Component} key={path} path={path}  exact/>
        )}

        {publicRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={Component} exact/>
        )}
         <Route path={"*"} element={<SHOP_ROUTE/>} exact/>
    </Routes>
  )
}

export default AppRouter