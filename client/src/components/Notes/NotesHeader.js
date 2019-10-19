import React from 'react';
import { connect } from 'react-redux';

const NotesHeader = (props) => {
    return (
        <h2 className="notes__heading">
            Notes&nbsp;
            <span className="notes__subheading">
                from { props.householdName }
            </span>
        </h2>
    );
};

const mapStateToProps = (state) => {
    return {
        householdName: state.households.currentHousehold.name
    };
};

export default connect(mapStateToProps)(NotesHeader);