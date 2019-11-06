import { PATCH_UPDATE_PROPOSAL, PATCH_UPDATE_PROPOSAL_SUCCESS, PATCH_UPDATE_PROPOSAL_FAILURE } from '../../actions/proposalManagement';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, data, result, error } = action;

    switch(type) {
        case PATCH_UPDATE_PROPOSAL:
        return { ...state, ...data };

        case PATCH_UPDATE_PROPOSAL_SUCCESS:
        return { ...state, ...result};

        case PATCH_UPDATE_PROPOSAL_FAILURE: 
        return { ...state, ...error};

        default:
        return state;
    }
}