import { call, put } from 'redux-saga/effects';
import fetchData from '../../utils/http';
import apiEndPoints from '../../api';
import * as action from '../../actions';

export default function* getStatesSaga(payload) {
  const actionType = action.GET_STATES;
  const url = apiEndPoints[actionType];
  const country = payload.data.countryName;
    try {
      const result = yield call(fetchData, { 'method': 'get', url, data: payload.data });
      // dispatch a success action to the store with the new result
      yield put({ type: `${actionType}_SUCCESS`, result, country });
    } catch (error) {
      // dispatch a failure action to the store with the error
      yield put({ type: `${actionType}_FAILURE`, error });
    }
}

  
