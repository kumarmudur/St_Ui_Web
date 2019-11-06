import { all } from 'redux-saga/effects';
import Common from './Common';
import UserManagement from './UserManagement';
import InventoryManagement from './InventoryManagement';
import Profile from './Profile';
import PurchasePlan from './PurchasePlan';
import ProposalManagement from './ProposalManagement';


// // single entry point to start all Sagas at once
export function *rootSaga() {
  yield all([
    Common,
    UserManagement,
    InventoryManagement,
    Profile,
    PurchasePlan,
    ProposalManagement
  ]);
}
