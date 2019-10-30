import React from 'react';
import PropTypes from 'prop-types';

import ModalWrapper from './ModalWrapper';

import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';
import StandardButton from '../Buttons/StandardButton';

const DeleteModal = props => {
    const deleteItem = () => {
        props.deleteHandler(props.deleteItemId);
    };

    return (
        <ModalWrapper closeModalHandler={ props.cancelDelete }>
            <div className="modal--delete">
                <Heading divider="colored">
                    Just to be sure...
                </Heading>
                <Paragraph>
                    You are about to delete { props.deleteItemName }.  Do you want to continue?
                </Paragraph>
                <div className="modal__button-container">
                    <StandardButton size="medium" onClick={ props.cancelHandler }>
                        Cancel
                    </StandardButton>
                    <StandardButton size="medium" onClick={ deleteItem }>
                        Delete
                    </StandardButton>
                </div>
            </div>
        </ModalWrapper>
    );
};



DeleteModal.propTypes = {
    deleteHandler: PropTypes.func
};

export default DeleteModal;
