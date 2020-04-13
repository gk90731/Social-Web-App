/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an error when app first boots up
export default function (state = [], action) {
    switch (action.type) {
        case 'USER_LOGIN': //Login reducer
            return {
                ...state,
                USER_LOGIN:action.payload};
            break;
        case 'USER_SIGNUP': //Login reducer
            return {
                ...state,
                USER_SIGNUP:action.payload};
            break;
        case 'USER_LOGOUT': //LogOut reducer
            return {
                ...state,
                USER_LOGOUT:action.payload};
            break;
        case 'NEW_POST': //LogOut reducer
            return {
                ...state,
                NEW_POST:action.payload};
            break;
        case 'GET_POSTS': //get Posts reducer
            return {
                ...state,
                GET_POSTS:action.payload};
            break;
        case 'MY_USER_DETAIL': //get myUserDetail reducer
            return {
                ...state,
                MY_USER_DETAIL:action.payload};
            break;
        case 'MY_USER_DETAIL': //get myUserDetail reducer
            return {
                ...state,
                USER_BY_FILTER:action.payload};
            break;
    }
    return state;
}