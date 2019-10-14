import React from 'react';
import './Main.scss';

import EventView from '../EventView/EventView';
import NoteView from '../NoteView/NoteView';

const Main = (props) => {
    let componentToShow;
    
    switch(props.view) {
        case 'events':
            componentToShow = <EventView />;
            break;
        case 'notes':
            componentToShow = <NoteView />;
            break;
        default:
            componentToShow = (
                <div className="introduction__wrapper">
                    <div className="introduction">
                        <span className="introduction__subtitle">
                            Welcome to
                        </span>
                        <h2 className="introduction__heading">FamilyPanel</h2>
                    </div>
                </div>  
            );
    }

    return (
        <main className="main">
            { componentToShow }
        </main>
    );
};

export default Main;