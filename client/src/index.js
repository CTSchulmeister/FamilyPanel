import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import Landing from './components/landing/Landing';
import Dashboard from './components/dashboard/Dashboard';

require('dotenv').config();

const rootElement = document.getElementById('root');

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={ Landing } />
            <Route path="/profile" component={ Dashboard } />
        </div>
    </Router>
)

ReactDOM.render(
    <Provider store={ configureStore() }>
        { routing }
    </Provider>, 
    rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
