import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class ModalContent extends Component {
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

        const outsideClick = target === document.getElementById('modal__wrapper');
        const targetIsButton = role === 'button';
        const targetIsLink = role === 'link' || tagName === 'A';

        if (outsideClick || targetIsButton || targetIsLink) {
            const { toggleIsShown } = this.props;
            toggleIsShown();
        }
    };

    render() {
        const { children, toggleIsShown } = this.props;
    
        return ReactDOM.createPortal(
            <div className="modal__wrapper" id="modal__wrapper">
                { 
                    React.cloneElement(children, { 
                        toggleIsShown: toggleIsShown, 
                        className: 'modal'
                    }) 
                }
            </div>,
            document.getElementById('modal-container')
        );
    }
}

ModalContent.propTypes = {
    children: PropTypes.node.isRequired,
    toggleIsShown: PropTypes.func.isRequired
};

export default ModalContent;