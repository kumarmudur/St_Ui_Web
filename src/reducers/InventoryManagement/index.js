//GET CALLS
import getStaticDataManageProducts from './Product/getStaticDataManageProducts';
import getProductList from './Product/getProductList';
import getStaticDataProduct from './Product/getStaticDataProduct';
import getProductData from './Product/getProductData';
import getModuleList from './Product/getModuleList';
import getModuleMappingData from './Product/getModuleMappingData';
import getProductParts from './Product/getProductParts';
import getProductModuleMapping from './Product/getProductModuleMapping';
import getInverterList from './Product/getInverterList';
import getOptimizerList from './Product/getOptimizerList';
import getProductPartList from './Product/getProductPartList';

import getWarehouseList from './Warehouse/getWarehouseList';
import getWarehouseData from './Warehouse/getWarehouseData';
import getViewWarehouse from './Warehouse/getViewWarehouse';

import getSupplierList from './Supplier/getSupplierList';
import getSupplierData from './Supplier/getSupplierData';
import getViewSupplier from './Supplier/getViewSupplier';

import getPurchaseOrderList from './PurchaseOrder/getPurchaseOrderList';
import getPoSupplierList from './PurchaseOrder/getPoSupplierList';
import getStaticPurchaseOrder from './PurchaseOrder/getStaticPurchaseOrder';

import getOtherPriceConfigFields from './ConfigurationFields/getOtherPriceConfigFields';
import getConfigFieldsList from './ConfigurationFields/getConfigFieldsList';

import setAlertStatus from './setAlertStatus';

//POST CALLS
import postSearchProducts from './Product/postSearchProducts';
import postFilterProducts from './Product/postFilterProducts';
import postAddProduct from './Product/postAddProduct';
import postDeleteProduct from './Product/postDeleteProduct';
import postProductImageUpload from './Product/postProductImageUpload';
import postEditProduct from './Product/postEditProduct';
import postSubmitMapping from './Product/postSubmitMapping';

import postSearchWarehouse from './Warehouse/postSearchWarehouse';
import postFilterWarehouse from './Warehouse/postFilterWarehouse';
import postDeleteWarehouse from './Warehouse/postDeleteWarehouse';
import postAddWarehouse from './Warehouse/postAddWarehouse';
import postEditWarehouse from './Warehouse/postEditWarehouse';

import postSearchSupplier from './Supplier/postSearchSupplier';
import postFilterSupplier from './Supplier/postFilterSupplier';
import postDeleteSupplier from './Supplier/postDeleteSupplier';
import postAddSupplier from './Supplier/postAddSupplier';
import postEditSupplier from './Supplier/postEditSupplier';

import postSearchPurchaseOrder from './PurchaseOrder/postSearchPurchaseOrder';
import postFilterPurchaseOrder from './PurchaseOrder/postFilterPurchaseOrder';
import postDeletePurchaseOrder from './PurchaseOrder/postDeletePurchaseOrder';
import postCreatePurchaseOrder from './PurchaseOrder/postCreatePurchaseOrder';

import postAddConfigurationFields from './ConfigurationFields/postAddConfigurationFields';
import postEditConfigFields from './ConfigurationFields/postEditConfigFields';
import postDeleteConfigFields from './ConfigurationFields/postDeleteConfigFields';
import postSearchConfigFields from './ConfigurationFields/postSearchConfigFields';
import getExportInventory from './getExportInventory';

const InventoryManagement = {
    //GET CALLS
    ExportInventory: getExportInventory,
    GetStaticDataManageProducts: getStaticDataManageProducts,
    GetProductList: getProductList,
    GetStaticDataProduct: getStaticDataProduct,
    GetProductData: getProductData,
    GetModuleList: getModuleList,
    GetModuleMappingData: getModuleMappingData,
    GetProductParts: getProductParts,
    GetProductModuleMapping: getProductModuleMapping,
    GetInverterList: getInverterList,
    GetOptimizerList: getOptimizerList,
    GetProductPartList: getProductPartList,

    GetWarehouseList: getWarehouseList,
    GetWarehouseData: getWarehouseData,
    GetViewWarehouse: getViewWarehouse,
    
    GetSupplierList: getSupplierList,
    GetSupplierData: getSupplierData,
    GetViewSupplier: getViewSupplier,

    GetPurchaseOrderList: getPurchaseOrderList,
    GetStaticPurchaseOrder: getStaticPurchaseOrder,
    GetPoSupplierList: getPoSupplierList,

    GetOtherPriceConfigFields: getOtherPriceConfigFields,
    GetConfigFieldsList: getConfigFieldsList,

    AlertStatus: setAlertStatus,

    //POST CALLS
    PostSearchProducts: postSearchProducts,
    PostFilterProducts: postFilterProducts,
    PostAddProduct: postAddProduct,
    PostDeleteProduct: postDeleteProduct,
    PostProductImageUpload: postProductImageUpload,
    PostEditProduct: postEditProduct,
    PostSubmitMapping: postSubmitMapping,

    PostSearchWarehouse: postSearchWarehouse,
    PostFilterWarehouse: postFilterWarehouse,
    PostDeleteWarehouse: postDeleteWarehouse,
    PostAddWarehouse: postAddWarehouse,
    PostEditWarehouse: postEditWarehouse,

    PostSearchSupplier: postSearchSupplier,
    PostFilterSupplier: postFilterSupplier,
    PostDeleteSupplier: postDeleteSupplier,
    PostAddSupplier: postAddSupplier,
    PostEditSupplier: postEditSupplier,

    PostSearchPurchaseOrder: postSearchPurchaseOrder,
    PostFilterPurchaseOrder: postFilterPurchaseOrder,
    PostDeletePurchaseOrder: postDeletePurchaseOrder,
    PostCreatePurchaseOrder: postCreatePurchaseOrder,

    PostAddConfigurationFields: postAddConfigurationFields,
    PostEditConfigFields: postEditConfigFields,
    PostDeleteConfigFields: postDeleteConfigFields,
    PostSearchConfigFields: postSearchConfigFields
};

export default InventoryManagement;