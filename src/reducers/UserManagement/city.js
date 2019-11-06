import { GET_CITY, GET_CITY_SUCCESS, GET_CITY_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_CITY:
        return { ...state, ...data };

        case GET_CITY_SUCCESS:
        return { ...state, ...result};

        case GET_CITY_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}