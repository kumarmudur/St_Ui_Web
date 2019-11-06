import { POST_ADMIN_PRINT_AGREEMENT, POST_ADMIN_PRINT_AGREEMENT_SUCCESS, POST_ADMIN_PRINT_AGREEMENT_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case POST_ADMIN_PRINT_AGREEMENT:
        return state;

        case POST_ADMIN_PRINT_AGREEMENT_SUCCESS:
        return { ...state, ...result};

        case POST_ADMIN_PRINT_AGREEMENT_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}