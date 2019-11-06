import { call, put } from 'redux-saga/effects';
import { postDataWithFile } from '../../utils/http';
import api from '../../api';
import * as action from '../../actions';
import setAlertStatus from './setAlertStatusSaga';

export default function* postAddUserSaga(payload) {
  const actionType = action.POST_ADD_BULK_IMPORT;
  const url = api[actionType];
    try {
      const result = yield call(postDataWithFile, { 'method': 'post', url, importMode: payload.importMode, file: payload.file });
      
      // dispatch a success action to the store with the new result
      yield put({ type: `${actionType}_SUCCESS`, result });
      yield call(setAlertStatus, { data: { 'visible': true } });
      
    } catch (error) {
      // dispatch a failure action to the store with the error
      yield put({ type: `${actionType}_FAILURE`, error });
    }
}

  