import { NAVIGATION } from '../../actions';

const initialState = {
    currentPage: ''
};

export default function (state = initialState, action) {
    const { type, data } = action;

    switch(type) {
        case NAVIGATION:
        return { ...state, ...data };

       /*  case GET_VIEW_USERS_SUCCESS:
        return { ...state, ...result};

        case GET_VIEW_USERS_FAILURE: 
        return { ...state, ...error};
        */
        default:
        return state; 
    }
}