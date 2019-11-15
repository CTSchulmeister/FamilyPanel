import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SwitchButton extends Component {
    static BASE_CLASS = `switch-button`;
    static ON_CLASS = `${ SwitchButton.BASE_CLASS }--on`;
    static OFF_CLASS = `${ SwitchButton.BASE_CLASS }--off`;
    static LIGHT_CLASS = `${ SwitchButton.BASE_CLASS }--light`;
    static DARK_CLASS = `${ SwitchButton.BASE_CLASS }--dark`;
    static ANIMATE_CLASS = `${ SwitchButton.BASE_CLASS }--animate`;

    constructor(props) {
        super(props);

        if(props.isOn === undefined || props.isOn === null) {
            throw new Error('SwitchButton must be supplied an isOn (bool) prop');
        }

        this.state = {
            isOn: props.isOn,
            clicked: false
        };

        this.toggle.bind(this);
    }

    toggle = event => {
        event.preventDefault();

        this.setState({
            isOn: (this.state.isOn) ? false : true,
            clicked: true
        });

        this.props.onClick();
    };

    render() {
        let className = (this.state.isOn)
            ? SwitchButton.ON_CLASS
            : SwitchButton.OFF_CLASS;

        className += (this.props.light) 
            ? ' ' + SwitchButton.LIGHT_CLASS
            : ' ' + SwitchButton.DARK_CLASS;

        if(this.state.clicked) className += ` ${ SwitchButton.ANIMATE_CLASS }`;

        const onClick = (this.props.disabled)
            ? null
            : this.toggle;

        return (
            <button
                className={ className }
                onClick={ onClick }
                disabled={ this.props.disabled || false }
                name={ this.props.name || null }
                value={ this.props.value || null }
                autoFocus={ this.props.autoFocus || false }
            >
            </button>
        );
    }
}

SwitchButton.propTypes = {
    isOn: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    name: PropTypes.string,
    value: PropTypes.any
};

export default SwitchButton;