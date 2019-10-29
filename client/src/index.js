import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import history from './history';

import Landing from './components/Landing';
import AppContainer from './components/Layout/AppContainer';

import './index.scss';

require('dotenv').config();

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ history }>
            <Route path="/" exact>
                <Landing history={ history } />
            </Route>
            <Route path="/profile" exact>
                <AppContainer activeLink='profile' history={ history } />
            </Route>
            <Route path="/home" exact>
                <AppContainer activeLink='home' history={ history } />
            </Route>
            <Route path="/notes" exact>
                <AppContainer activeLink='notes' history={ history } />
            </Route>
        </Router>
    </Provider>,
    rootElement
);
