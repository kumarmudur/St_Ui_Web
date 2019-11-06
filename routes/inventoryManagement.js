const API = require('../external-api/inventoryManagement');
const cors = require('cors');
const apiCaller = require('../utils/apiCaller');
const { apiPostCaller, apiGetCaller, apiDeleteCaller, apiPutCaller } = apiCaller;

const inventoryManagement = {
  //GET METHODS
  staticDataManageProducts: (cors(), async (req, res) => {
    let { authToken } = req.query;
    const url = `${API.GET.PRODUCTS.STATIC_DATA_MANAGE_PRODUCTS}`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),

  staticDataProduct: (cors(), async (req, res) => {
    let { authToken } = req.query;
    const url = `${API.GET.PRODUCTS.STATIC_DATA_PRODUCT}`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),
  
  productList: (cors(), async (req, res) => {
    let { pageNumber, pageSize, authToken, order, sortBy } = req.query;
    pageNumber = parseInt(pageNumber);
    pageSize = pageSize ? parseInt(pageSize) : 10;
    pageNumber = pageNumber>0 ? pageNumber-=1 : 0;

    let url = `${API.GET.PRODUCTS.PRODUCT_LIST}?page=${pageNumber}&size=${pageSize}`;
    if(sortBy && order) {
      url = `${API.GET.PRODUCTS.PRODUCT_LIST}?page=${pageNumber}&size=${pageSize}&order=${ order }&sortBy=${ sortBy }`;
    }
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),

  moduleList: (cors(), async (req, res) => {
    let { authToken } = req.query;
    const url = `${API.GET.PRODUCTS.MODULE_LIST}`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),

  moduleMappingData: (cors(), async (req, res) => {
    let { authToken, id } = req.query;
    const url = `${API.GET.PRODUCTS.MODULE_MAPPING_DATA}/${id}`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),

  viewModuleMapping: (cors(), async (req, res) => {
    let { authToken, id } = req.query;
    const url = `${API.GET.PRODUCTS.MODULE_MAPPING}/${id}`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),


  productParts: (cors(), async (req, res) => {
    let { authToken } = req.query;
    const url = `${API.GET.PRODUCTS.PRODUCT_PART_LIST}`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),

  inverterList: (cors(), async (req, res) => {
    let { authToken } = req.query;
    const url = `${API.GET.PRODUCTS.INVERTER_LIST}`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),

  optimizerList: (cors(), async (req, res) => {
    let { authToken } = req.query;
    const url = `${API.GET.PRODUCTS.OPTIMIZER_LIST}`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),

  productPartList: (cors(), async (req, res) => {
    let { authToken } = req.query;
    const url = `${API.GET.PRODUCTS.PRODUCT_PART_LIST}`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),

  warehouseList: (cors(), async (req, res) => {
    let { pageNumber, pageSize, authToken, allWarehouse, order, sortBy } = req.query;
    let url = '';
    if(allWarehouse === 'true') {
       url = `${API.GET.WAREHOUSE.WAREHOUSE_LIST}`;
    } else {
      pageNumber = parseInt(pageNumber);
      pageSize = pageSize ? parseInt(pageSize) : 10;
      pageNumber = pageNumber>0 ? pageNumber-=1 : 0;

      if(sortBy && order) {
        url = `${API.GET.WAREHOUSE.WAREHOUSE_LIST}?page=${pageNumber}&size=${pageSize}&order=${ order }&sortBy=${ sortBy }`;
      } else {
        url = `${API.GET.WAREHOUSE.WAREHOUSE_LIST}?page=${pageNumber}&size=${pageSize}`;
      }
    }
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),
  
  supplierList: (cors(), async (req, res) => {
    let { pageNumber, pageSize, authToken, order, sortBy } = req.query;
    pageNumber = parseInt(pageNumber);
    pageSize = pageSize ? parseInt(pageSize) : 10;
    pageNumber = pageNumber>0 ? pageNumber-=1 :0;
    
    let url = `${API.GET.SUPPLIER.SUPPLIER_LIST}?page=${pageNumber}&size=${pageSize}`;
    if(sortBy && order) {
      url = `${API.GET.SUPPLIER.SUPPLIER_LIST}?page=${pageNumber}&size=${pageSize}&order=${ order }&sortBy=${ sortBy }`;
    }
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),

  purchaseOrderList: (cors(), async (req, res) => {
    let { pageNumber, pageSize, authToken, order, sortBy } = req.query;
    pageNumber = parseInt(pageNumber);
    pageSize = pageSize ? parseInt(pageSize) : 10;
    pageNumber = pageNumber>0 ? pageNumber-=1 :0;
    
    let url = `${API.GET.PURCHASE_ORDER.PURCHASE_ORDER_LIST}?page=${pageNumber}&size=${pageSize}`;
    if(sortBy && order) {
      url = `${API.GET.PURCHASE_ORDER.PURCHASE_ORDER_LIST}?page=${pageNumber}&size=${pageSize}&order=${ order }&sortBy=${ sortBy }`;
    }
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),

  otherPriceConfigFields: (cors(), async (req, res) => {
    let { authToken, id } = req.query;
    const url = `${API.POST.CONFIGURATION_FIELDS.ADD_CONFIGURATION_FIELDS}/${id}`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),

  staticDataPurchaseOrder: (cors(), async (req, res) => {
    let { authToken } = req.query;
    const url = `${API.GET.PURCHASE_ORDER.STATIC_DATA_PURCHASE_ORDER}`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),

  poSupplierList: (cors(), async (req, res) => {
    let { authToken } = req.query;
    const url = `${API.GET.PURCHASE_ORDER.PO_SUPPLIER_LIST}`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),

  configFieldsList: (cors(), async (req, res) => {
    let { pageNumber, pageSize, authToken, order, sortBy } = req.query;
    pageNumber = parseInt(pageNumber);
    pageSize = pageSize ? parseInt(pageSize) : 10;
    pageNumber = pageNumber>0 ? pageNumber-=1 : 0;

    let url = `${API.POST.CONFIGURATION_FIELDS.ADD_CONFIGURATION_FIELDS}?page=${pageNumber}&size=${pageSize}`;
    if(sortBy && order) {
      url = `${API.POST.CONFIGURATION_FIELDS.ADD_CONFIGURATION_FIELDS}?page=${pageNumber}&size=${pageSize}&order=${ order }&sortBy=${ sortBy }`;
    }
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),
  
  //POST METHODS
  searchProducts: (cors(), async (req, res) => {
    let { pageNumber, pageSize, authToken, searchParams } = req.body;
    pageNumber = parseInt(pageNumber);
    pageSize = pageSize ? parseInt(pageSize) : 10;
    pageNumber = pageNumber>0 ? pageNumber-=1 :0;
    const url = `${API.POST.PRODUCTS.SEARCH_PRODUCTS}?page=${pageNumber}&size=${pageSize}`;
    const response = await apiPostCaller(url, searchParams, authToken);
    res.send(response);
  }),

  filterProducts: (cors(), async (req, res) => {
    let { pageNumber, pageSize, authToken, filterColumns } = req.body;
    pageNumber = parseInt(pageNumber);
    pageSize = pageSize ? parseInt(pageSize) : 10;
    pageNumber = pageNumber>0 ? pageNumber-=1 :0;
    const url = `${API.POST.PRODUCTS.FILTER_PRODUCTS}?page=${pageNumber}&size=${pageSize}`;
    const response = await apiPostCaller(url, filterColumns, authToken);
    res.send(response);
  }),

  addProduct : (cors(), async (req, res) => {
    const { authToken } = req.body;
    const payload = req.body;
    const response = await apiPostCaller(API.POST.PRODUCTS.ADD_PRODUCT, payload.data, authToken);
    res.send(response);
  }),

  editProduct : (cors(), async (req, res) => {
    const { authToken, id, data } = req.body;
    const payload = data;
    const url = `${API.GET.PRODUCTS.PRODUCT_LIST}/${id}`;
    const response = await apiPutCaller(url, payload, authToken);
    res.send(response);
  }),

  productData: (cors(), async (req, res) => {
    let {id, authToken } = req.query;
    const url = `${API.GET.PRODUCTS.PRODUCT_LIST}/${id}`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),

  deleteProduct : (cors(), async (req, res) => {
    const { authToken, data } = req.body;
    const payload = data;
    const response = await apiDeleteCaller(API.GET.PRODUCTS.PRODUCT_LIST, payload, authToken);
    res.send(response);
  }),

  submitMapping : (cors(), async (req, res) => {
    const { authToken } = req.body;
    const payload = req.body;
    const response = await apiPostCaller(API.POST.PRODUCTS.SUBMIT_MAPPING, payload.data, authToken);
    res.send(response);
  }),

  searchWarehouse: (cors(), async (req, res) => {
    let { pageNumber, pageSize, authToken, searchParams } = req.body;
    pageNumber = parseInt(pageNumber);
    pageSize = pageSize ? parseInt(pageSize) : 10;
    pageNumber = pageNumber>0 ? pageNumber-=1 :0;
    const url = `${API.POST.WAREHOUSE.SEARCH_WAREHOUSE}?page=${pageNumber}&size=${pageSize}`;
    const response = await apiPostCaller(url, searchParams, authToken);
    res.send(response);
  }),

  filterWarehouse: (cors(), async (req, res) => {
    let { pageNumber, pageSize, authToken, filterColumns } = req.body;
    pageNumber = parseInt(pageNumber);
    pageSize = pageSize ? parseInt(pageSize) : 10;
    pageNumber = pageNumber>0 ? pageNumber-=1 :0;
    const url = `${API.POST.WAREHOUSE.FILTER_WAREHOUSE}?page=${pageNumber}&size=${pageSize}`;
    const response = await apiPostCaller(url, filterColumns, authToken);
    res.send(response);
  }),

  deleteWarehouse : (cors(), async (req, res) => {
    const { authToken, data } = req.body;
    const payload = data;
    const response = await apiDeleteCaller(API.GET.WAREHOUSE.WAREHOUSE_LIST, payload, authToken);
    res.send(response);
  }),

  searchSupplier: (cors(), async (req, res) => {
    let { pageNumber, pageSize, authToken, searchParams } = req.body;
    pageNumber = parseInt(pageNumber);
    pageSize = pageSize ? parseInt(pageSize) : 10;
    pageNumber = pageNumber>0 ? pageNumber-=1 :0;
    const url = `${API.POST.SUPPLIER.SEARCH_SUPPLIER}?page=${pageNumber}&size=${pageSize}`;
    const response = await apiPostCaller(url, searchParams, authToken);
    res.send(response);
  }),

  addWarehouse : (cors(), async (req, res) => {
    const { authToken } = req.body;
    const payload = req.body;
    const response = await apiPostCaller(API.POST.WAREHOUSE.ADD_WAREHOUSE, payload.data, authToken);
    res.send(response);
  }),

  warehouseData: (cors(), async (req, res) => {
    let {id, authToken } = req.query;
    const url = `${API.GET.WAREHOUSE.WAREHOUSE_LIST}/${id}`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),

  editWarehouse : (cors(), async (req, res) => {
    const { authToken, id, data } = req.body;
    const payload = data;
    const url = `${API.GET.WAREHOUSE.WAREHOUSE_LIST}/${id}`;
    const response = await apiPutCaller(url, payload, authToken);
    res.send(response);
  }),

  filterSupplier: (cors(), async (req, res) => {
    let { pageNumber, pageSize, authToken, filterColumns } = req.body;
    pageNumber = parseInt(pageNumber);
    pageSize = pageSize ? parseInt(pageSize) : 10;
    pageNumber = pageNumber>0 ? pageNumber-=1 :0;
    const url = `${API.POST.SUPPLIER.FILTER_SUPPLIER}?page=${pageNumber}&size=${pageSize}`;
    const response = await apiPostCaller(url, filterColumns, authToken);
    res.send(response);
  }),

  deleteSupplier : (cors(), async (req, res) => {
    const { authToken, data } = req.body;
    const payload = data;
    const response = await apiDeleteCaller(API.GET.SUPPLIER.SUPPLIER_LIST, payload, authToken);
    res.send(response);
  }),

  addSupplier : (cors(), async (req, res) => {
    const { authToken } = req.body;
    const payload = req.body;
    const response = await apiPostCaller(API.POST.SUPPLIER.ADD_SUPPLIER, payload.data, authToken);
    res.send(response);
  }),

  editSupplier : (cors(), async (req, res) => {
    const { authToken, id, data } = req.body;
    const payload = data;
    const url = `${API.GET.SUPPLIER.SUPPLIER_LIST}/${id}`;
    const response = await apiPutCaller(url, payload, authToken);
    res.send(response);
  }),

  supplierData: (cors(), async (req, res) => {
    let {id, authToken } = req.query;
    const url = `${API.GET.SUPPLIER.SUPPLIER_LIST}/${id}`;
    const response = await apiGetCaller(url, authToken);
    res.send(response);
  }),

  searchPurchaseOrder: (cors(), async (req, res) => {
    let { pageNumber, pageSize, authToken, searchParams } = req.body;
    pageNumber = parseInt(pageNumber);
    pageSize = pageSize ? parseInt(pageSize) : 10;
    pageNumber = pageNumber>0 ? pageNumber-=1 :0;
    const url = `${API.POST.PURCHASE_ORDER.SEARCH_PURCHASE_ORDER}?page=${pageNumber}&size=${pageSize}`;
    const response = await apiPostCaller(url, searchParams, authToken);
    res.send(response);
  }),

  filterPurchaseOrder: (cors(), async (req, res) => {
    let { pageNumber, pageSize, authToken, filterColumns } = req.body;
    pageNumber = parseInt(pageNumber);
    pageSize = pageSize ? parseInt(pageSize) : 10;
    pageNumber = pageNumber>0 ? pageNumber-=1 :0;
    const url = `${API.POST.PURCHASE_ORDER.FILTER_PURCHASE_ORDER}?page=${pageNumber}&size=${pageSize}`;
    const response = await apiPostCaller(url, filterColumns, authToken);
    res.send(response);
  }),

  deletePurchaseOrder : (cors(), async (req, res) => {
    const { authToken, data } = req.body;
    const payload = data;
    const response = await apiDeleteCaller(API.GET.PURCHASE_ORDER.PURCHASE_ORDER_LIST, payload, authToken);
    res.send(response);
  }),

  createPurchaseOrder : (cors(), async (req, res) => {
    const { authToken } = req.body;
    const payload = req.body;
    const response = await apiPostCaller(API.GET.PURCHASE_ORDER.PURCHASE_ORDER_LIST, payload.data, authToken);
    res.send(response);
  }),

  addConfigurationFields : (cors(), async (req, res) => {
    const { authToken } = req.body;
    const payload = req.body;
    const response = await apiPostCaller(API.POST.CONFIGURATION_FIELDS.ADD_CONFIGURATION_FIELDS, payload.data, authToken);
    res.send(response);
  }),

  editConfigFields : (cors(), async (req, res) => {
    const { authToken, id, data } = req.body;
    const payload = data;
    const url = `${API.POST.CONFIGURATION_FIELDS.ADD_CONFIGURATION_FIELDS}/${id}`;
    const response = await apiPutCaller(url, payload, authToken);
    res.send(response);
  }),

  deleteConfigFields : (cors(), async (req, res) => {
    const { authToken, id } = req.body;
    const payload = {
      id
    };
    const response = await apiDeleteCaller(API.POST.CONFIGURATION_FIELDS.ADD_CONFIGURATION_FIELDS, payload, authToken);
    res.send(response);
  }),

  searchConfigFields: (cors(), async (req, res) => {
    let { authToken, searchParams } = req.body;
    const url = `${API.POST.CONFIGURATION_FIELDS.SEARCH_CONFIG_FIELDS}`;
    const response = await apiPostCaller(url, searchParams, authToken);
    res.send(response);
  }),

  exportInventory : (cors(), async (req, res) => {    
    const { authToken, payload } = req.body;
    
    const url = `${API.POST.EXPORT}`; //?page=${pageNumber}&size=${pageSize}
    const result = await apiPostCaller(url, payload, authToken); 
    
    res.send(result);
  
  /*  const dummyUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    res.send({ 'filePath': dummyUrl }); */
  }),


};

module.exports = inventoryManagement;