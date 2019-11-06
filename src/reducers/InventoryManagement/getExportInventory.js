import { POST_EXPORT_INVENTORY, POST_EXPORT_INVENTORY_SUCCESS, POST_EXPORT_INVENTORY_FAILURE } from '../../actions/inventoryManagement';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case POST_EXPORT_INVENTORY:
        return state;

        case POST_EXPORT_INVENTORY_SUCCESS:
        return { ...state, ...result };

        case POST_EXPORT_INVENTORY_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}