// libs
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { promiseMiddleware } from '@adobe/redux-saga-promise';

// reducers
import reducers from './reducers';

const buildStore = () => {
  const history = createBrowserHistory();
  const routeMiddleware = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [routeMiddleware, promiseMiddleware, sagaMiddleware];
  let composed = composeWithDevTools(applyMiddleware(...middleware));

  const store = createStore(reducers(history), {}, composed);
  return store;
};

export default buildStore;
