import { POST_LOGIN_DATA, POST_LOGIN_DATA_SUCCESS, POST_LOGIN_DATA_FAILURE, LOGOUT, LOGOUT_SUCCESS  } from '../../actions';

const initialState = {
    code: null,
    error: null,
    authToken: null,
    fullName: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case POST_LOGIN_DATA:
        return state;

        case POST_LOGIN_DATA_SUCCESS:
        return { ...state, ...result };

        case POST_LOGIN_DATA_FAILURE: 
        return { ...state, error };

        case LOGOUT:
        return state;

        case LOGOUT_SUCCESS:
        return { ...initialState, ...result };

        default:
        return state;
    }
}