import React from 'react';
import './Widget.scss';

import WidgetHeader from '../widgetHeader/WidgetHeader';

const Widget = (props) => {
    return (
        <div className='widget'>
            <WidgetHeader title='Title' />
        </div>
    );
}

export default Widget;