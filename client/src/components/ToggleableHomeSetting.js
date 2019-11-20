import React from 'react';

import SwitchButton from './SwitchButton';

const ToggleableHomeSetting = ({
    label,
    isOn,
    onClick,
    disabled,
    light
}) => {
    const className = (light) ? "home-setting--light" : "home-setting--dark";

    return (
        <div className={ className }>
            <label className="home-setting__label">{ label }</label>
            <SwitchButton
                isOn={ isOn }
                onClick={ onClick || null }
                disabled={ disabled || false }
                light={ light }
            />
        </div>
    );
};

export default ToggleableHomeSetting;