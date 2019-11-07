import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Quotation extends Component {
    static BASE_CLASS = `typography__quotation`;
    static LIGHT_CLASS = `${ Quotation.BASE_CLASS }--light`;
    static DARK_CLASS = `${ Quotation.BASE_CLASS }--dark`;

    constructor(props) {
        super(props);

        this.className = (props.light)
            ? Quotation.LIGHT_CLASS
            : Quotation.DARK_CLASS
    }

    render() {
        return (
            <blockquote className={ this.className }>
                { this.props.children }
            </blockquote>
        );
    }
}

Quotation.propTypes = {
    light: PropTypes.bool
};

export default Quotation;