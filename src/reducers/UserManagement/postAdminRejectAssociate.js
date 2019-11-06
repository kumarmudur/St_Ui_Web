import { POST_ADMIN_REJECT_ASSOCIATE, POST_ADMIN_REJECT_ASSOCIATE_SUCCESS, POST_ADMIN_REJECT_ASSOCIATE_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case POST_ADMIN_REJECT_ASSOCIATE:
        return state;

        case POST_ADMIN_REJECT_ASSOCIATE_SUCCESS:
        return { ...state, ...result};

        case POST_ADMIN_REJECT_ASSOCIATE_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}