import { POST_ADD_OFFICE, POST_ADD_OFFICE_SUCCESS, POST_ADD_OFFICE_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null,
    country: '',
    state: '',
    city: ''
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case POST_ADD_OFFICE:
        return state;

        case POST_ADD_OFFICE_SUCCESS:
        return { ...state, ...result};

        case POST_ADD_OFFICE_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}