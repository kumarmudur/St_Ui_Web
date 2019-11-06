import { call, put } from 'redux-saga/effects';
import fetchData from '../../../utils/http';
import apiEndPoints from '../../../api/inventoryManagement';
import * as action from '../../../actions/inventoryManagement';
import getModuleMappingDataSaga from './getModuleMappingDataSaga';

export default function* getProductDataSaga(payload) {
    const actionType = action.GET_PRODUCT_DATA;
    const url = apiEndPoints[actionType];

    try {
        const result = yield call(fetchData, { 'method': 'get', url, data: payload.data });

        yield put({ type: `${actionType}_SUCCESS`, result });

        
        if(result && result.product  && result.product.productAssemblyModule.productId) {
            yield call(getModuleMappingDataSaga, { data: 
                { id:  result.product.productAssemblyModule.productId,
                authToken:  payload.data && payload.data.authToken } 
            });
        }

        // dispatch a success action to the store with the new result
    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: `${actionType}_FAILURE`, error });
    }
}