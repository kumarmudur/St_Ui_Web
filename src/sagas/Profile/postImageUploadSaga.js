import { call, put } from 'redux-saga/effects';
import { postDataWithImage } from '../../utils/http';
import INTERNALAPI from '../../api/profile';
import * as action from '../../actions/profile';

export default function* postImageUploadSaga(payload) {
    const actionType = action.POST_PROFILE_IMAGE_UPLOAD;
    const url = INTERNALAPI[actionType] || null;
  
    if(url) {
        try {
          const { file, authToken, registerId } = payload;
          const result = yield call(postDataWithImage, { 'method': 'post', url, file: file, authToken, registerId });
          // dispatch a success action to the store with the new result
          yield put({ type:  `${actionType}_SUCCESS`, result });
  
        } catch (error) {
          // dispatch a failure action to the store with the error
          yield put({ type: `${actionType}_FAILURE`, error });
        }
      }
}

  