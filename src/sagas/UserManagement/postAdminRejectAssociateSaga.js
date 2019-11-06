import { call, put } from 'redux-saga/effects';
import { postData } from '../../utils/http';
import INTERNALAPI from '../../api';
import * as action from '../../actions';
import setAlertStatusSaga from './setAlertStatusSaga';

export default function* postAdminRejectAssociateSaga(payload) {
    const actionType = action.POST_ADMIN_REJECT_ASSOCIATE;
    const url = INTERNALAPI[actionType] || null;
  
    if(url) {
        try {
          const result = yield call(postData, { url, data: payload.data });
          // dispatch a success action to the store with the new result
          yield put({ type:  `${actionType}_SUCCESS`, result });

          yield call(setAlertStatusSaga, { data: { 'visible': true } });
  
        } catch (error) {
          // dispatch a failure action to the store with the error
          yield put({ type: `${actionType}_FAILURE`, error });
        }
      }
}

  