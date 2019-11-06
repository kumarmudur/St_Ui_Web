import { POST_SEARCH_ROLES, POST_SEARCH_ROLES_SUCCESS, POST_SEARCH_ROLES_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case POST_SEARCH_ROLES:
        return { ...state, ...data };

        case POST_SEARCH_ROLES_SUCCESS:
        return { ...state, ...result};

        case POST_SEARCH_ROLES_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}