import React from 'react';

const Main = props => {
    return (
        <div className="main__wrapper">
            <main className="main">
                { props.children }
            </main>
        </div>
    );
};

export default Main;