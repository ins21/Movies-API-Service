import React from 'react';
import ReactDOM from 'react-dom';

import ErrorBoundary from './app/components/ErrorBoundary/ErrorBoundary';
import { App } from './app/App';
import './styles/index.scss';

ReactDOM.render(<ErrorBoundary><App /></ErrorBoundary>, document.getElementById('root'));
