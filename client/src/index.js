import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import history from './history';

import LandingContainer from './containers/LandingContainer';
import ProfileContainer from './containers/ProfileContainer';
import HomeContainer from './containers/HomeContainer';
import TasksContainer from './containers/TasksContainer';
import NotesContainer from './containers/NotesContainer';
import InvitationContainer from './containers/InvitationContainer';
import NotFound from './components/NotFound';

import './index.scss';
import CreateHouseholdFormContainer from './containers/CreateHouseholdFormContainer';

require('dotenv').config();

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ history }>
            <Switch>
                <Route path="/" exact component={ LandingContainer } />
                <Route path="/profile" exact component={ ProfileContainer } />
                <Route path="/home" exact component={ HomeContainer } />
                <Route path="/tasks" exact component={ TasksContainer } />
                <Route path="/notes" exact component={ NotesContainer } />
                <Route path="/invitation/:id" component={ InvitationContainer } />
                <Route path="/create-household" exact component={ CreateHouseholdFormContainer } />
                <Route>
                    <NotFound history={ history } />
                </Route>
            </Switch>
        </Router>
    </Provider>,
    rootElement
);
