import * as action from '../../actions';
import { put } from 'redux-saga/effects';
import { deleteLocalFilters } from '../../utils/deleteLocalFilters';

export default function* Logout(authToken) {
    if(authToken) {
        deleteLocalFilters();
        yield put({ type: action.LOGOUT_SUCCESS, result: { loginStatus: 'LOGGED_OUT'} });
    }
}