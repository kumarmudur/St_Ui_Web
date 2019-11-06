const API_HOST_BASE = 'https://solartopps.us';
const API_HOST = `${API_HOST_BASE}/api/purchase/v1`;


const POST = {
      SEARCH_PURCHASE_PLAN: `${API_HOST}/search/purchasePlans`,
      FILTER_PURCHASE_PLAN: `${API_HOST}/purchasePlans/filter`,
      DELETE_PURCHASE_PLAN: `${API_HOST}/purchasePlans`,
};

const GET = {
    PURCHASE_PLAN_LIST :`${API_HOST}/purchasePlans`,
    STATIC_DATA_PURCHASE_PLAN : `${API_HOST}/staticData/general`,
    STATIC_DATA_CONFIG: `${API_HOST}/staticData/config`
};

module.exports = { GET, POST };
