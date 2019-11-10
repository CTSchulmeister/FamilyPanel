import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    selectCurrentHousehold,
    selectHouseholds
} from '../selectors/householdSelectors';
import { changeCurrentHousehold } from '../actions/householdActions';
import { Link } from 'react-router-dom';

import SideBarHeader from '../components/SideBar/SideBarHeader';
import SideBarGroups from '../components/SideBar/SideBarGroups';

class SideBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showHouseholdCreation: false
        };

        this.toggleHouseholdCreationForm.bind(this);
        this.handleHouseholdCreation.bind(this);
    }

    toggleHouseholdCreationForm = () => {
        this.setState({
            showHouseholdCreation: !this.state.showHouseholdCreation
        });
    };

    handleHouseholdCreation = () => {
        this.setState({
            showHouseholdCreation: false
        });
    };

    render() {
        const headerProps = {
            toggleHouseholdCreationForm: this.toggleHouseholdCreationForm,
            handleHouseholdCreation: this.handleHouseholdCreation,
            showHouseholdCreation: this.state.showHouseholdCreation,
            currentHousehold: this.props.currentHousehold,
            households: this.props.households,
            changeCurrentHousehold: this.props.changeCurrentHousehold
        };

        const groupsProps = {
            activeLink: this.props.activeLink,
            households: this.props.households
        }

        return (
            <aside className="side-bar">
                <Link to="/" className="side-bar__logo">
                    <h1>Family Panel</h1>
                </Link>
                <div className="side-bar__main">
                    <SideBarHeader { ...headerProps } />
                    <SideBarGroups {...groupsProps} />
                </div>
            </aside>
        );
    }
}

SideBar.propTypes = {
    activeLink: PropTypes.oneOf([
        'profile',
        'home',
        'notes'
    ]).isRequired
};

const mapStateToProps = state => ({
    households: selectHouseholds(state),
    currentHousehold: selectCurrentHousehold(state)
});

export default connect(mapStateToProps, {
    changeCurrentHousehold
})(SideBar);