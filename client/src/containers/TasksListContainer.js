import React from 'react';
import { connect } from 'react-redux';
import {
    selectCurrentHousehold
} from '../selectors/householdSelectors'
import {
    selectUser
} from '../selectors/userSelectors';

import TasksList from '../components/TasksList';

const TasksListContainer = props => <TasksList { ...props } />;

const mapStateToProps = state => ({
    user: selectUser(state),
    currentHousehold: selectCurrentHousehold(state)
});

export default connect(mapStateToProps)(TasksListContainer);