import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    readNote
} from '../actions/noteActions';
import {
    selectCurrentHousehold
} from '../selectors/householdSelectors';

import NoteSummary from '../components/NoteSummary';

class NoteSummaryContainer extends Component {
    constructor(props) {
        super(props);
        this.handleClick.bind(this);
    }

    handleClick = () => {
        this.props.readNote(this.props.noteId);
    };

    render() {
        const props = {
            ...this.props,
            handleClick: this.handleClick
        };

        return <NoteSummary { ...props } />;
    }
}

const mapStateToProps = state => ({
    currentHousehold: selectCurrentHousehold(state)
});

export default connect(mapStateToProps, {
    readNote
})(NoteSummaryContainer);