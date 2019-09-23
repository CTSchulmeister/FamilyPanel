import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './components/App';

import './index.scss';

require('dotenv').config();

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    rootElement
);
