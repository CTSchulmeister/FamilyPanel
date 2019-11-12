import React from 'react';
import { connect } from 'react-redux';
import { 
    selectUser
} from '../selectors/userSelectors';
import history from '../history';

import UserHandle from '../components/UserHandle';

const UserHandleContainer = props => <UserHandle { ...props } history={ history } />;

const mapStateToProps = state => ({
    user: selectUser(state)
});

export default connect(mapStateToProps)(UserHandleContainer);