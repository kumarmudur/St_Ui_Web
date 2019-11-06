import { POST_FORGOT_PASSWORD, POST_FORGOT_PASSWORD_SUCCESS, POST_FORGOT_PASSWORD_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case POST_FORGOT_PASSWORD:
        return state;

        case POST_FORGOT_PASSWORD_SUCCESS:
        return { ...state, ...result };

        case POST_FORGOT_PASSWORD_FAILURE: 
        return { ...state, status: 500, error};

        default:
        return state;
    }
}