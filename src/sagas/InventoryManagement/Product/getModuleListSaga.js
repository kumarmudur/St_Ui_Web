import { call, put } from 'redux-saga/effects';
import fetchData from '../../../utils/http';
import apiEndPoints from '../../../api/inventoryManagement';
import * as action from '../../../actions/inventoryManagement';

export default function* getModuleListSaga(payload) {
    const actionType = action.GET_MODULE_LIST;
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