import { GET_PRODUCT_DATA, GET_PRODUCT_DATA_SUCCESS, GET_PRODUCT_DATA_FAILURE } from '../../../actions/inventoryManagement';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_PRODUCT_DATA:
        return { ...state, ...data };

        case GET_PRODUCT_DATA_SUCCESS:
        return { ...state, ...result};

        case GET_PRODUCT_DATA_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}