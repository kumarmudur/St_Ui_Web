import { DELETE_DEPARTMENT, DELETE_DEPARTMENT_SUCCESS, DELETE_DEPARTMENT_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case DELETE_DEPARTMENT:
        return state;

        case DELETE_DEPARTMENT_SUCCESS:
        return { ...state, ...result};

        case DELETE_DEPARTMENT_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}