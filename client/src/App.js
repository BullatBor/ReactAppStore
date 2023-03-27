//Зависимости для фронтенда
//axios чтобы отправлять запросы на сервер
//react-router-dom для постраничной навигации
//mobx стэйт менеджер
//mobx-react-lite чтобы связать mobx с компонентами  react

import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { Context } from '.';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { check } from './http/userAPI';

const App = observer(() => {
  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true)//идет загрузка страницы или нет

  useEffect(() => {
    check().then(data => {
      user.setUser(true)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])
  if(loading){
    return <Spinner animation={"grow"}/>
  }

  return (
    <BrowserRouter>
     <NavBar/>    
      <AppRouter/>
    </BrowserRouter>
  );
})

export default App;
