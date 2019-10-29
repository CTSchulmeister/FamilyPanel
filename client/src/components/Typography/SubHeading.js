import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SubHeading extends Component {
    static BASE_CLASS = `typography__subheading`;
    static LIGHT_CLASS = `${ SubHeading.BASE_CLASS }--light`;
    static DARK_CLASS = `${ SubHeading.BASE_CLASS }--dark`;
    static BUTTON_CLASS = `${ SubHeading.BASE_CLASS }--button`;

    constructor(props) {
        super(props);

        this.className = (props.light)
            ? SubHeading.LIGHT_CLASS
            : SubHeading.DARK_CLASS;

        if(props.button) this.className += ` ${ SubHeading.BUTTON_CLASS }`;
    }

    render() {
        return (
            <span className={ this.className }>
                { this.props.children }
            </span>
        );
    }
}

SubHeading.propTypes = {
    light: PropTypes.bool,
    button: PropTypes.bool
};

export default SubHeading;