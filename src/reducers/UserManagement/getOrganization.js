import { GET_ORGANIZATION, GET_ORGANIZATION_SUCCESS, GET_ORGANIZATION_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null,
    rolesData: []
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_ORGANIZATION:
        return { ...state, rolesData: data, ...data };

        case GET_ORGANIZATION_SUCCESS:
        return { ...state, ...result};

        case GET_ORGANIZATION_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}