import { SET_PRINT_AGREEMENT_STATUS, SET_PRINT_AGREEMENT_STATUS_SUCCESS, SET_PRINT_AGREEMENT_STATUS_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case SET_PRINT_AGREEMENT_STATUS:
        return state;

        case SET_PRINT_AGREEMENT_STATUS_SUCCESS:
        return { ...state, ...result};

        case SET_PRINT_AGREEMENT_STATUS_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}