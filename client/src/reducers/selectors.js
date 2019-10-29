export const selectHouseholds = state => {
    return state.households.households;
};

export const selectCurrentHousehold = state => {
    return state.households.currentHousehold;
};

export const selectCurrentNote = state => {
    return state.households.currentNote;
};

export const selectUser = state => {
    return state.user.user;
};

export const selectLoadingState = state => {
    return state.user.loading || state.households.loading;
};

export const selectAuthenticationState = state => {
    return state.user.authenticated;
};

export const selectLogInErrors = state => {
    return state.user.logInErrors;
};

export const selectRegistrationErrors = state => {
    return state.user.registrationErrors;
};