import { GET_EDIT_ROLE_DATA, GET_EDIT_ROLE_DATA_SUCCESS, GET_EDIT_ROLE_DATA_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_EDIT_ROLE_DATA:
        return { ...state, ...data };

        case GET_EDIT_ROLE_DATA_SUCCESS:
        return { ...state, ...result};

        case GET_EDIT_ROLE_DATA_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}