import { POST_EXPORT_USERS, POST_EXPORT_USERS_SUCCESS, POST_EXPORT_USERS_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case POST_EXPORT_USERS:
        return state;

        case POST_EXPORT_USERS_SUCCESS:
        return { ...state, ...result};

        case POST_EXPORT_USERS_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}