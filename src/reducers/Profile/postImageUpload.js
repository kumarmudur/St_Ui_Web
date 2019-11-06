import { POST_PROFILE_IMAGE_UPLOAD, POST_PROFILE_IMAGE_UPLOAD_SUCCESS, POST_PROFILE_IMAGE_UPLOAD_FAILURE } from '../../actions/profile';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case POST_PROFILE_IMAGE_UPLOAD:
        return state;

        case POST_PROFILE_IMAGE_UPLOAD_SUCCESS:
        return { ...state, ...result, status: 200};

        case POST_PROFILE_IMAGE_UPLOAD_FAILURE: 
        return { ...state, status: 500, error};

        default:
        return state;
    }
}