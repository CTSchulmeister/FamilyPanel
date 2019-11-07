export const selectHouseholds = state => {
    return state.households.households;
};

export const selectCurrentHousehold = state => {
    return state.households.currentHousehold;
};

export const selectHouseholdLoadingState = state => {
    return state.households.loading;
};