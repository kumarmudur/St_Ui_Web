import { GET_SEND_AGREEMENT, GET_SEND_AGREEMENT_SUCCESS, GET_SEND_AGREEMENT_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case GET_SEND_AGREEMENT:
        return state;

        case GET_SEND_AGREEMENT_SUCCESS:
        return { ...state, ...result};

        case GET_SEND_AGREEMENT_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}