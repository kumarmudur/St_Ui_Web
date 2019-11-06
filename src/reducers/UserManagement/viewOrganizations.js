import { GET_VIEW_ORGANIZATIONS, GET_VIEW_ORGANIZATIONS_SUCCESS, GET_VIEW_ORGANIZATIONS_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_VIEW_ORGANIZATIONS:
        return { ...state, ...data };

        case GET_VIEW_ORGANIZATIONS_SUCCESS:
        return { ...state, ...result};

        case GET_VIEW_ORGANIZATIONS_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}