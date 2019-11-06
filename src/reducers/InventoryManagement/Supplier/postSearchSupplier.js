import { POST_SEARCH_SUPPLIER, POST_SEARCH_SUPPLIER_SUCCESS, POST_SEARCH_SUPPLIER_FAILURE } from '../../../actions/inventoryManagement';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case POST_SEARCH_SUPPLIER:
        return { ...state, ...data };

        case POST_SEARCH_SUPPLIER_SUCCESS:
        return { ...state, ...result};

        case POST_SEARCH_SUPPLIER_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}