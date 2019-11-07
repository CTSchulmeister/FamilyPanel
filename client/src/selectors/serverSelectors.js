export const selectServerErrorStatus = state => {
    return state.server.connectionError;
};