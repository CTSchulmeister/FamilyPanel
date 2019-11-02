import React from 'react';

const HomeSettingsGroup = props => {
    return (
        <div className="home-settings__group">
            <h3 className="home-settings__group-label">
                { props.label }
            </h3>
            { props.children }
        </div>
    );
};

export default HomeSettingsGroup;