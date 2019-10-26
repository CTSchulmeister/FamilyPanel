import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StandardButton extends Component {
    static BASE_CLASS = `standard-button`;
    static SMALL_CLASS = `${ StandardButton.BASE_CLASS }--small`;
    static MEDIUM_CLASS = `${ StandardButton.BASE_CLASS }--medium`;
    static LARGE_CLASS = `${ StandardButton.BASE_CLASS }--large`;
    static WIDE_CLASS = `${ StandardButton.BASE_CLASS }--wide`;
    static SQUARE_CLASS = `${ StandardButton.BASE_CLASS }--square`;

    constructor(props) {
        super(props)

        if(props.size) {
            switch(props.size) {
                case 'small':
                    this.className = StandardButton.SMALL_CLASS;
                    break;
                case 'medium':
                    this.className = StandardButton.MEDIUM_CLASS;
                    break;
                case 'large':
                    this.className = StandardButton.LARGE_CLASS;
                    break;
                case 'wide':
                    this.className = StandardButton.WIDE_CLASS;
                    break;
                case 'square':
                    this.className = StandardButton.SQUARE_CLASS;
                    break;
                default:
                    this.className = StandardButton.MEDIUM_CLASS;
            }
        } else {
            this.className = StandardButton.MEDIUM_CLASS;
        }
    }

    render() {
        return (
            <button 
                className={ this.className } 
                onClick={ this.props.onClick }
                disabled={ this.props.disabled || false }
                type={ this.props.type || 'button' }
                name={ this.props.name || null }
                value={ this.props.value || null }
                autoFocus={ this.props.autoFocus || false }
            >
                { this.props.children }
            </button>
        );
    }
}

StandardButton.propTypes = {
    size: PropTypes.oneOf([
        'small',
        'medium',
        'large',
        'wide',
        'square'
    ]),
    type: PropTypes.oneOf([
        'button',
        'submit',
        'reset'
    ]),
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    name: PropTypes.string,
    value: PropTypes.any,
    onClick: PropTypes.func
};

export default StandardButton;