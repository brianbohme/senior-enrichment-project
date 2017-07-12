import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Main } from './components';
import store from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router >
  </Provider>,
  document.getElementById('app')
);
