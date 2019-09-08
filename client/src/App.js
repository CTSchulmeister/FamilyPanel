import React from 'react';

import LoginForm from './components/loginform/LoginForm';
import Background from './components/background/Background';

const App = (props) => {
    return (
        <div className="wrapper">
            <Background></Background>
            <LoginForm />
        </div>
    );
};

export default App;
