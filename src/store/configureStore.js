import 'regenerator-runtime/runtime';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

let composeEnhancers;

if (process.browser === true && process.env.NODE_ENV !== 'production') {
  const reduxLogger = require('redux-logger');
  const logger = reduxLogger.createLogger({ collapsed: true });
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

  middlewares.push(logger);
  composeEnhancers = typeof devTools !== 'undefined' ? devTools : compose;
} else {
  composeEnhancers = compose;
}

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
