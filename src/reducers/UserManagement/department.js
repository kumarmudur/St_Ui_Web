import { POST_ADD_DEPARTMENT, POST_ADD_DEPARTMENT_SUCCESS, POST_ADD_DEPARTMENT_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case POST_ADD_DEPARTMENT:
        return state;

        case POST_ADD_DEPARTMENT_SUCCESS:
        return { ...state, ...result};

        case POST_ADD_DEPARTMENT_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}