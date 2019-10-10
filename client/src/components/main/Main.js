import React from 'react';
import './Main.scss';

import EventView from '../EventView/EventView';

const Main = (props) => {
    let componentToShow;
    
    switch(props.view) {
        case 'events':
            componentToShow = <EventView />;
            break;
        default:
            componentToShow = null;
    }

    return (
        <main className="main">
            { componentToShow }
        </main>
    );
};

export default Main;