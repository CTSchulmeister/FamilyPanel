import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EventList.scss';

class EventList extends Component {
    render() {
        return (
            <div className="event-list">
                
            </div>  
        );
    }
}

export default connect()(EventList);