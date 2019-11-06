import { call, put } from 'redux-saga/effects';
import { postData } from '../../utils/http';
//import fetchData from '../../utils/http';
import api from '../../api';
import * as action from '../../actions';
import viewOrganizationsSaga from './viewOrganizationSaga';
import { PAGINATION } from '../../constants';

export default function* postOfficeSaga(payload) {
  const actionType = action.POST_ADD_OFFICE;
  const url = api[actionType];
    try {
      const result = yield call(postData, { 'method': 'post', url, data: payload.data });
      // dispatch a success action to the store with the new result
      yield put({ type: `${actionType}_SUCCESS`, result });

      const getData = {
        authToken: payload.data.authToken,
        data: {
          pageNumber: 0,
          pageSize: PAGINATION.pageSize
        }
       };
      yield call(viewOrganizationsSaga, { data: getData });

    } catch (error) {
      // dispatch a failure action to the store with the error
      yield put({ type: `${actionType}_FAILURE`, error });
    }
}

  