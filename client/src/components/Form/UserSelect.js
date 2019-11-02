import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserOption from './UserOption';

class UserSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDropDown: false,
            activeUserId: props.activeUserId
        };

        this.userOptions = props.users.map(user => {
            return (
                <UserOption 
                    user={ user } 
                    key={ user._id }
                    isActive={ props.activeUserId === user._id }
                    onClick={ this.props.onClick }
                />
            );
        });

        this.toggleDropDown.bind(this);
    }

    toggleDropDown = event => {
        event.preventDefault();

        this.setState({
            showDropDown: (this.state.showDropDown) ? false : true
        });
    };

    render() {
        const caretIcon = (this.state.showDropDown)
            ? <i className="fas fa-caret-up"></i>
            : <i className="fas fa-caret-down"></i>;

        const userOptions = (this.state.showDropDown)
            ? (
                <div className="user-options">
                    { this.userOptions }
                </div>
            )
            : null;

        return (
            <div className="user-select">
                <button className="user-select__trigger" onClick={ this.toggleDropDown }>
                    { this.props.title }&nbsp;
                    { caretIcon }
                </button>
                { userOptions }
            </div>
        );
    };
}

UserSelect.propTypes = {
    title: PropTypes.string.isRequired
};

export default UserSelect;