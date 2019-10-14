import React, { Component } from 'react';
import './ErrorBoundary.scss';

class ErrorBoundary extends Component {
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
        }
    }

    render() {
        if(this.state.hasError) {
            return (
                <div className="error-boundary__wrapper">
                    <div className="error-boundary">
                        <h2 className="error-boundary__header">Oops!  FamilyPanel has encountered an error...</h2>
                        <div className="error-boundary__info">
                            { this.state.error.toString() }
                        </div>
                        <button className="button button--med" href="/">
                            Go Back to Home
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;