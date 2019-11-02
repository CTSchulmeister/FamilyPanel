import React from 'react';

import SwitchButton from '../Buttons/SwitchButton';

const ToggleableHomeSetting = props => {
    return (
        <div className="home-setting">
            <label className="home-setting__label">{ props.label }</label>
            <SwitchButton
                isOn={ props.isOn }
                onClick={ props.onClick }
            />
        </div>
    );
};

export default ToggleableHomeSetting;