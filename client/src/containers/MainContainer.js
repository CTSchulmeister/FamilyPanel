import React from 'react';
import { connect } from 'react-redux';
import {
    selectUserLoadingState
} from '../selectors/userSelectors';
import { 
    selectHouseholdLoadingState
} from '../selectors/householdSelectors';

import Spinner from '../components/Spinner';

const MainContainer = ({
    children,
    isLoading
}) => {
    if(isLoading) return <Spinner />;

    return (
        <div className="main__wrapper">
            <main className="main">
                { children }
            </main>
        </div>
    );
};

const mapStateToProps = state => ({
    isLoading: selectUserLoadingState(state) || selectHouseholdLoadingState(state)
});

export default connect(mapStateToProps)(MainContainer);