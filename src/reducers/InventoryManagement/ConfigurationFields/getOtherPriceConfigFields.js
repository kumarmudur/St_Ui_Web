import { GET_OTHER_PRICE_CONFIG_FIELDS, GET_OTHER_PRICE_CONFIG_FIELDS_SUCCESS, GET_OTHER_PRICE_CONFIG_FIELDS_FAILURE } from '../../../actions/inventoryManagement';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_OTHER_PRICE_CONFIG_FIELDS:
        return { ...state, ...data };

        case GET_OTHER_PRICE_CONFIG_FIELDS_SUCCESS:
        return { ...state, ...result};

        case GET_OTHER_PRICE_CONFIG_FIELDS_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}