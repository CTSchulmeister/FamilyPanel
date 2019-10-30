import React from 'react';
import { connect } from 'react-redux';
import { selectUser } from '../../reducers/selectors';

const Greeting = props => {
    const today = new Date();
    const currentHour = today.getHours();

    let greeting;
    
    if(currentHour < 6 || currentHour > 17) {
        greeting = 'Good evening';
    } else if(currentHour <= 12) {
        greeting = 'Good morning';
    } else if(currentHour <= 17) {
        greeting = 'Good afternoon';
    }

    return (
        <div className="greeting">
            <div className="greeting__welcoming-statement">
                { greeting }, { props.user.firstName }
            </div>
            <div className="greeting__info">
                <div className="greeting__time">
                    Current Time: { today.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) }
                </div>
                
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: selectUser(state)
    };
};

export default connect(mapStateToProps)(Greeting);