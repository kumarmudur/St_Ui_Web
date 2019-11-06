import { GET_STATIC_DATA_MANAGE_PRODUCT, GET_STATIC_DATA_MANAGE_PRODUCT_SUCCESS, GET_STATIC_DATA_MANAGE_PRODUCT_FAILURE } from '../../../actions/inventoryManagement';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_STATIC_DATA_MANAGE_PRODUCT:
        return { ...state, ...data };

        case GET_STATIC_DATA_MANAGE_PRODUCT_SUCCESS:
        return { ...state, ...result};

        case GET_STATIC_DATA_MANAGE_PRODUCT_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}