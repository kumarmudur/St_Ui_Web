import { call, put } from 'redux-saga/effects';
import { postData } from '../../../utils/http';
import apiEndPoints from '../../../api/inventoryManagement';
import * as action from '../../../actions/inventoryManagement';
import { PAGE_SIZE_DEFAULT } from '../../../constants';
import getConfigFieldsListSaga from './getConfigFieldsListSaga';

export default function*  postEditConfigFieldsSaga(payload) {
  const actionType = action.POST_EDIT_CONFIG_FIELDS;
  const url = apiEndPoints[actionType];

    try {
      const result = yield call(postData, { 'method': 'post', url, data: payload.data });
      // dispatch a success action to the store with the new result
      yield put({ type: `${actionType}_SUCCESS`, result });

      const getData = {
        authToken: payload.data.authToken,
        data: {
          pageNumber: 0,
          pageSize: PAGE_SIZE_DEFAULT
        }
       };
      yield call(getConfigFieldsListSaga, { data: getData });
      
    } catch (error) {
      // dispatch a failure action to the store with the error
      yield put({ type: `${actionType}_FAILURE`, error });
    }
  }

  
