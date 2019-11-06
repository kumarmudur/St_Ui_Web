import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from './reducers';
import { rootSaga } from './sagas';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

// localStorage.js
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      //localStorage.removeItem('state');
      return {};
    }
    console.log('JSON.parse(serializedState) : ', JSON.parse(serializedState));
    return JSON.parse(serializedState);
  } catch (err) {
    console.log('err in loadState : ', err);
    localStorage.removeItem('state');
    return {};
  }
}; 

// localStorage.js
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.removeItem('state');
    localStorage.setItem('state', serializedState);
  } catch(err) {
    // ignore write errors
    // eslint-disable-next-line no-console
    console.log('error : ', err); 
  }
};

//const persistedState = loadState();

export default function configureStore(preloadedState) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  //let preloadedState = {};
  //let currentState = Object.assign({}, preloadedState, persistedState);
  // preloadedState ? preloadedState : Object.assign({}, preloadedState, persistedState);

  const store = createStore(
    createRootReducer(history),
    //persistedState,
    preloadedState,
    composeEnhancer(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history),
      ),
    ),
  );
  sagaMiddleware.run( rootSaga );
  
  // Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  //

  // store.subscribe(() => {
  //   saveState(
  //     Object.assign({}, persistedState, store.getState() )
  //     );
  // });
  return store;
}
