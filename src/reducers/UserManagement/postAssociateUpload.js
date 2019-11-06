import { POST_ASSOCIATE_DOCUMENT_UPLOAD, POST_ASSOCIATE_DOCUMENT_UPLOAD_SUCCESS, POST_ASSOCIATE_DOCUMENT_UPLOAD_FAILURE } from '../../actions';

const initialState = {
    status: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, result, error } = action;

    switch(type) {
        case POST_ASSOCIATE_DOCUMENT_UPLOAD:
        return state;

        case POST_ASSOCIATE_DOCUMENT_UPLOAD_SUCCESS:
        return { ...state, ...result, status: 200};

        case POST_ASSOCIATE_DOCUMENT_UPLOAD_FAILURE: 
        return { ...state, status: 500, error};

        default:
        return state;
    }
}