import { call, put } from 'redux-saga/effects';
import fetchData from '../../utils/http';
import apiEndPoints from '../../api/purchasePlan';
import * as action from '../../actions/purchasePlan';

export default function* getPurchasePlanDataSaga(payload) {
    const actionType = action.GET_PURCHASE_PLAN_DATA;
    const url = apiEndPoints[actionType];

    try {
        const result = yield call(fetchData, { 'method': 'get', url, data: payload.data });
        // dispatch a success action to the store with the new result
        yield put({ type: `${actionType}_SUCCESS`, result });
    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: `${actionType}_FAILURE`, error });
    }
}