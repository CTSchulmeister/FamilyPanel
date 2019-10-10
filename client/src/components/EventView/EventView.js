import React from 'react';
import './EventView.scss';

import EventList from '../EventList/EventList';
import EventDetails from '../EventDetails/EventDetails';

const EventView = (props) => {
    return (
        <section className="event-view">
            <div className="event-view__header">
                <h2>Events</h2>
            </div>
            <EventList />
            <EventDetails />
        </section>
    );
};

export default EventView;