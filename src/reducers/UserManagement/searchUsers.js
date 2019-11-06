import { POST_SEARCH_USERS, POST_SEARCH_USERS_SUCCESS, POST_SEARCH_USERS_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case POST_SEARCH_USERS:
        return { ...state, ...data };

        case POST_SEARCH_USERS_SUCCESS:
        return { ...state, ...result};

        case POST_SEARCH_USERS_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}