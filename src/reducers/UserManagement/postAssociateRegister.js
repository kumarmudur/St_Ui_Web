import { POST_ASSOCIATE_REGISTER, POST_ASSOCIATE_REGISTER_SUCCESS, POST_ASSOCIATE_REGISTER_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case POST_ASSOCIATE_REGISTER:
        return state;

        case POST_ASSOCIATE_REGISTER_SUCCESS:
        return { ...state, ...result};

        case POST_ASSOCIATE_REGISTER_FAILURE: 
        return { ...state, error};

        default:
        return state;
    }
}