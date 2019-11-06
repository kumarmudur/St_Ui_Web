import { call, put } from 'redux-saga/effects';
import { postData } from '../../utils/http';
import INTERNALAPI from '../../api';
import * as action from '../../actions/inventoryManagement';

export default function* postAddUserSaga(payload) {
    const actionType = action.POST_EXPORT_INVENTORY;
    const url = INTERNALAPI[actionType] || null;
  
    if(url) {
        try {
          const result = yield call(postData, { url, data: payload.data });
          // dispatch a success action to the store with the new result
          console.log('result : ', result);
          yield put({ type:  `${actionType}_SUCCESS`, result });
  
        } catch (error) {
          // dispatch a failure action to the store with the error
          yield put({ type: `${actionType}_FAILURE`, error });
        }
      }
}

  