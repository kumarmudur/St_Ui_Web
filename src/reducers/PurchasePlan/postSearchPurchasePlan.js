import { POST_SEARCH_PURCHASE_PLAN, POST_SEARCH_PURCHASE_PLAN_SUCCESS, POST_SEARCH_PURCHASE_PLAN_FAILURE } from '../../actions/purchasePlan';

const initialState = {
    status: null,
    error: null,
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case POST_SEARCH_PURCHASE_PLAN:
        return { ...state, ...data };

        case POST_SEARCH_PURCHASE_PLAN_SUCCESS:
        return { ...state, ...result};

        case POST_SEARCH_PURCHASE_PLAN_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}