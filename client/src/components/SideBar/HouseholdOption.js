import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeCurrentHousehold } from '../../actions/householdActions';

class HouseholdOption extends Component {
    constructor(props) {
        super(props);

        this.handleClick.bind(this);
    }

    handleClick = () => {
        this.props.closeWindow();
        this.props.changeCurrentHousehold(this.props.id);
    };

    render() {
        return (
            <button className="side-bar__household-option" onClick={ this.handleClick }>
                { this.props.name }
            </button>
        );
    }
}

export default connect(null, { changeCurrentHousehold })(HouseholdOption);