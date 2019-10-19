import React, { Component } from 'react';
import { connect } from 'react-redux';
import { readNote } from '../../actions/householdActions';

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

        return (
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
        );
    }
};

export default connect(null, { readNote })(NoteSummary);