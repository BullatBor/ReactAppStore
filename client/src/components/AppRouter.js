import React, { useContext } from 'react'
import {Route, Routes} from 'react-router-dom'
import { Context } from '..';
import Shop from '../pages/Shop';
import { authRoutes, publicRoutes } from '../routes';

function AppRouter() {
    const {user} = useContext(Context)

    console.log(user)
  return (
    <Routes>
        {user.isAuth && authRoutes.map(({path, Component}) =>
        <Route element={Component} key={path} path={path}  exact/>
        )}

        {publicRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={Component} exact/>
        )}
        
    </Routes>
  )
}

export default AppRouter