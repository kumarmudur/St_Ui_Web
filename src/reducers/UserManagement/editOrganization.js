import { POST_EDIT_ORGANIZATION, POST_EDIT_ORGANIZATION_SUCCESS, POST_EDIT_ORGANIZATION_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case POST_EDIT_ORGANIZATION:
        return state;

        case POST_EDIT_ORGANIZATION_SUCCESS:
        return { ...state, ...result};

        case POST_EDIT_ORGANIZATION_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}