import { takeLatest } from 'redux-saga/effects';
import * as action from '../../actions/purchasePlan';

// GET CALLS
import getPurchasePlanListSaga from './getPurchasePlanListSaga';
import getStaticDataPurchasePlanSaga from './getStaticDataPurchasePlanSaga';
import getPurchasePlanDataSaga from './getPurchasePlanDataSaga';
import getStaticDataConfigSaga from './getStaticDataConfigSaga';

// POST CALLS
import postDeleteProductSaga from './postDeletePurchasePlanSaga';
import postFilterPurchasePlanSaga from './postFilterPurchasePlan';
import postSearchPurchasePlanSaga from './postSearchPurchasePlanSaga';
import postAddPurchasePlanSaga from './postAddPurchasePlanSaga';
import postEditPurchasePlanSaga from './postEditPurchasePlanSaga';

// watcher saga: watches for actions dispatched to the store, starts worker saga
function* watcherSaga() {
    // GET CALLS
    yield takeLatest(action.GET_PURCHASE_PLAN_LIST, getPurchasePlanListSaga);
    yield takeLatest(action.GET_STATIC_DATA_PURCHASE_PLAN, getStaticDataPurchasePlanSaga);
    yield takeLatest(action.GET_PURCHASE_PLAN_DATA, getPurchasePlanDataSaga);
    yield takeLatest(action.GET_STATIC_DATA_CONFIG, getStaticDataConfigSaga);
    
    // POST CALLS
    yield takeLatest(action.POST_DELETE_PURCHASE_PLAN, postDeleteProductSaga);
    yield takeLatest(action.POST_FILTER_PURCHASE_PLAN,  postFilterPurchasePlanSaga);
    yield takeLatest(action.POST_SEARCH_PURCHASE_PLAN, postSearchPurchasePlanSaga);
    yield takeLatest(action.POST_ADD_PURCHASE_PLAN, postAddPurchasePlanSaga);
    yield takeLatest(action.POST_EDIT_PURCHASE_PLAN, postEditPurchasePlanSaga);
}

const PurchasePlanSagas = [ watcherSaga() ];
export default PurchasePlanSagas;
