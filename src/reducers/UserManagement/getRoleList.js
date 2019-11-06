import { GET_ROLE_LIST, GET_ROLE_LIST_SUCCESS, GET_ROLE_LIST_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case GET_ROLE_LIST:
        return state;

        case GET_ROLE_LIST_SUCCESS:
        return { ...state, ...result};

        case GET_ROLE_LIST_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}