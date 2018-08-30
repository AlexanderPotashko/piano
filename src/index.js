import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import configureStore from './store/configureStore';
import Routes from './components/Routes';

const rootEl = document.getElementById('root');
const store = configureStore(window.__INITIAL_STATE__);

const html = (
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
);

import './styles/normalize.css';

window.render = () => {
  Loadable.preloadReady().then(() => {
    hydrate(html, rootEl);
  });
};
