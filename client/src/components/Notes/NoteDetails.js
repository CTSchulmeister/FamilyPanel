import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCurrentNote, selectCurrentHousehold } from '../../reducers/selectors'
import { deleteNote, editNote } from '../../actions/noteActions';

import CircleButton from '../Buttons/CircleButton';
import DeleteModal from '../Modals/DeleteModal';

class NoteDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteModal: false
        };

        this.toggleDeleteModal.bind(this);
    }

    toggleDeleteModal = () => {
        this.setState({
            showDeleteModal: (this.state.showDeleteModal) ? false : true
        });
    };

    render() {
        if(this.props.currentNote !== null) {
            const body = this.props.currentNote.body;

            const creator = this.props.currentHousehold.members.filter(member => {
                return member._id === this.props.currentNote._creatorId;
            })[0];

            const updatedText = (this.props.currentNote.updatedAt)
                ? `| Updated ${ new Date(this.props.currentNote.updatedAt).toLocaleString(undefined, { month: 'numeric', year: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit' }) }`
                : '';

            const deleteModal = (this.state.showDeleteModal)
                ? (
                    <DeleteModal
                        deleteItemName={ `the note '${ this.props.currentNote.title }'`}
                        cancelHandler={ this.toggleDeleteModal }
                        deleteHandler={ this.props.deleteNote }
                        deleteItemId={ this.props.currentNote._id }
                        cancelDelete={ this.toggleDeleteModal }
                    />
                )
                : null;

            return (
                <div className="note-details note-details--active-note">
                    { deleteModal }
                    <h2 className="note-details__title">
                        { this.props.currentNote.title }
                        <div className="note-details__buttons">
                            <CircleButton size="medium" onClick={ this.props.editNote }>
                                <i className="fas fa-edit"></i>
                            </CircleButton>
                            <CircleButton size="medium" onClick= { this.toggleDeleteModal }>
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
                             at ${ new Date(this.props.currentNote.createdAt).toLocaleString(undefined, { month: 'numeric', year: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit' }) }\
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