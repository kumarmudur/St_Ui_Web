import { POST_SEARCH_PROPOSALS, POST_SEARCH_PROPOSALS_SUCCESS, POST_SEARCH_PROPOSALS_FAILURE } from '../../actions/proposalManagement';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case POST_SEARCH_PROPOSALS:
        return { ...state, ...data };

        case POST_SEARCH_PROPOSALS_SUCCESS:
        return { ...state, ...result};

        case POST_SEARCH_PROPOSALS_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}