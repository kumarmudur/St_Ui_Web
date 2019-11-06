import { POST_ADD_CONFIGURATION_FIELDS, POST_ADD_CONFIGURATION_FIELDS_SUCCESS, POST_ADD_CONFIGURATION_FIELDS_FAILURE } from '../../../actions/inventoryManagement';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case POST_ADD_CONFIGURATION_FIELDS:
        return { ...state, ...data };

        case POST_ADD_CONFIGURATION_FIELDS_SUCCESS:
        return { ...state, ...result};

        case POST_ADD_CONFIGURATION_FIELDS_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}