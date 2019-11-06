import { GET_STATIC_DATA_PURCHASE_ORDER, GET_STATIC_DATA_PURCHASE_ORDER_SUCCESS, GET_STATIC_DATA_PURCHASE_ORDER_FAILURE } from '../../../actions/inventoryManagement';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_STATIC_DATA_PURCHASE_ORDER:
        return { ...state, ...data };

        case GET_STATIC_DATA_PURCHASE_ORDER_SUCCESS:
        return { ...state, ...result};

        case GET_STATIC_DATA_PURCHASE_ORDER_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}