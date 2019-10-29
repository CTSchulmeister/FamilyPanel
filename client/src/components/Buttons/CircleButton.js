import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CircleButton extends Component {
    static BASE_CLASS = `circle-button`;
    static SMALL_CLASS = `${ CircleButton.BASE_CLASS }--small`;
    static MEDIUM_CLASS = `${ CircleButton.BASE_CLASS }--medium`;
    static LARGE_CLASS = `${ CircleButton.BASE_CLASS }--large`;
    static LIGHT_CLASS = `${ CircleButton.BASE_CLASS }--light`;
    static DARK_CLASS = `${ CircleButton.BASE_CLASS }--dark`;

    constructor(props) {
        super(props);

        const size = props.size;

        switch(size) {
            case 'small':
                this.className = CircleButton.SMALL_CLASS;
                break;
            case 'medium':
                this.className = CircleButton.MEDIUM_CLASS;
                break;
            case 'large':
                this.className = CircleButton.LARGE_CLASS;
                break;
            case undefined:
            default:
                this.className = CircleButton.MEDIUM_CLASS;
        }

        this.className += (props.light) ? ` ${ CircleButton.LIGHT_CLASS }` : ` ${ CircleButton.DARK_CLASS }`;
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

CircleButton.propTypes = {
    size: PropTypes.oneOf([
        'small',
        'medium',
        'large'
    ]),
    light: PropTypes.bool,
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

export default CircleButton;