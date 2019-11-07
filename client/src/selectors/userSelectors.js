export const selectUser = state => {
    return state.user.user;
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

export const selectUserLoadingState = state => {
    return state.user.loading;
};