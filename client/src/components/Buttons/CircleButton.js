import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CircleButton extends Component {
    static BASE_CLASS = `circle-button`;
    static CONTAINER_CLASS = `${ CircleButton.BASE_CLASS }__container`;
    static TOOLTIP_CLASS = `${ CircleButton.BASE_CLASS }__tooltip`;
    static LIGHT_CLASS = `${ CircleButton.BASE_CLASS }--light`;
    static DARK_CLASS = `${ CircleButton.BASE_CLASS }--dark`;

    constructor(props) {
        super(props);

        this.className = `${ CircleButton.BASE_CLASS }`;
        this.className += (props.light) ? ` ${ CircleButton.LIGHT_CLASS }` : ` ${ CircleButton.DARK_CLASS }`;
        
        this.handleClick.bind(this);
    }

    handleClick = event => {
        event.preventDefault();

        if(this.props.onClick) {
            this.props.onClick();
        }
    };

    render() {
        return (
            <div className={ CircleButton.CONTAINER_CLASS }>
                <button 
                    className={ this.className } 
                    onClick={ this.handleClick }
                    disabled={ this.props.disabled || false }
                    type={ this.props.type || 'button' }
                    name={ this.props.name || null }
                    value={ this.props.value || null }
                    autoFocus={ this.props.autoFocus || false }
                >
                    { this.props.children }
                </button>
                <div className={ CircleButton.TOOLTIP_CLASS }>
                    { this.props.tooltipText }
                </div>
            </div>
            
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
    onClick: PropTypes.func,
    tooltipText: PropTypes.string.isRequired
};

export default CircleButton;