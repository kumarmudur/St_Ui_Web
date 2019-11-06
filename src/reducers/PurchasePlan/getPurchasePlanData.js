import { GET_PURCHASE_PLAN_DATA, GET_PURCHASE_PLAN_DATA_SUCCESS, GET_PURCHASE_PLAN_DATA_FAILURE } from '../../actions/purchasePlan';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_PURCHASE_PLAN_DATA:
        return { ...state, ...data };

        case GET_PURCHASE_PLAN_DATA_SUCCESS:
        return { ...state, ...result};

        case GET_PURCHASE_PLAN_DATA_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}