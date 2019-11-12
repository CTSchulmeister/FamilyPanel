import React from 'react';
import PropTypes from 'prop-types';

import Heading from './Heading';
import Paragraph from './Paragraph';
import StandardButton from './StandardButton';

const DeleteModal = ({
    deleteHandler,
    deleteItemName,
    deleteItemId,
    toggleIsShown
}) => {
    const deleteItem = () => {
        deleteHandler(deleteItemId);
    };

    return (
        <div className="modal modal--delete">
            <Heading divider="colored">
                Just to be sure...
            </Heading>
            <Paragraph>
                You are about to delete { deleteItemName }.  Do you want to continue?
            </Paragraph>
            <div className="modal__button-container">
                <StandardButton size="medium" onClick={ toggleIsShown }>
                    Cancel
                </StandardButton>
                <StandardButton size="medium" onClick={ deleteItem }>
                    Delete
                </StandardButton>
            </div>
        </div>
    );
};



DeleteModal.propTypes = {
    deleteHandler: PropTypes.func
};

export default DeleteModal;
