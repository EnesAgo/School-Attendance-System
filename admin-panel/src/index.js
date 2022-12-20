import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SearchContextProvider } from './context/SearchContext';

import '../node_modules/noty/lib/noty.css';
import '../node_modules/noty/lib/themes/mint.css';
import '../node_modules/noty/lib/themes/light.css';
import '../node_modules/noty/lib/themes/bootstrap-v4.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SearchContextProvider>
      <App />
    </SearchContextProvider>
  </React.StrictMode>
);

