import { POST_ADMIN_ADDITIONAL_INFO, POST_ADMIN_ADDITIONAL_INFO_SUCCESS, POST_ADMIN_ADDITIONAL_INFO_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case POST_ADMIN_ADDITIONAL_INFO:
        return state;

        case POST_ADMIN_ADDITIONAL_INFO_SUCCESS:
        return { ...state, ...result};

        case POST_ADMIN_ADDITIONAL_INFO_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}