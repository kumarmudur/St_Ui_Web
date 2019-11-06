import { GET_PURCHASE_ORDER_LIST, GET_PURCHASE_ORDER_LIST_SUCCESS, GET_PURCHASE_ORDER_LIST_FAILURE } from '../../../actions/inventoryManagement';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_PURCHASE_ORDER_LIST:
        return { ...state, ...data };

        case GET_PURCHASE_ORDER_LIST_SUCCESS:
        return { ...state, ...result};

        case GET_PURCHASE_ORDER_LIST_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}