import React, { Component } from 'react';
import { connect } from 'react-redux';
import { readNote, deleteNote } from '../../actions/householdActions';

class NoteSummary extends Component {
    constructor(props) { 
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleClick() {
        this.props.readNote(this.props.noteId);
    }

    handleDelete() {
        this.props.deleteNote(this.props.noteId);
    }

    render() {
        let className = (this.props.isActive)
            ? 'note-summary note-summary--active'
            : 'note-summary';

        let deleteButton = (this.props.creatorId === this.props.userId)
            ? (
                <button className="button button--sqr" onClick={ 
                    () => {
                        if(window.confirm(`Are you sure you wanted to delete the note ${ this.props.title}?`)) {
                            this.handleDelete();
                        }
                    }
                }>
                    <i className="fas fa-trash-alt"></i>
                </button>
            )
            : null;

        return (
            <div className="note-summary__container">
                <div className={ className } key={ this.props.key } onClick={ this.handleClick }>
                    <div className="note-summary__photo-container">
                        <img 
                            className="note-summary__photo" 
                            src={ process.env.PUBLIC_URL + '/anonymousProfilePicture.png ' }
                            alt='Anonymous Profile PH'
                        />
                    </div>
                    <span className="note-summary__title">{ this.props.title }</span>
                    <span className="note-summary__creator">{ this.props.createdOn } - { this.props.creator || 'Person' }</span>
                    <span className="note-summary__body">{ this.props.body }</span>
                </div>
                <div className="note-summary__button-container">
                    { deleteButton }
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        userId: state.auth.user._id
    };
}

export default connect(mapStateToProps, { readNote, deleteNote })(NoteSummary);