import React from 'react';
import PropTypes from 'prop-types';

const TasksList = ({
    user,
    currentHousehold,
    currentTask,
    toggleShowCreateTask
}) => {
    return (
        <div className="tasks-list">

        </div>
    );
};

TasksList.propTypes = {
    user: PropTypes.object.isRequired,
    currentHousehold: PropTypes.object.isRequired,
    currentTask: PropTypes.object.isRequired,
    toggleShowCreateTask: PropTypes.func.isRequired
};

export default TasksList;