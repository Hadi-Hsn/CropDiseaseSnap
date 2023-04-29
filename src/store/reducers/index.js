// libs
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// reducers
import appReducer from './app';

const combinedReducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    app: appReducer
  });

export default combinedReducers;
