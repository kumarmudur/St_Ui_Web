import { POST_FILTERS, POST_FILTERS_SUCCESS, POST_FILTERS_FAILURE } from '../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case POST_FILTERS:
        return state;

        case POST_FILTERS_SUCCESS:
        return { ...state, ...result};

        case POST_FILTERS_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}