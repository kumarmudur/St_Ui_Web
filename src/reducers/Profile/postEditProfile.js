import { POST_EDIT_PROFILE, POST_EDIT_PROFILE_SUCCESS, POST_EDIT_PROFILE_FAILURE } from '../../actions/profile';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case POST_EDIT_PROFILE:
        return state;

        case POST_EDIT_PROFILE_SUCCESS:
        return { ...state, ...result};

        case POST_EDIT_PROFILE_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}