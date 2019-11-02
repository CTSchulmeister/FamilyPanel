import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCurrentHousehold, selectUser } from '../../reducers/selectors';

import InvitationModal from '../Modals/InvitationModal';
import HomeSettings from './HomeSettings';

import SectionHeader from '../Layout/SectionHeader';
import CircleButton from '../Buttons/CircleButton';
import SubHeading from '../Typography/SubHeading';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showInvitationModal: false
        };

        this.toggleInvitationModal.bind(this);
    }

    toggleInvitationModal = () => {
        this.setState({
            showInvitationModal: (this.state.showInvitationModal) ? false : true
        });
    };

    render() {
        const invitationModal = (this.state.showInvitationModal)
            ? <InvitationModal toggleInvitationModal={ this.toggleInvitationModal } />
            : null;

        const canInvite = this.props.currentHousehold.settings.allMembersCanInvite || this.props.currentHousehold._ownerId === this.props.user._id;

        const button = (canInvite)
            ? (
                <SubHeading light={ true }>
                    Invite User
                </SubHeading>
            )
            : null;

        return (
            <section className="home">
                <SectionHeader title="Home">
                    <div className="home__invite-member">
                        <CircleButton light={ true } onClick={ this.toggleInvitationModal }>
                            <i className="fas fa-user-plus"></i>
                        </CircleButton>
                        { button }
                        { invitationModal }
                    </div>
                </SectionHeader>
                <HomeSettings />
            </section>
        );
    }
};

const mapStateToProps = state => {
    return {
        currentHousehold: selectCurrentHousehold(state),
        user: selectUser(state)
    };
};

export default connect(mapStateToProps)(Home);