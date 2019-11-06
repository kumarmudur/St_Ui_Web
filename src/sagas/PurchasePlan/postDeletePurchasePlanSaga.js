import { call, put } from 'redux-saga/effects';
import { postData } from '../../utils/http';
import apiEndPoints from '../../api/purchasePlan';
import * as action from '../../actions/purchasePlan';
import getPurchasePlanListSaga from './getPurchasePlanListSaga';

export default function*  postDeleteProductSaga(payload) {
  const actionType = action.POST_DELETE_PURCHASE_PLAN;
  const url = apiEndPoints[actionType];

    try {
      const result = yield call(postData, { 'method': 'post', url, data: payload.data });
      // dispatch a success action to the store with the new result
      yield put({ type: `${actionType}_SUCCESS`, result });

      const getData = {
        authToken: payload.data.authToken,
        pageNumber: 0,
        pageSize: payload.data.data.pageSize
       };
      yield call(getPurchasePlanListSaga, { data: getData });

    } catch (error) {
      // dispatch a failure action to the store with the error
      yield put({ type: `${actionType}_FAILURE`, error });
    }
}

  
