import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            error: null
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error: error
        };
    }

    render() {
        let subHeading = (this.props.formName)
            ? `While rendering the ${ this.props.formName } form, an error occured:`
            : `An error has occured:`;

        if(this.state.hasError) {
            return (
                <div className="form-error-boundary">
                    <h2 className="form-error-boundary__heading">
                        Oops...
                    </h2>
                    <p className="form-error-boundary__paragraph">
                        { subHeading }
                    </p>
                    <p className="form-error-boundary__error">
                        { String(this.state.error) }
                    </p>
                    <p className="form-error-boundary__paragraph">
                        We're sorry for the inconvenience.  We'll look into the issue and it should be resolved shortly.    
                    </p> 
                </div>
            )
        }

        return this.props.children;
    }
}

FormErrorBoundary.propTypes = {
    formName: PropTypes.string
};

export default FormErrorBoundary;