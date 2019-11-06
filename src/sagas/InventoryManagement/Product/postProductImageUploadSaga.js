import { call, put } from 'redux-saga/effects';
import { postDataWithProductImageFile } from '../../../utils/http';
import api from '../../../api/inventoryManagement';
import * as action from '../../../actions/inventoryManagement';

export default function* postProductImageUploadSaga(payload) {
  const actionType = action.POST_PRODUCT_IMAGE_UPLOAD;
  const url = api[actionType];
    try {
      const result = yield call(postDataWithProductImageFile, { 'method': 'post', url, data: payload.data });
      
      // dispatch a success action to the store with the new result
      yield put({ type: `${actionType}_SUCCESS`, result });
      
    } catch (error) {
      // dispatch a failure action to the store with the error
      yield put({ type: `${actionType}_FAILURE`, error });
    }
}

  