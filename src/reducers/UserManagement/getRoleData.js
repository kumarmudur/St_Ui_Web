import { GET_ROLE_DATA, GET_ROLE_DATA_SUCCESS, GET_ROLE_DATA_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null,
    rolesData: []
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_ROLE_DATA:
        return { ...state, rolesData: data, ...data };

        case GET_ROLE_DATA_SUCCESS:
        return { ...state, ...result};

        case GET_ROLE_DATA_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}