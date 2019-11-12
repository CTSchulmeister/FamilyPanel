import React from 'react';
import PropTypes from 'prop-types';

const getGreeting = today => {
    const currentHour = today.getHours();

    if(currentHour < 6 || currentHour > 17) {
        return 'Good evening';
    } else if(currentHour <= 12) {
        return 'Good morning';
    } else if(currentHour <= 17) {
        return 'Good afternoon';
    }

    throw new Error(`Error getting time.`);
};

const Greeting = ({
    user
}) => {
    const today = new Date();
    const greeting = getGreeting(today);

    return (
        <div className="greeting">
            <div className="greeting__welcoming-statement">
                { greeting }, { user.firstName }
            </div>
            <div className="greeting__info">
                <div className="greeting__time">
                    Current Time: { today.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) }
                </div>
            </div>
        </div>
    );
};

Greeting.propTypes = {
    user: PropTypes.object.isRequired
};

export default Greeting;