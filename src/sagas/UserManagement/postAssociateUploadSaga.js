import { call, put } from 'redux-saga/effects';
import { postDataWithMultipleFiles } from '../../utils/http';
import INTERNALAPI from '../../api';
import * as action from '../../actions';
import setAlertStatusSaga from '../UserManagement/setAlertStatusSaga';

export default function* postAssociateUploadSaga(payload) {
    const actionType = action.POST_ASSOCIATE_DOCUMENT_UPLOAD;
    const url = INTERNALAPI[actionType] || null;
  
    if(url) {
        try {
          const { files, authToken, registerId } = payload;
          const result = yield call(postDataWithMultipleFiles, { 'method': 'post', url, file: files, authToken, registerId });
          // dispatch a success action to the store with the new result
          yield put({ type:  `${actionType}_SUCCESS`, result });

          yield call(setAlertStatusSaga, { data: { 'visible': true } });
  
        } catch (error) {
          // dispatch a failure action to the store with the error
          yield put({ type: `${actionType}_FAILURE`, error });
        }
      }
}
   