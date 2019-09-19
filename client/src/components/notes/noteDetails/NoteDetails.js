import React, { Component } from 'react';
import './NoteDetails.scss';

class NoteDetails extends Component {
    constructor(props) {
        super(props);

        this.title = props.title;
        this.creator = props.creator
        this.body = (props.body) ? props.body : null;
        this.createdAt = props.createdAt;
        this.updatedAt = (props.updatedAt) ? props.updatedAt : null;
    }

    render() {
        let body;
        if(this.body) {
            body = this.body;
        } else {
            body = 'This note has no body text';
        }

        let updated = '';
        if(this.updatedAt) {
            updated = ` (Updated at ${ this.updatedAt })`;
        }

        return (
            <div className="note-detail">
                <div className="note-detail__header">
                    <h3 className="note-detail__title">{ this.title }</h3>
                    <span className="note-detail__subtitle">
                        Created By 
                        <a className="note-detail__creator-link">
                            &nbsp;{ this.creator }&nbsp;
                        </a>
                        on { this.createdAt }
                        { updated }
                    </span>
                </div>
                <div className="note-detail__body">
                    { body }
                </div>
            </div>
        );
    }
}

export default NoteDetails;