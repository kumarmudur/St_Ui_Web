import { POST_EDIT_USER, POST_EDIT_USER_SUCCESS, POST_EDIT_USER_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case POST_EDIT_USER:
        return state;

        case POST_EDIT_USER_SUCCESS:
        return { ...state, ...result};

        case POST_EDIT_USER_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}