import React, { Component } from 'react';
import { connect } from 'react-redux';
import { readNote } from '../../actions/noteActions';

class NoteSummary extends Component {
    constructor(props) { 
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.readNote(this.props.noteId);
    }

    render() {
        let className = (this.props.isActive)
            ? 'note-summary note-summary--active'
            : 'note-summary';

        let creator = this.props.currentHousehold.members.filter(member => {
            return member._id === this.props.creatorId;
        })[0];

        return (
            <div className={ className } key={ this.props.key } onClick={ this.handleClick }>
                <div className="note-summary__photo-container">
                    <img 
                        className="note-summary__photo" 
                        src={ process.env.PUBLIC_URL + '/anonymousProfilePicture.png ' }
                        alt={ creator.firstName + ' ' + creator.lastName }
                    />
                </div>
                <span className="note-summary__title">{ this.props.title }</span>
                <span className="note-summary__creator">{ this.props.createdAt.toLocaleDateString() } - { creator.firstName } { creator.lastName }</span>
                <span className="note-summary__body">{ this.props.body }</span>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        userId: state.user.user._id,
        currentHousehold: state.households.currentHousehold
    };
}

export default connect(mapStateToProps, { readNote })(NoteSummary);