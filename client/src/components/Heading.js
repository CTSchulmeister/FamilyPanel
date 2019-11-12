import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Heading extends Component {
    static BASE_CLASS = `typography__heading`;
    static LIGHT_CLASS = `${ Heading.BASE_CLASS }--light`;
    static DARK_CLASS = `${ Heading.BASE_CLASS }--dark`;
    static COLORED_DIVIDER_CLASS = `${ Heading.BASE_CLASS }--colored-divider`;
    static LIGHT_DIVIDER_CLASS = `${ Heading.BASE_CLASS }--light-divider`;
    static DARK_DIVIDER_CLASS = `${ Heading.BASE_CLASS }--dark-divider`;
    
    constructor(props) {
        super(props);

        this.className = (props.light)
            ? Heading.LIGHT_CLASS
            : Heading.DARK_CLASS;

        this.className += (props.small) ? '-small' : '';

        if(props.divider) {
            switch(props.divider) {
                case 'colored':
                    this.className += ` ${ Heading.COLORED_DIVIDER_CLASS }`;
                    break;
                case 'light':
                    this.className += ` ${ Heading.LIGHT_DIVIDER_CLASS }`;
                    break;
                case 'dark':
                    this.className += ` ${ Heading.DARK_DIVIDER_CLASS }`;
                    break;
                default:
                    this.className += ` ${ Heading.COLORED_DIVIDER_CLASS }`;
            }
        }
    }

    render() {
        const children = React.Children.toArray(this.props.children);


        return (
            <div className={ this.className }>
                <h1>
                    { children[0] }
                </h1>
                { children.slice(1) }
            </div>
        );
    }
}

Heading.propTypes = {
    light: PropTypes.bool,
    small: PropTypes.bool,
    divider: PropTypes.oneOf([
        'colored',
        'light',
        'dark'
    ])
};

export default Heading;