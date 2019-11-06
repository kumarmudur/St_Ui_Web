import { call, put } from 'redux-saga/effects';
import { postData } from '../../utils/http';
import api from '../../api';
import * as action from '../../actions';

export default function* postOtpSaga(payload) {
    const actionType = action.POST_OTP_DATA;
    const url = api[actionType];

    try {
        const result = yield call(postData, { 'method': 'post', url, data: payload.data });
        // dispatch a success action to the store with the new result
        yield put({ type: `${actionType}_SUCCESS`, result });
    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: `${actionType}_FAILURE`, error});
    }
}