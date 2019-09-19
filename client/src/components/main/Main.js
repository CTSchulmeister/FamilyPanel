import React from 'react';
import './Main.scss';

import NoteView from '../notes/noteView/NoteView';

const Main = (props) => {
    return (
        <main className="main">
            <NoteView />
        </main>
    );
}

export default Main;