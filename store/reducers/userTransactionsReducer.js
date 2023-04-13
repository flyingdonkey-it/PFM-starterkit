function userTransactionsReducer(state = {}, action) {
    switch (action.type) {
        case UserTransactionsReducerActions.UserTransactionsLoaded:
            return action.payload;
        case UserTransactionsReducerActions.UserTransactionsLoading:
            return {...state, isCompleted: false, refreshConnectionError: false}
        default: return state;
    }
}

export default userTransactionsReducer;

export const UserTransactionsReducerActions = {
    UserTransactionsLoaded: 'UserTransactionsLoaded',
    UserTransactionsLoading: 'UserTransactionsLoading'
}
