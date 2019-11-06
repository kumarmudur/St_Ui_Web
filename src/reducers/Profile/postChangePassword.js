import { POST_CHANGE_PASSWORD, POST_CHANGE_PASSWORD_SUCCESS, POST_CHANGE_PASSWORD_FAILURE } from '../../actions/profile';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case POST_CHANGE_PASSWORD:
        return state;

        case POST_CHANGE_PASSWORD_SUCCESS:
        return { ...state, ...result, status: 200};

        case POST_CHANGE_PASSWORD_FAILURE: 
        return { ...state, status: 500, error};

        default:
        return state;
    }
}