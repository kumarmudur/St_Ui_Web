import { GET_STATIC_DATA_CONFIG, GET_STATIC_DATA_CONFIG_SUCCESS, GET_STATIC_DATA_CONFIG_FAILURE } from '../../actions/purchasePlan';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_STATIC_DATA_CONFIG:
        return { ...state, ...data };

        case GET_STATIC_DATA_CONFIG_SUCCESS:
        return { ...state, ...result};

        case GET_STATIC_DATA_CONFIG_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}