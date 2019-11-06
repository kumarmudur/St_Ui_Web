import { GET_VIEW_PROPOSALS, GET_VIEW_PROPOSALS_SUCCESS, GET_VIEW_PROPOSALS_FAILURE } from '../../actions/proposalManagement';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_VIEW_PROPOSALS:
        return { ...state, ...data };

        case GET_VIEW_PROPOSALS_SUCCESS:
        return { ...state, ...result};

        case GET_VIEW_PROPOSALS_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}