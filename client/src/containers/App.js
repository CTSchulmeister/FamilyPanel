import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    selectUserLoadingState,
    selectAuthenticationState
} from '../selectors/userSelectors';
import {
    selectServerErrorStatus
} from '../selectors/serverSelectors';

import AppContainer from '../components/AppContainer';

const App = props => <AppContainer {...props} />;

const mapStateToProps = state => ({
    isAuthenticated: selectAuthenticationState(state),
    isLoading: selectUserLoadingState(state),
    serverIsDown: selectServerErrorStatus(state)
});

App.propTypes = {
    activeLink: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(App);