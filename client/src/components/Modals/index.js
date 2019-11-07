import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ModalContent from './ModalContent';

class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShown: false
        };

        this.toggleIsShown.bind(this);
    }

    toggleIsShown = () => {
        this.setState({
            isShown: !this.state.isShown
        });
    };

    render() {
        const { children } = this.props;
        const { isShown } = this.state;

        return (
            <div className="modal__container">
                <span 
                    className="modal__trigger"
                    onClick={ this.toggleIsShown }
                    role="button"
                    tabIndex="0"
                >
                    { children[0] }
                </span>
                { isShown
                    ? (
                        <ModalContent
                            toggleIsShown={ this.toggleIsShown }
                        >
                            { children[1] }
                        </ModalContent>
                    )
                    : null
                }
            </div>
        );
    }
}

Modal.propTypes = {
    children: PropTypes.node.isRequired
};

export default Modal;