import { POST_RESEND_EMAIL_LINK, POST_RESEND_EMAIL_LINK_SUCCESS, POST_RESEND_EMAIL_LINK_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case POST_RESEND_EMAIL_LINK:
        return state;

        case POST_RESEND_EMAIL_LINK_SUCCESS:
        return { ...state, ...result};

        case POST_RESEND_EMAIL_LINK_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}