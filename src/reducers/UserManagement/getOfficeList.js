import { GET_OFFICE_LIST, GET_OFFICE_LIST_SUCCESS, GET_OFFICE_LIST_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case GET_OFFICE_LIST:
        return state;

        case GET_OFFICE_LIST_SUCCESS:
        return { ...state, ...result};

        case GET_OFFICE_LIST_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}