import { POST_ADD_BULK_IMPORT, POST_ADD_BULK_IMPORT_SUCCESS, POST_ADD_BULK_IMPORT_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case POST_ADD_BULK_IMPORT:
        return state;

        case POST_ADD_BULK_IMPORT_SUCCESS:
        return { ...state, ...result, status: 200};

        case POST_ADD_BULK_IMPORT_FAILURE: 
        return { ...state, status: 500, error};

        default:
        return state;
    }
}