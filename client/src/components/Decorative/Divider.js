import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Divider extends Component {
    static BASE_CLASS = `divider`;
    static LIGHT_CLASS = `${ Divider.BASE_CLASS }--light`;
    static COLORED_CLASS = `${ Divider.BASE_CLASS }--colored`;
    static DARK_CLASS = `${ Divider.BASE_CLASS }--dark`;
    static SMALL_CLASS = `${ Divider.BASE_CLASS }--small`;
    static LARGE_CLASS = `${ Divider.BASE_CLASS }--large`;

    constructor(props) {
        super(props);

        if(props.color) {
            switch(props.color) {
                case 'light':
                    this.className = Divider.LIGHT_CLASS;
                    break;
                case 'colored':
                    this.className = Divider.COLORED_CLASS;
                    break;
                case 'dark':
                    this.className = Divider.DARK_CLASS;
                    break;
                default:
                    this.className = Divider.DARK_CLASS;
            }
        } else {
            this.className = Divider.DARK_CLASS;
        }

        if(props.size) {
            switch(props.size) {
                case 'small':
                    this.className += ` ${ Divider.SMALL_CLASS }`;
                    break;
                case 'large':
                    this.className += ` ${ Divider.LARGE_CLASS }`;
                    break;
                default: 
                    this.className += ` ${ Divider.SMALL_CLASS }`;
            }
        } else {
            this.className += ` ${ Divider.SMALL_CLASS }`;
        }
    }

    render() {
        return (
            <hr className={ this.className } />
        );
    }
}

Divider.propTypes = {
    color: PropTypes.oneOf([
        'light',
        'colored',
        'dark'
    ]),
    size: PropTypes.oneOf([
        'small',
        'large'
    ])
};

export default Divider