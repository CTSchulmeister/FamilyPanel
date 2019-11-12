import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import history from './history';

import LandingContainer from './containers/LandingContainer';
import ProfileContainer from './containers/ProfileContainer';
import HomeContainer from './containers/HomeContainer';
import NotesContainer from './containers/NotesContainer';
import NotFound from './components/NotFound';

import './index.scss';

require('dotenv').config();

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ history }>
            <Switch>
                <Route path="/" exact component={ LandingContainer } />
                <Route path="/profile" exact component={ ProfileContainer } />
                <Route path="/home" exact component={ HomeContainer } />
                <Route path="/notes" exact component={ NotesContainer } />
                <Route>
                    <NotFound history={ history } />
                </Route>
            </Switch>
        </Router>
    </Provider>,
    rootElement
);
