import React from 'react';
import PropTypes from 'prop-types';

const NoteSummary = ({
    isActive,
    currentHousehold,
    creatorId,
    title,
    createdAt,
    body,
    handleClick
}) => {
    const className = (isActive)
        ? 'note-summary--active'
        : 'note-summary';

    const creator = currentHousehold.members.filter(member => {
        return member._id === creatorId;
    })[0];

    return (
        <div className={ className } onClick={ handleClick }>
            <div className="note-summary__photo-container">
                <img 
                    className="note-summary__photo" 
                    src={ process.env.PUBLIC_URL + '/anonymousProfilePicture.png ' }
                    alt={ creator.firstName + ' ' + creator.lastName }
                />
            </div>
            <span className="note-summary__title">{ title }</span>
            <span className="note-summary__creator">{ createdAt.toLocaleDateString() } - { creator.firstName } { creator.lastName }</span>
            <span className="note-summary__body">{ body }</span>
        </div>
    )
};

NoteSummary.propTypes = {
    isActive: PropTypes.bool.isRequired,
    currentHousehold: PropTypes.object.isRequired,
    creatorId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    body: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default NoteSummary;