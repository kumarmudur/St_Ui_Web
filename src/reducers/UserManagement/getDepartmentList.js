import { GET_DEPARTMENT_LIST, GET_DEPARTMENT_LIST_SUCCESS, GET_DEPARTMENT_LIST_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case GET_DEPARTMENT_LIST:
        return state;

        case GET_DEPARTMENT_LIST_SUCCESS:
        return { ...state, ...result};

        case GET_DEPARTMENT_LIST_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}