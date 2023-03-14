import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import NavBar from './components/NavBar';
import DeviceStore from './store/DeviceStore';
import UserStore from './store/UserStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    device: new DeviceStore(),
  }}>
    <NavBar/>
    <App />
  </Context.Provider>
);
;
