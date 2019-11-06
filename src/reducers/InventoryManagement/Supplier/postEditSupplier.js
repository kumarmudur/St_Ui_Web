import { POST_EDIT_SUPPLIER, POST_EDIT_SUPPLIER_SUCCESS, POST_EDIT_SUPPLIER_FAILURE } from '../../../actions/inventoryManagement';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case POST_EDIT_SUPPLIER:
        return { ...state, ...data };

        case POST_EDIT_SUPPLIER_SUCCESS:
        return { ...state, ...result};

        case POST_EDIT_SUPPLIER_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}