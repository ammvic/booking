import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App';
import MyContextProvider from './Components/context/loginregister';

const root = document.getElementById('root') || document.createElement('div');
const rootInstance = createRoot(root);
rootInstance.render(
  <React.StrictMode>
    <MyContextProvider>
      <App />
    </MyContextProvider>
  </React.StrictMode>
);


