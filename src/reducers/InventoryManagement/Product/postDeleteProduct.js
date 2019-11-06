import { POST_DELETE_PRODUCT, POST_DELETE_PRODUCT_SUCCESS, POST_DELETE_PRODUCT_FAILURE } from '../../../actions/inventoryManagement';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case POST_DELETE_PRODUCT:
        return { ...state, ...data };

        case POST_DELETE_PRODUCT_SUCCESS:
        return { ...state, ...result};

        case POST_DELETE_PRODUCT_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}