import { call, put } from 'redux-saga/effects';
import { postData } from '../../../utils/http';
import apiEndPoints from '../../../api/inventoryManagement';
import * as action from '../../../actions/inventoryManagement';
import getWarehouseListSaga from './getWarehouseListSaga';

export default function*  postDeleteWarehouseSaga(payload) {
  const actionType = action.POST_DELETE_WAREHOUSE;
  const url = apiEndPoints[actionType];

    try {
      const result = yield call(postData, { 'method': 'post', url, data: payload.data });
      // dispatch a success action to the store with the new result
      yield put({ type: `${actionType}_SUCCESS`, result });

      const getData = {
        authToken: payload.data.authToken,
        pageNumber: 0,
        pageSize:payload.data.pageSize
       };
      yield call(getWarehouseListSaga, { data: getData });

    } catch (error) {
      // dispatch a failure action to the store with the error
      yield put({ type: `${actionType}_FAILURE`, error });
    }
}

  
