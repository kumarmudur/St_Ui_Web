import { SET_ALERT_STATUS, SET_ALERT_STATUS_SUCCESS, SET_ALERT_STATUS_FAILURE } from '../../actions/inventoryManagement';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case SET_ALERT_STATUS:
        return state;

        case SET_ALERT_STATUS_SUCCESS:
        return { ...state, ...result};

        case SET_ALERT_STATUS_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}