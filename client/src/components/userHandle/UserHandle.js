import React, { Component } from 'react';
import './UserHandle.scss';

class UserHandle extends Component {
    constructor (props) {
        super(props);
        
        this.name = props.name;
    }

    render() {
        return (
            <a href="#" className="user-handle">
                <span className="user-handle__name">{ this.name }</span>
                <img className="user-handle__picture" src={ process.env.PUBLIC_URL + '/anonymousProfilePicture.png ' } />
            </a>
        );
    }
}

export default UserHandle;