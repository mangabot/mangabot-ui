import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './styles/uikit-customized.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

console.log(process.env);

// loads the Icon plugin
UIkit.use(Icons);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
