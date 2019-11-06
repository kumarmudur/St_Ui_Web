import { GET_USER_TYPE_LIST, GET_USER_TYPE_LIST_SUCCESS, GET_USER_TYPE_LIST_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case GET_USER_TYPE_LIST:
        return state;

        case GET_USER_TYPE_LIST_SUCCESS:
        return { ...state, ...result};

        case GET_USER_TYPE_LIST_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}