import { takeLatest } from 'redux-saga/effects';
import * as action from '../../actions/inventoryManagement';

//GET CALLS
import getStaticDataProductSaga from './Product/getStaticDataProductSaga';
import getProductListSaga from './Product/getProductListSaga';
import getStaticDataManageProductSaga from './Product/getStaticDataManageProductSaga';
import getProductDataSaga from './Product/getProductDataSaga';
import getModuleListSaga from './Product/getModuleListSaga';
import getModuleMappingDataSaga from './Product/getModuleMappingDataSaga';
import getProductPartSaga from './Product/getProductPartSaga';
import getInverterListSaga from './Product/getInverterListSaga';
import getOptimizerListSaga from './Product/getOptimizerListSaga';
import getProductModuleMappingSaga from './Product/getProductModuleMappingSaga';
import getProductPartListSaga from './Product/getProductPartListSaga';

import getWarehouseListSaga from './Warehouse/getWarehouseListSaga';
import getWarehouseDataSaga from './Warehouse/getWarehouseDataSaga';
import getViewWarehouseSaga from './Warehouse/getViewWarehouseSaga';

import getSupplierListSaga from './Supplier/getSupplierListSaga';
import getSupplierDataSaga from './Supplier/getSupplierDataSaga';
import getViewSupplierSaga from './Supplier/getViewSupplierSaga';

import getPurchaseOrderListSaga from './PurchaseOrder/getPurchaseOrderListSaga';
import getStaticPurchaseOrderSaga from './PurchaseOrder/getStaticPurchaseOrderSaga';
import getPoSupplierListSaga from './PurchaseOrder/getPoSupplierListSaga';

import getOtherPriceConfigFieldsSaga from './ConfigurationFields/getOtherPriceConfigFieldsSaga';
import getConfigFieldsListSaga from './ConfigurationFields/getConfigFieldsListSaga';

import setAlertStatusSaga from './setAlertStatusSaga';

//POST CALLS
import postSearchProductsSaga from './Product/postSearchProductsSaga';
import postFilterProductsSaga from './Product/postFilterProductsSaga';
import postAddProductSaga from './Product/postAddProductSaga';
import postDeleteProductSaga from './Product/postDeleteProductSaga';
import postProductImageUploadSaga from './Product/postProductImageUploadSaga';
import postEditProductSaga from './Product/postEditProductSaga';
import postSubmitMappingSaga from './Product/postSubmitMappingSaga';

import postSearchWarehouseSaga from './Warehouse/postSearchWarehouseSaga';
import postFilterWarehouseSaga from './Warehouse/postFilterWarehouseSaga';
import postDeleteWarehouseSaga from './Warehouse/postDeleteWarehouseSaga';
import postAddWarehouseSaga from './Warehouse/postAddWarehouseSaga';
import postEditWarehouseSaga from './Warehouse/postEditWarehouseSaga';

import postSearchSupplierSaga from './Supplier/postSearchSupplierSaga';
import postFilterSupplierSaga from './Supplier/postFilterSupplierSaga';
import postDeleteSupplierSaga from './Supplier/postDeleteSupplierSaga';
import postAddSupplierSaga from './Supplier/postAddSupplierSaga';
import postEditSupplierSaga from './Supplier/postEditSupplierSaga';

import postSearchPurchaseOrderSaga from './PurchaseOrder/postSearchPurchaseOrderSaga';
import postFilterPurchaseOrderSaga from './PurchaseOrder/postFilterPurchaseOrderSaga';
import postDeletePurchaseOrderSaga from './PurchaseOrder/postDeletePurchaseOrderSaga';
import postCreatePurchaseOrderSaga from './PurchaseOrder/postCreatePurchaseOrderSaga';

import postAddConfigurationFieldsSaga from './ConfigurationFields/postAddConfigurationFieldsSaga';
import postEditConfigFieldsSaga from './ConfigurationFields/postEditConfigFieldsSaga';
import postSearchConfigFieldsSaga from './ConfigurationFields/postSearchConfigFieldsSaga';
import postDeleteConfigFieldsSaga from './ConfigurationFields/postDeleteConfigFieldsSaga';
import postExportInventorySaga from './postExportInventorySaga';
// watcher saga: watches for actions dispatched to the store, starts worker saga
function* watcherSaga() {
    //GET CALLS

    yield takeLatest(action.POST_EXPORT_INVENTORY, postExportInventorySaga);
    yield takeLatest(action.GET_STATIC_DATA_MANAGE_PRODUCT, getStaticDataManageProductSaga);
    yield takeLatest(action.GET_PRODUCT_LIST, getProductListSaga);
    yield takeLatest(action.GET_STATIC_DATA_PRODUCT, getStaticDataProductSaga);
    yield takeLatest(action.GET_PRODUCT_DATA, getProductDataSaga);
    yield takeLatest(action.GET_MODULE_LIST, getModuleListSaga);
    yield takeLatest(action.GET_MODULE_MAPPING_DATA, getModuleMappingDataSaga);
    yield takeLatest(action.GET_PRODUCT_PARTS, getProductPartSaga);
    yield takeLatest(action.GET_INVERTER_LIST, getInverterListSaga);
    yield takeLatest(action.GET_OPTIMIZER_LIST, getOptimizerListSaga);
    yield takeLatest(action.GET_PRODUCT_MODULE_MAPPING, getProductModuleMappingSaga);
    yield takeLatest(action.GET_PRODUCT_PART_LIST, getProductPartListSaga);

    yield takeLatest(action.GET_WAREHOUSE_LIST, getWarehouseListSaga);
    yield takeLatest(action.GET_WAREHOUSE_DATA, getWarehouseDataSaga);
    yield takeLatest(action.GET_VIEW_WAREHOUSE_DATA, getViewWarehouseSaga);

    yield takeLatest(action.GET_SUPPLIER_LIST, getSupplierListSaga);
    yield takeLatest(action.GET_SUPPLIER_DATA, getSupplierDataSaga);
    yield takeLatest(action.GET_VIEW_SUPPLIER_DATA, getViewSupplierSaga);

    yield takeLatest(action.GET_PURCHASE_ORDER_LIST, getPurchaseOrderListSaga);

    yield takeLatest(action.GET_OTHER_PRICE_CONFIG_FIELDS, getOtherPriceConfigFieldsSaga);
    yield takeLatest(action.GET_STATIC_DATA_PURCHASE_ORDER, getStaticPurchaseOrderSaga);
    yield takeLatest(action.GET_PO_SUPPLIER_LIST, getPoSupplierListSaga);

    yield takeLatest(action.GET_CONFIG_FIELDS_LIST, getConfigFieldsListSaga);

    yield takeLatest(action.SET_ALERT_STATUS, setAlertStatusSaga);


    //POST CALLS
    yield takeLatest(action.POST_SEARCH_PRODUCTS, postSearchProductsSaga);
    yield takeLatest(action.POST_FILTER_PRODUCTS, postFilterProductsSaga);
    yield takeLatest(action.POST_ADD_PRODUCT, postAddProductSaga);
    yield takeLatest(action.POST_DELETE_PRODUCT, postDeleteProductSaga);
    yield takeLatest(action.POST_PRODUCT_IMAGE_UPLOAD, postProductImageUploadSaga);
    yield takeLatest(action.POST_EDIT_PRODUCT, postEditProductSaga);
    yield takeLatest(action.POST_SUBMIT_MAPPING, postSubmitMappingSaga);

    yield takeLatest(action.POST_SEARCH_WAREHOUSE, postSearchWarehouseSaga);
    yield takeLatest(action.POST_FILTER_WAREHOUSE, postFilterWarehouseSaga);
    yield takeLatest(action.POST_DELETE_WAREHOUSE,  postDeleteWarehouseSaga);
    yield takeLatest(action.POST_ADD_WAREHOUSE, postAddWarehouseSaga);
    yield takeLatest(action.POST_EDIT_WAREHOUSE, postEditWarehouseSaga);

    yield takeLatest(action.POST_SEARCH_SUPPLIER, postSearchSupplierSaga);
    yield takeLatest(action.POST_FILTER_SUPPLIER, postFilterSupplierSaga);
    yield takeLatest(action.POST_DELETE_SUPPLIER, postDeleteSupplierSaga);
    yield takeLatest(action.POST_ADD_SUPPLIER, postAddSupplierSaga);
    yield takeLatest(action.POST_EDIT_SUPPLIER, postEditSupplierSaga);

    yield takeLatest(action.POST_SEARCH_PURCHASE_ORDER, postSearchPurchaseOrderSaga);
    yield takeLatest(action.POST_FILTER_PURCHASE_ORDER, postFilterPurchaseOrderSaga);
    yield takeLatest(action.POST_DELETE_PURCHASE_ORDER, postDeletePurchaseOrderSaga);
    yield takeLatest(action.POST_CREATE_PURCHASE_ORDER, postCreatePurchaseOrderSaga);

    yield takeLatest(action.POST_ADD_CONFIGURATION_FIELDS, postAddConfigurationFieldsSaga);
    yield takeLatest(action.POST_EDIT_CONFIG_FIELDS, postEditConfigFieldsSaga);
    yield takeLatest(action.POST_SEARCH_CONFIG_FIELDS, postSearchConfigFieldsSaga);
    yield takeLatest(action.POST_DELETE_CONFIG_FIELDS, postDeleteConfigFieldsSaga);
}

const InventoryManagementSagas = [ watcherSaga() ];
export default InventoryManagementSagas;
