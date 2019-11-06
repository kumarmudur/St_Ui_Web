import { call, put } from 'redux-saga/effects';
import { postData } from '../../utils/http';
import api from '../../api';
import * as action from '../../actions';
import setLoginResponseStatusSaga from './setLoginResponseStatusSaga';
import { deleteLocalFilters } from '../../utils/deleteLocalFilters';


export default function* postLoginDataSaga(payload) {
  deleteLocalFilters();
  const actionType = action.POST_LOGIN_DATA;
  const url = api[actionType];

    try {
      let result;
      if(payload.data.hasOwnProperty('localLogin')) {
        result = payload.data.localLogin;
      } else {
        result = yield call(postData, { 'method': 'post', url, data: payload.data });
      }
      
      yield call(setLoginResponseStatusSaga, { data: { 'dataLoaded': true } });

        // dispatch a success action to the store with the new result
        yield put({ type: 'POST_LOGIN_DATA_SUCCESS', result });
    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: `${actionType}_FAILURE`, error});
    }
}