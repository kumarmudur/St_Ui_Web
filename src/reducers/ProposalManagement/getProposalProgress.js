import { GET_PROPOSAL_PROGRESS, GET_PROPOSAL_PROGRESS_SUCCESS, GET_PROPOSAL_PROGRESS_FAILURE } from '../../actions/proposalManagement';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case GET_PROPOSAL_PROGRESS:
        return { ...state, ...data };

        case GET_PROPOSAL_PROGRESS_SUCCESS:
        return { ...state, ...result};

        case GET_PROPOSAL_PROGRESS_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}