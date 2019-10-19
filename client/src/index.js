import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import history from './history';

import Landing from './components/Landing';
import Profile from './components/Profile';
import Notes from './components/Notes';

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
                <Profile />
            </Route>
            <Route path="/notes" exact>
                <Notes showCreateNoteForm={ false } />
            </Route>
            <Route path="/notes/create-note" exact>
                <Notes showCreateNoteForm={ true } history={ history } />
            </Route>
        </Router>
    </Provider>,
    rootElement
);
