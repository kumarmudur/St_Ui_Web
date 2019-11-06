import { GET_COUNTRY, GET_COUNTRY_SUCCESS, GET_COUNTRY_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;
    switch(type) {
        case GET_COUNTRY:
        return { ...state, ...data };

        case GET_COUNTRY_SUCCESS:
        return { ...state, ...result};

        case GET_COUNTRY_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}