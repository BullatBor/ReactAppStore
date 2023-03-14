//Зависимости для фронтенда
//axios чтобы отправлять запросы на сервер
//react-router-dom для постраничной навигации
//mobx стэйт менеджер
//mobx-react-lite чтобы связать mobx с компонентами  react

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
