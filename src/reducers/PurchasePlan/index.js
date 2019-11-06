// GET METHODS
import getPurchasePlanList from './getPurchasePlanList';
import getStaticDataPurchasePlan from './getStaticDataPurchasePlan';
import getPurchasePlanData from './getPurchasePlanData';
import getStaticDataConfig from './getStaticDataConfig';

// POST METHODS
import postDeletePurchasePlan from './postDeletePurchasePlan';
import postFilterPurchasePlan from './postFilterPurchasePlan';
import postSearchPurchasePlan from './postSearchPurchasePlan';
import postAddPurchasePlan from './postAddPurchasePlan';
import postEditPurchasePlan from './postEditPurchasePlan';

const PurchasePlan = {
    // GET CALLS
    GetPurchasePlanList: getPurchasePlanList,
    GetStaticDataPurchasePlan: getStaticDataPurchasePlan,
    GetPurchasePlanData: getPurchasePlanData,
    GetStaticDataConfig: getStaticDataConfig,

    // POST CALLS
    PostDeletePurchasePlan: postDeletePurchasePlan,
    PostFilterPurchasePlan: postFilterPurchasePlan,
    PostSearchPurchasePlan: postSearchPurchasePlan,
    PostAddPurchasePlan: postAddPurchasePlan,
    PostEditPurchasePlan: postEditPurchasePlan
};

export default PurchasePlan;