import React from 'react';
import { connect } from 'react-redux';
import { changeView } from '../../actions/viewActions';
import './UserHandle.scss';

const UserHandle = (props) => {
    let name = `${ props.firstName } ${ props.lastName }`;

    if(name.length > 30) {
        name = name.substring(0, 26) + '...';
    }

    const viewProfile = () => {
        props.changeView('profile');
    }

    return (
        <button className="user-handle" onClick={ viewProfile }>
            <span className="user-handle__name">{ name }</span>
            <img 
                className="user-handle__picture" 
                src={ process.env.PUBLIC_URL + '/anonymousProfilePicture.png ' } 
                alt={ name }
            />
        </button>
    );
};



export default connect(null, { changeView })(UserHandle);