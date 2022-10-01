import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'

import './style.css'

import '../node_modules/noty/lib/noty.css';
import '../node_modules/noty/lib/themes/bootstrap-v4.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

console.log("%cCopyright © 2022-today EnesAgo. All Rights Reserved", "font-size: 15px")

//Copyright © 2022-today EnesAgo. All Rights Reserved