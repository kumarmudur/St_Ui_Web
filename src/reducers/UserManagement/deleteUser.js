import { DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case DELETE_USER:
        return state;

        case DELETE_USER_SUCCESS:
        return { ...state, ...result};

        case DELETE_USER_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}