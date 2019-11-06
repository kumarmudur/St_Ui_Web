import { POST_EDIT_ROLE, POST_EDIT_ROLE_SUCCESS, POST_EDIT_ROLE_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case POST_EDIT_ROLE:
        return state;

        case POST_EDIT_ROLE_SUCCESS:
        return { ...state, ...result};

        case POST_EDIT_ROLE_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}