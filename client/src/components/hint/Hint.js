import React from 'react';
import './Hint.scss';

const Hint = (props) => {
    return (
        <span className="hint">
            <i class="fas fa-info-circle"></i>
            &nbsp;
            { props.hint }
        </span>
    );
}

export default Hint;