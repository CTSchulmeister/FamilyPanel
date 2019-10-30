import React from 'react';
import ReactDOM from 'react-dom';

const ModalWrapper = props => {
    const closeModal = event => {
        const modalWrapper = document.getElementById('modal');

        if(event.target === modalWrapper) {
            props.closeModalHandler();
        }
    };

    return ReactDOM.createPortal(
        <div className="modal__wrapper" onClick={ closeModal } id="modal">
            { props.children }
        </div>,
        document.getElementById('modal-container')
    );
};

export default ModalWrapper;