import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Paragraph extends Component {
    static BASE_CLASS = `typography__paragraph`;
    static LIGHT_CLASS = `${ Paragraph.BASE_CLASS }--light`;
    static DARK_CLASS = `${ Paragraph.BASE_CLASS }--dark`;

    constructor(props) {
        super(props);

        this.className = (props.light)
            ? Paragraph.LIGHT_CLASS
            : Paragraph.DARK_CLASS;
    }

    render() {
        return (
            <p className={ this.className }>
                { this.props.children }
            </p>
        );
    }
}

Paragraph.propTypes = {
    light: PropTypes.bool
};

export default Paragraph;