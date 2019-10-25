import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = props => {
    return (
        <div className="form__submit-group">
            <input
                className="button button--med"
                type="submit"
                value={ props.text || 'Submit' }
            />
        </div>
    );
    
};

SubmitButton.propTypes = {
    text: PropTypes.string
};

export default SubmitButton;