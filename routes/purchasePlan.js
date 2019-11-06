const API = require('../external-api/purchasePlan');
const cors = require('cors');
const apiCaller = require('../utils/apiCaller');
const { apiPostCaller, apiGetCaller, apiDeleteCaller, apiPutCaller } = apiCaller;

const purchasePlan = {
    //GET METHODS
    purchasePlanList: (cors(), async (req, res) => {
        let { pageNumber, pageSize, authToken, order, sortBy } = req.query;
        pageNumber = parseInt(pageNumber);
        pageSize = pageSize ? parseInt(pageSize) : 10;
        pageNumber = pageNumber>0 ? pageNumber-=1 : 0;

        let url = `${API.GET.PURCHASE_PLAN_LIST}?page=${pageNumber}&size=${pageSize}`;
        if(sortBy && order) {
          url = `${API.GET.PURCHASE_PLAN_LIST}?page=${pageNumber}&size=${pageSize}&order=${ order }&sortBy=${ sortBy }`;
        }
        const response = await apiGetCaller(url, authToken);
        res.send(response);
    }),

    staticDataPurchasePlan: (cors(), async (req, res) => {
        let { authToken } = req.query;
        const url = `${API.GET.STATIC_DATA_PURCHASE_PLAN}`;
        const response = await apiGetCaller(url, authToken);
        res.send(response);
    }),

    purchasePlanData: (cors(), async (req, res) => {
        let {id, authToken } = req.query;
        const url = `${API.GET.PURCHASE_PLAN_LIST}/${id}`;
        const response = await apiGetCaller(url, authToken);
        res.send(response);
    }),

    staticDataConfig: (cors(), async (req, res) => {
        let { authToken } = req.query;
        const url = `${API.GET.STATIC_DATA_CONFIG}`;
        const response = await apiGetCaller(url, authToken);
        res.send(response);
    }),

    //POST METHODS
    searchPurchasePlan: (cors(), async (req, res) => {
        let { pageNumber, pageSize, authToken, searchParams } = req.body;
        pageNumber = parseInt(pageNumber);
        pageSize = pageSize ? parseInt(pageSize) : 10;
        pageNumber = pageNumber>0 ? pageNumber-=1 :0;
        const url = `${API.POST.SEARCH_PURCHASE_PLAN}?page=${pageNumber}&size=${pageSize}`;
        const response = await apiPostCaller(url, searchParams, authToken);
        res.send(response);
    }),

    filterPurchasePlan: (cors(), async (req, res) => {
        let { pageNumber, pageSize, authToken, filterColumns } = req.body;
        pageNumber = parseInt(pageNumber);
        pageSize = pageSize ? parseInt(pageSize) : 10;
        pageNumber = pageNumber>0 ? pageNumber-=1 :0;
        const url = `${API.POST.FILTER_PURCHASE_PLAN}?page=${pageNumber}&size=${pageSize}`;
        const response = await apiPostCaller(url, filterColumns, authToken);
        res.send(response);
    }),

    deletePurchasePlan : (cors(), async (req, res) => {
        const { authToken, data } = req.body;
        const payload = data;
        const response = await apiDeleteCaller(API.POST.DELETE_PURCHASE_PLAN, payload, authToken);
        res.send(response);
    }),

    addPurchasePlan : (cors(), async (req, res) => {
        const { authToken } = req.body;
        const payload = req.body;
        const response = await apiPostCaller(API.GET.PURCHASE_PLAN_LIST, payload.data, authToken);
        res.send(response);
    }),

    editPurchasePlan : (cors(), async (req, res) => {
        const { authToken, id, data } = req.body;
        const payload = data;
        const url = `${API.GET.PURCHASE_PLAN_LIST}/${id}`;
        const response = await apiPutCaller(url, payload, authToken);
        res.send(response);
    }),
};

module.exports = purchasePlan;