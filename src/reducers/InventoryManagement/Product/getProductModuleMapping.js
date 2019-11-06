import { GET_PRODUCT_MODULE_MAPPING, GET_PRODUCT_MODULE_MAPPING_SUCCESS, GET_PRODUCT_MODULE_MAPPING_FAILURE } from '../../../actions/inventoryManagement';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_PRODUCT_MODULE_MAPPING:
        return { ...state, ...data };

        case GET_PRODUCT_MODULE_MAPPING_SUCCESS:
        return { ...state, ...result};

        case GET_PRODUCT_MODULE_MAPPING_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}