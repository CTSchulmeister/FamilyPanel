import React from 'react';

import './App.scss';

import Landing from './components/landing/Landing';

const App = (props) => {
    return (
        <Landing />
    );
};

export default connect()(App);
