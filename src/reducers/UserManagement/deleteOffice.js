import { DELETE_OFFICE, DELETE_OFFICE_SUCCESS, DELETE_OFFICE_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case DELETE_OFFICE:
        return state;

        case DELETE_OFFICE_SUCCESS:
        return { ...state, ...result};

        case DELETE_OFFICE_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}