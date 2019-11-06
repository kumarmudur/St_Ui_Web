import { call, put } from 'redux-saga/effects';
import fetchData from '../../utils/http';

export default function* userLoginSaga() {
    try {
      const result = yield call(fetchData, { method: 'get', url: 'https://jsonplaceholder.typicode.com/posts'});
      // dispatch a success action to the store with the new result
      yield put({ type: 'GET_DATA_SUCCESS', result });
    } catch (error) {
      // dispatch a failure action to the store with the error
      yield put({ type: 'GET_DATA_FAILURE', error });
    }
  }