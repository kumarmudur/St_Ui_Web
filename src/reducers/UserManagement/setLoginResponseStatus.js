import { SET_LOGIN_RESPONSE_STATUS, SET_LOGIN_RESPONSE_STATUS_SUCCESS, SET_LOGIN_RESPONSE_STATUS_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case SET_LOGIN_RESPONSE_STATUS:
        return state;

        case SET_LOGIN_RESPONSE_STATUS_SUCCESS:
        return { ...state, ...result};

        case SET_LOGIN_RESPONSE_STATUS_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}