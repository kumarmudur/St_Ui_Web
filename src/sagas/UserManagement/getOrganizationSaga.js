import { call, put } from 'redux-saga/effects';
import fetchData from '../../utils/http';
import apiEndPoints from '../../api';
import * as action from '../../actions';
import getStatesSaga from './statesSaga';
import getCitySaga from './citySaga';

export default function* getOrganizationSaga(payload) {
  const actionType = action.GET_ORGANIZATION;
  const url = apiEndPoints[actionType];
    try {
      const result = yield call(fetchData, { 'method': 'get', url, data: payload.data });

      // dispatch a success action to the store with the new result
      yield put({ type: `${actionType}_SUCCESS`, result });

      if(result && result.offices) {
        const { country, state } = result.offices;
        yield call(getStatesSaga, { data: { 'countryName': country } });

        yield call(getCitySaga, { data: { 'countryName': country, stateName: state } });
      }
      


    } catch (error) {
      // dispatch a failure action to the store with the error
      yield put({ type: `${actionType}_FAILURE`, error });
    }
}

  
