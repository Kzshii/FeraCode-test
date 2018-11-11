// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
import 'bootstrap/dist/js/bootstrap.js';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'unstated';
import { BrowserRouter } from 'react-router-dom';
import store from './store';

import '../src/styles/app.scss';

import * as serviceWorker from './serviceWorker';

import App from './App';

const load = () =>
ReactDOM.render(
  <AppContainer>
    <BrowserRouter>
      <Provider inject={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </AppContainer>,
  document.getElementById('root')
);

load();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
