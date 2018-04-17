import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './js/App.js';
import './css/imports.css';

import 'font-awesome/css/font-awesome.min.css';
import 'react-select/dist/react-select.css';
import 'semantic-ui-css/semantic.min.css';
import 'rc-tabs/assets/index.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
