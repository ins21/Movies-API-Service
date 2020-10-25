import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import ErrorBoundary from './app/components/ErrorPages/ErrorBoundary/ErrorBoundary';
import store from './store';
import { App } from './app/App';

import './styles/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>
  , document.getElementById('root'));
