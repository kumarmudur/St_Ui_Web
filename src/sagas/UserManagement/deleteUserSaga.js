import { call, put } from 'redux-saga/effects';
import { postData } from '../../utils/http';
import INTERNALAPI from '../../api';
import * as action from '../../actions';
import viewUsersSaga from './viewUsersSaga';
import { PAGINATION } from '../../constants';


export default function* deleteUserSaga(payload) {
    const actionType = action.DELETE_USER;
    const url = INTERNALAPI[actionType] || null;
  
    if(url) {
        try {
          const result = yield call(postData, { url, data: payload.data });
          // dispatch a success action to the store with the new result
          yield put({ type:  `${actionType}_SUCCESS`, result });

          const getData = {
            authToken: payload.data.authToken,
            data: {
              pageNumber: 0,
              pageSize: PAGINATION.pageSize
            }
           };
          yield call(viewUsersSaga, { data: getData });
  
        } catch (error) {
          // dispatch a failure action to the store with the error
          yield put({ type: `${actionType}_FAILURE`, error });
        }
      }
}

  