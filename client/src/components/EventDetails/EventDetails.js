import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeSubView } from '../../actions/viewActions';
import './EventDetails.scss';

import CreateEventForm from '../CreateEventForm/CreateEventForm';

class EventDetails extends Component {
    constructor(props) {
        super(props);

        this.activateEventCreator = this.activateEventCreator.bind(this);
        this.deactivateEventCreator = this.deactivateEventCreator.bind(this);
    }

    activateEventCreator() {
        this.props.changeSubView('createEvent');
    }

    deactivateEventCreator() {
        this.props.changeSubView(null);
    }

    render() {
        if(this.props.currentHousehold.events.length === 0) {
            if(this.props.subView === 'createEvent') {
                return (
                    <div className="event-details event-details--form">
                        <div className="event-details__form-button-group">
                            <button className="button button--med" onClick={ this.deactivateEventCreator }>Go Back</button>
                        </div>
                        <div className="event-details__form-wrapper">
                            <CreateEventForm />
                        </div>
                        
                    </div>
                );
            } else {
                return (
                    <div className="event-details--no-events">
                        <h3>You don't have any events yet!</h3>
                        <span>Why don't you add one?</span>
                        <button onClick={ this.activateEventCreator }>
                            Create Your First Event
                        </button>
                    </div>
                );
            }
        }

        return (
            <div className="event-details">
                ...
            </div>  
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentHousehold: state.households.currentHousehold,
        subView: state.view.subView
    };
}

export default connect(mapStateToProps, { changeSubView })(EventDetails);