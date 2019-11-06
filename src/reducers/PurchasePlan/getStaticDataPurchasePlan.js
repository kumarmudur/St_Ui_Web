import { GET_STATIC_DATA_PURCHASE_PLAN, GET_STATIC_DATA_PURCHASE_PLAN_SUCCESS, GET_STATIC_DATA_PURCHASE_PLAN_FAILURE } from '../../actions/purchasePlan';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_STATIC_DATA_PURCHASE_PLAN:
        return { ...state, ...data };

        case GET_STATIC_DATA_PURCHASE_PLAN_SUCCESS:
        return { ...state, ...result};

        case GET_STATIC_DATA_PURCHASE_PLAN_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}