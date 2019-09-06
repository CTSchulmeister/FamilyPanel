import React from 'react';

import RegistrationForm from './components/registrationform/RegistrationForm';
import Background from './components/background/Background';

const App = (props) => {
    return (
        <div className="wrapper">
            <Background></Background>
            <RegistrationForm />
        </div>
    );
};

export default App;
