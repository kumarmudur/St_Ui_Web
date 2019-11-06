
const API_HOST_BASE = 'https://solartopps.us';
const API_HOST = `${API_HOST_BASE}/api/inventory/v1`;

const POST = {
    PRODUCTS: {
      SEARCH_PRODUCTS: `${API_HOST}/search/products`,
      FILTER_PRODUCTS: `${API_HOST}/products/filter`,
      ADD_PRODUCT: `${API_HOST}/products`,
      IMAGE_UPLOAD: `${API_HOST}/upload`, 
      SUBMIT_MAPPING: `${API_HOST}/products/mapping`
    },
    WAREHOUSE: {
      ADD_WAREHOUSE: `${API_HOST}/warehouses`,
      SEARCH_WAREHOUSE: `${API_HOST}/search/warehouses`,
      FILTER_WAREHOUSE: `${API_HOST}/warehouses/filter`,
    },
    SUPPLIER: {
      SEARCH_SUPPLIER: `${API_HOST}/search/suppliers`,
      FILTER_SUPPLIER: `${API_HOST}/suppliers/filter`,
      ADD_SUPPLIER: `${API_HOST}/suppliers`
    },
    PURCHASE_ORDER: {
      SEARCH_PURCHASE_ORDER: `${API_HOST}/search/purchaseOrders`,
      FILTER_PURCHASE_ORDER: `${API_HOST}/purchaseOrders/filter`
    },
    CONFIGURATION_FIELDS: {
      ADD_CONFIGURATION_FIELDS: `${API_HOST}/configurations`,
      SEARCH_CONFIG_FIELDS: `${API_HOST}/search/configurations`
    },

    EXPORT: `${API_HOST}/export`,
};

const GET = {
    PRODUCTS: {
      STATIC_DATA_MANAGE_PRODUCTS: `${API_HOST}/staticData/productList`,
      STATIC_DATA_PRODUCT: `${API_HOST}/staticData/product`,
      PRODUCT_LIST: `${API_HOST}/products`,
      MODULE_LIST: `${API_HOST}/products/modulesList`,
      MODULE_MAPPING_DATA: `${API_HOST}/products/mapping/module`,
      PRODUCT_PARTS: `${API_HOST}/products/parts`,
      INVERTER_LIST: `${API_HOST}/products/inverters`,
      OPTIMIZER_LIST: `${API_HOST}/products/optimizers`,
      PRODUCT_PART_LIST: `${API_HOST}/products/others`,
      MODULE_MAPPING: `${API_HOST}/products/mapping`
    },
    WAREHOUSE: {
      WAREHOUSE_LIST :`${API_HOST}/warehouses`,
    },
    SUPPLIER: {
      SUPPLIER_LIST: `${API_HOST}/suppliers`  
    },
    PURCHASE_ORDER: {
       PURCHASE_ORDER_LIST: `${API_HOST}/purchaseOrders`,
       STATIC_DATA_PURCHASE_ORDER: `${API_HOST}/staticData/purchase`,
       PO_SUPPLIER_LIST: `${API_HOST}/suppliers/list `
    }
};

module.exports = { GET, POST };