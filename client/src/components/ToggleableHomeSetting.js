import React from 'react';

import SwitchButton from './SwitchButton';

const ToggleableHomeSetting = ({
    label,
    isOn,
    onClick,
    disabled
}) => {
    return (
        <div className="home-setting">
            <label className="home-setting__label">{ label }</label>
            <SwitchButton
                isOn={ isOn }
                onClick={ onClick || null }
                disabled={ disabled || false }
            />
        </div>
    );
};

export default ToggleableHomeSetting;