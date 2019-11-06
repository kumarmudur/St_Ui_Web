import { call, put } from 'redux-saga/effects';
import { postData } from '../../utils/http';
import apiEndPoints from '../../api/purchasePlan';
import * as action from '../../actions/purchasePlan';

export default function*  postSearchPurchasePlanSaga(payload) {
  const actionType = action.POST_SEARCH_PURCHASE_PLAN;
  const url = apiEndPoints[actionType];

    try {
      const result = yield call(postData, { 'method': 'post', url, data: payload.data });
      // dispatch a success action to the store with the new result
      yield put({ type: `${actionType}_SUCCESS`, result });
    } catch (error) {
      // dispatch a failure action to the store with the error
      yield put({ type: `${actionType}_FAILURE`, error });
    }
  }

  
