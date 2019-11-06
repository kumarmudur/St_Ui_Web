import { GET_WAREHOUSE_LIST, GET_WAREHOUSE_LIST_SUCCESS, GET_WAREHOUSE_LIST_FAILURE } from '../../../actions/inventoryManagement';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_WAREHOUSE_LIST:
        return { ...state, ...data };

        case GET_WAREHOUSE_LIST_SUCCESS:
        return { ...state, ...result};

        case GET_WAREHOUSE_LIST_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}