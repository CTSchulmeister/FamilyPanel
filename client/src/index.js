import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './components/App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

import './index.scss';

require('dotenv').config();

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={ store }>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </Provider>,
    rootElement
);
