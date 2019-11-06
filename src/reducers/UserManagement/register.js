import { POST_REGISTER_DATA, POST_REGISTER_DATA_SUCCESS, POST_REGISTER_DATA_FAILURE } from '../../actions';

const initialState = {
    code: null,
    error: null,
    message: null
};

export default function (state = initialState, action) {
    const { type, result, error} = action;

    switch(type) {
        case POST_REGISTER_DATA:
        return state;

        case POST_REGISTER_DATA_SUCCESS:
        return { ...state, ...result };

        case POST_REGISTER_DATA_FAILURE:
        return { ...state, error};

        default:
        return state;
    }
}