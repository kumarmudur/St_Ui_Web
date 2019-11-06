import { takeLatest } from 'redux-saga/effects';
import * as action from '../../actions';

// GET CALLS
import setAlertStatusSaga from './setAlertStatusSaga';
//import getCountrySaga from './getCountrySaga'; // to do change common apis
//import getStatesSaga from './getStatesSaga';

// watcher saga: watches for actions dispatched to the store, starts worker saga
function* watcherSaga() {
    //GET CALLS
    yield takeLatest(action.SET_ALERT_STATUS, setAlertStatusSaga);
   // yield takeLatest(action.GET_COUNTRY, getCountrySaga);
    //yield takeLatest(action.GET_STATES, getStatesSaga);
}

const CommonSagas = [ watcherSaga() ];
export default CommonSagas;