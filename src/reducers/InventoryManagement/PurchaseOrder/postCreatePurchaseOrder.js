import { POST_CREATE_PURCHASE_ORDER, POST_CREATE_PURCHASE_ORDER_SUCCESS, POST_CREATE_PURCHASE_ORDER_FAILURE } from '../../../actions/inventoryManagement';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case POST_CREATE_PURCHASE_ORDER:
        return { ...state, ...data };

        case POST_CREATE_PURCHASE_ORDER_SUCCESS:
        return { ...state, ...result};

        case POST_CREATE_PURCHASE_ORDER_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}