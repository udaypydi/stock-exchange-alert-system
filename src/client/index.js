import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from 'reduxconfigs/store';
import 'semantic-ui-css/semantic.min.css'
import App from './app.js';
import './index.css';

render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);
