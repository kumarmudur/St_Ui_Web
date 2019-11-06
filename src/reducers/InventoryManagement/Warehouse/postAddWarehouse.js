import { POST_ADD_WAREHOUSE, POST_ADD_WAREHOUSE_SUCCESS, POST_ADD_WAREHOUSE_FAILURE } from '../../../actions/inventoryManagement';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case POST_ADD_WAREHOUSE:
        return { ...state, ...data };

        case POST_ADD_WAREHOUSE_SUCCESS:
        return { ...state, ...result};

        case POST_ADD_WAREHOUSE_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}