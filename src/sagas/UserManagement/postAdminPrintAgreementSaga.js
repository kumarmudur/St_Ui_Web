import { call, put } from 'redux-saga/effects';
import { postData } from '../../utils/http';
import INTERNALAPI from '../../api';
import * as action from '../../actions';
import setPrintAgreementStatusSaga from './setPrintAgreementStatusSaga';

export default function* postAdminPrintAgreementSaga(payload) {
    const actionType = action.POST_ADMIN_PRINT_AGREEMENT;
    const url = INTERNALAPI[actionType] || null;
  
    if(url) {
        try {
          const result = yield call(postData, { url, data: payload.data });
          // dispatch a success action to the store with the new result
          yield put({ type:  `${actionType}_SUCCESS`, result });

          yield call(setPrintAgreementStatusSaga, { data: { 'downloadFile': true } });

        } catch (error) {
          // dispatch a failure action to the store with the error
          yield put({ type: `${actionType}_FAILURE`, error });
        }
      }
}

  