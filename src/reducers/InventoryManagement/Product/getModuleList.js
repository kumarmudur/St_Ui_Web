import { GET_MODULE_LIST, GET_MODULE_LIST_SUCCESS, GET_MODULE_LIST_FAILURE } from '../../../actions/inventoryManagement';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_MODULE_LIST:
        return { ...state, ...data };

        case GET_MODULE_LIST_SUCCESS:
        return { ...state, ...result};

        case GET_MODULE_LIST_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}