import { GET_VIEW_ROLES, GET_VIEW_ROLES_SUCCESS, GET_VIEW_ROLES_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_VIEW_ROLES:
        return { ...state, ...data };

        case GET_VIEW_ROLES_SUCCESS:
        return { ...state, ...result};

        case GET_VIEW_ROLES_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}