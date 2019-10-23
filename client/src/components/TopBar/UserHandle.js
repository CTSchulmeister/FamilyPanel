import React from 'react';
import { connect } from 'react-redux';

const UserHandle = (props) => {
    return (
        <button className="user-handle">
            <span className="user-handle__name">
                { props.user.firstName } { props.user.lastName }
            </span>
            <img 
                className="user-handle__picture" 
                src={ process.env.PUBLIC_URL + '/anonymousProfilePicture.png ' } 
                alt={ `${ props.user.firstName } ${ props.user.lastName }` }
            />
        </button>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    };
};

export default connect(mapStateToProps)(UserHandle);