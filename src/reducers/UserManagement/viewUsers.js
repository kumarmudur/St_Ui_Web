import { GET_VIEW_USERS, GET_VIEW_USERS_SUCCESS, GET_VIEW_USERS_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_VIEW_USERS:
        return { ...state, ...data };

        case GET_VIEW_USERS_SUCCESS:
        return { ...state, ...result};

        case GET_VIEW_USERS_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}