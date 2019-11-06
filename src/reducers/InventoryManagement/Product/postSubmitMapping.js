import { POST_SUBMIT_MAPPING, POST_SUBMIT_MAPPING_SUCCESS, POST_SUBMIT_MAPPING_FAILURE } from '../../../actions/inventoryManagement';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case POST_SUBMIT_MAPPING:
        return { ...state, ...data };

        case POST_SUBMIT_MAPPING_SUCCESS:
        return { ...state, ...result};

        case POST_SUBMIT_MAPPING_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}