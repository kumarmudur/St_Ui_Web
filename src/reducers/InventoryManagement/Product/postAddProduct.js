import { POST_ADD_PRODUCT, POST_ADD_PRODUCT_SUCCESS, POST_ADD_PRODUCT_FAILURE } from '../../../actions/inventoryManagement';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case POST_ADD_PRODUCT:
        return { ...state, ...data };

        case POST_ADD_PRODUCT_SUCCESS:
        return { ...state, ...result};

        case POST_ADD_PRODUCT_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}