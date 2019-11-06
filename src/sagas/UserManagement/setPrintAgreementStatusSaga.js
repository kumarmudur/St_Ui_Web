import {  put } from 'redux-saga/effects';
import * as action from '../../actions';

export default function* setPrintAgreementStatusSaga(payload) {
    const actionType = action.SET_PRINT_AGREEMENT_STATUS;
      try {
        //const result = yield call(postData, { url, data: payload.data });
        // dispatch a success action to the store with the new result
        yield put({ type:  `${actionType}_SUCCESS`, result: payload.data });

      } catch (error) {
        // dispatch a failure action to the store with the error
       yield put({ type: `${actionType}_FAILURE`, error });
      }
}

  