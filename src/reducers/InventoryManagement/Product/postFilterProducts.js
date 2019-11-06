import { POST_FILTER_PRODUCTS, POST_FILTER_PRODUCTS_SUCCESS, POST_FILTER_PRODUCTS_FAILURE } from '../../../actions/inventoryManagement';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case POST_FILTER_PRODUCTS:
        return { ...state, ...data };

        case POST_FILTER_PRODUCTS_SUCCESS:
        return { ...state, ...result};

        case POST_FILTER_PRODUCTS_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}