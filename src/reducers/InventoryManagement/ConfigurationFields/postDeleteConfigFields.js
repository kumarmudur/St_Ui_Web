import { POST_DELETE_CONFIG_FIELDS, POST_DELETE_CONFIG_FIELDS_SUCCESS, POST_DELETE_CONFIG_FIELDS_FAILURE } from '../../../actions/inventoryManagement';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case POST_DELETE_CONFIG_FIELDS:
        return { ...state, ...data };

        case POST_DELETE_CONFIG_FIELDS_SUCCESS:
        return { ...state, ...result};

        case POST_DELETE_CONFIG_FIELDS_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}