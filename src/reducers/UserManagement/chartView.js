import { GET_ORGANIZATIONS_CHART, GET_ORGANIZATIONS_CHART_SUCCESS, GET_ORGANIZATIONS_CHART_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_ORGANIZATIONS_CHART:
        return { ...state, ...data };

        case GET_ORGANIZATIONS_CHART_SUCCESS:
        return { ...state, ...result};

        case GET_ORGANIZATIONS_CHART_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}

