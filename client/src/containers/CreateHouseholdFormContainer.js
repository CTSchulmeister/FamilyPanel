import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    createHousehold 
} from '../actions/householdActions';
import {
    selectUser
} from '../selectors/userSelectors';
import history from '../history';

import CreateHouseholdForm from '../components/CreateHouseholdForm';

class CreateHouseholdFormContainer extends Component {
    constructor(props) {
        super(props);

        if(this.props.user) {
            this.state = {
                allowSubmit: false,
                submissionData: {
                    ownerId: this.props.user._id,
                    memberIds: [this.props.user._id],
                    name: '',
                    allMembersCanInvite: true,
                    allMembersCanCreateEvents: true,
                    allMembersCanCreateTasks: true,
                    allMembersCanCreateNotes: true
                }
            };
        } else {
            this.state = {};
        }

        this.handleChange.bind(this);
        this.handleToggleChange.bind(this);
        this.canSubmit.bind(this);
        this.handleSubmit.bind(this);
    }

    /**
     * @returns {Boolean}
     */
    canSubmit = name => {
        const nameLength = name.length;
        return (nameLength > 0 && nameLength <= 50) ? true : false;
    };

    handleChange = event => {
        const {
            name: key,
            value
        } = event.target;

        if(key === 'name') {
            this.setState({
                submissionData: {
                    ...this.state.submissionData,
                    [key]: value
                },
                allowSubmit: this.canSubmit(value)
            });
        } else{
            this.setState({
                submissionData: {
                    ...this.state.submissionData,
                    [key]: value
                }
            });
        }
    };

    handleToggleChange = key => {
        this.setState({
            submissionData: {
                ...this.state.submissionData,
                [key]: !this.state.submissionData[key]
            }
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        if(this.state.allowSubmit) {
            try {
                await this.props.createHousehold(this.state.submissionData);
                history.push('/home');
            } catch (error) {
                // TODO: Handle error with logging
                alert(`Error encountered creating household: ${ error }`);
            }
        }
    };

    render() {
        const props = {
            handleChange: this.handleChange,
            handleToggleChange: this.handleToggleChange,
            handleSubmit: this.handleSubmit,
            className: this.props.className,
            allowSubmit: this.state.allowSubmit,
            ...this.state.submissionData
        };

        return <CreateHouseholdForm {...props} />;
    }
}

const mapStateToProps = state => ({
    user: selectUser(state)
});

export default connect(mapStateToProps, { 
    createHousehold 
})(CreateHouseholdFormContainer);