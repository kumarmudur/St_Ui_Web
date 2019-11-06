import { POST_FILTER_WAREHOUSE, POST_FILTER_WAREHOUSE_SUCCESS, POST_FILTER_WAREHOUSE_FAILURE } from '../../../actions/inventoryManagement';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case POST_FILTER_WAREHOUSE:
        return { ...state, ...data };

        case POST_FILTER_WAREHOUSE_SUCCESS:
        return { ...state, ...result};

        case POST_FILTER_WAREHOUSE_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}