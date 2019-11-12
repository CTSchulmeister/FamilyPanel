import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DropDownPanel extends Component {
    constructor(props) {
        super(props);
        this.onClick.bind(this);
        this.node = null;
    }

    componentDidMount() {
        document.addEventListener('click', this.onClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onClick);
    }

    onClick = event => {
        const { target } = event;
        const { tagName } = target;
        const role = target.getAttribute('role');

        const outsideClick = !this.node.contains(target);
        const targetIsButton = role === 'button';
        const targetIsLink = role === 'link' || tagName === 'A';

        if(outsideClick || targetIsButton || targetIsLink) {
            const { toggleIsOpen } = this.props;
            toggleIsOpen();
        }
    };

    render() {
        const { children } = this.props;

        return (
            <div className="drop-down__panel" ref={ node => this.node = node }>
                { children }
            </div>
        );
    }
}

DropDownPanel.propTypes = {
    children: PropTypes.node.isRequired,
    toggleIsOpen: PropTypes.func.isRequired
};

export default DropDownPanel;