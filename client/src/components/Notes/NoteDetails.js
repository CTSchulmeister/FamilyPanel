import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCurrentNote, selectCurrentHousehold } from '../../reducers/selectors'
import { deleteNote, editNote } from '../../actions/noteActions';

import CircleButton from '../Buttons/CircleButton';

class NoteDetails extends Component {
    constructor(props) {
        super(props);

        this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.deleteNote(this.props.currentNote._id);
    }

    render() {
        if(this.props.currentNote !== null) {
            let body = this.props.currentNote.body;

            let creator = this.props.currentHousehold.members.filter(member => {
                return member._id === this.props.currentNote._creatorId;
            })[0];

            let updatedText = (this.props.currentNote.updatedAt)
                ? `, updated ${ new Date(this.props.currentNote.updatedAt).toLocaleString() }`
                : '';

            return (
                <div className="note-details note-details--active-note">
                    <h2 className="note-details__title">
                        { this.props.currentNote.title }
                        <div className="note-details__buttons">
                            <CircleButton size="medium" onClick={ this.props.editNote }>
                                <i className="fas fa-edit"></i>
                            </CircleButton>
                            <CircleButton size="medium" onClick= {
                                () => {
                                    if(window.confirm(`Are you sure you wanted to delete the note ${ this.props.title}?`)) {
                                        this.handleDelete();
                                    }
                                }
                            }>
                                <i className="fas fa-trash-alt"></i>
                            </CircleButton>
                        </div> 
                    </h2>
                    <div className="note-details__divider"></div>
                    <div className="note-details__from-label note-details__label">From</div>
                    <div className="note-details__note-author">
                        <img 
                            className="note-details__photo" 
                            src={ process.env.PUBLIC_URL + '/anonymousProfilePicture.png ' }
                            alt={ creator.firstName + ' ' + creator.lastName }
                        />
                        { 
                            `${ creator.firstName } ${ creator.lastName }\
                             at ${ new Date(this.props.currentNote.createdAt).toLocaleString() }\
                             ${ updatedText }`    
                        }
                    </div>
                    <div className="note-details__body-label note-details__label">Body</div>
                    <div className="note-details__body">{ body }</div>
                </div>
            );
        } else {
            return (
                <div className="note-details">

                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        currentHousehold: selectCurrentHousehold(state),
        currentNote: selectCurrentNote(state)
    };
}

export default connect(mapStateToProps, { deleteNote, editNote })(NoteDetails);