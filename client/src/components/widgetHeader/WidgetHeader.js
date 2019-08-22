import React from 'react';
import './WidgetHeader.scss';

const WidgetHeader = (props) => {
    return (
        <div className="widget__header-section">
            <h2 className="widget__title">{ props.title }</h2>
        </div>
    );
}

export default WidgetHeader;