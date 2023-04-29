// libs
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import buildStore from './store';
import { Provider } from 'react-redux';

const store = buildStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
