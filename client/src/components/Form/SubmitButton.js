import React from 'react';
import PropTypes from 'prop-types';

import StandardButton from '../Buttons/StandardButton';

const SubmitButton = props => {
    return (
        <div className="form__submit-group">
            <StandardButton
                size="medium"
                type="submit"
                disabled={ props.disabled || false }
            >
                { props.text || 'Submit' }
            </StandardButton>
        </div>
    );
    
};

SubmitButton.propTypes = {
    text: PropTypes.string,
    disabled: PropTypes.bool
};

export default SubmitButton;