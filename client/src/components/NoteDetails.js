import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';
import CircleButton from './CircleButton';
import DeleteModalContent from './DeleteModalContent';

import Heading from './Heading';
import Paragraph from './Paragraph';

const formatBody = body => {
    let keyIncrementer = 0;

    const formattedBody = body.split('\n').map(paragraph => {
        keyIncrementer++;

        return (
            <Paragraph
                light={ false }
                key={ keyIncrementer }
            >
                { paragraph }
            </Paragraph>
        );
    });

    return formattedBody;
};

const formatDate = date => {
    date = new Date(date);

    const dateOptions = {
        month: 'numeric', 
        year: 'numeric', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit'
    };

    return date.toLocaleString(undefined, dateOptions);
};

const NoteDetails = ({
    currentNote,
    currentHousehold,
    user,
    deleteNote,
    editNote
}) => {
    if(!currentNote) return <div className="note-details__wrapper"></div>;
    
    const body = currentNote.body;
    const creator = currentHousehold.members.filter(member => {
        return member._id === currentNote._creatorId;
    })[0];

    const updatedText = (currentNote.updatedAt)
        ? `, Updated ${ formatDate(currentNote.updatedAt) }`
        : '';

    const buttons = (user._id === currentNote._creatorId)
        ? (
            <div className="note-details__buttons">
                <CircleButton 
                    light={ false }
                    onClick={ editNote }
                    tooltipText="Edit"
                >
                    <i className="fas fa-edit"></i>
                </CircleButton>
                <Modal>
                    <CircleButton 
                        light={ false }
                        tooltipText="Delete"
                    >
                        <i className="fas fa-trash-alt"></i>
                    </CircleButton>
                    <DeleteModalContent
                        deleteItemName={ `the note '${ currentNote.title }'`}
                        deleteHandler={ deleteNote }
                        deleteItemId={ currentNote._id }
                    />
                </Modal>
            </div>
        )
        : null;

    const formattedBody = formatBody(body);

    return (
        <div className="note-details__wrapper">
            <div className="note-details">
                <Heading
                    light={ false }
                    divider="colored"
                >
                    { currentNote.title }
                    { buttons }
                </Heading>
                <div className="note-details__author-container">
                    Created By: { `${ creator.firstName } ${ creator.lastName } at ${ formatDate(currentNote.createdAt) }`}
                    { updatedText }
                </div>
                <div className="note-details__body">
                    { formattedBody }
                </div>
            </div>
        </div>
    );
};

NoteDetails.propTypes = {
    currentNote: PropTypes.object,
    currentHousehold: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    deleteNote: PropTypes.func.isRequired,
    editNote: PropTypes.func.isRequired
};

export default NoteDetails;