// actions
import { AppActions } from '../actions';

const initialState = {
  language: window.localStorage.getItem('language') || process.env.REACT_APP_DEFAULT_LANGUAGE,
  metaData: window.localStorage.getItem('token') || ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AppActions.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    case AppActions.SET_META_DATA:
      return {
        ...state,
        metaData: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
