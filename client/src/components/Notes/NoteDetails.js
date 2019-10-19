import React, { Component } from 'react';
import { connect } from 'react-redux';

class NoteDetails extends Component {
    render() {
        if(this.props.currentNote) {
            let body = this.props.currentNote.body;

            let creator = this.props.currentHousehold.members.filter(member => {
                return member._id === this.props.currentNote._creatorId;
            })[0];

            return (
                <div className="note-details note-details--active-note">
                    <h2 className="note-details__title">{ this.props.currentNote.title }</h2>
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
                             at ${ new Date(this.props.currentNote.createdAt).toLocaleString() }`
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
        currentHousehold: state.households.currentHousehold,
        currentNote: state.households.currentNote,
        currentPath: state.view.currentPath
    };
}

export default connect(mapStateToProps)(NoteDetails);