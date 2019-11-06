import { GET_ADD_BULK_IMPORT, GET_ADD_BULK_IMPORT_SUCCESS, GET_ADD_BULK_IMPORT_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_ADD_BULK_IMPORT:
        return { ...state, ...data };

        case GET_ADD_BULK_IMPORT_SUCCESS:
        return { ...state, ...result};

        case GET_ADD_BULK_IMPORT_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}