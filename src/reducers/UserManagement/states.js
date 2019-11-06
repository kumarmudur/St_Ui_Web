import { GET_STATES, GET_STATES_SUCCESS, GET_STATES_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_STATES:
        return { ...state, ...data };

        case GET_STATES_SUCCESS:
        return { ...state, ...result};

        case GET_STATES_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}