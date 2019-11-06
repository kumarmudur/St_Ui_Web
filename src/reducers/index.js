import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router/immutable';
import UserManagement from './UserManagement';
import InventoryManagement from './InventoryManagement';
import Profile from './Profile';
import PurchasePlan from './PurchasePlan';
import ProposalManagement from './ProposalManagement';
import postFilters from './postFilters';

export default (history) => combineReducers({
  router: connectRouter(history),
  ...UserManagement,
  ...InventoryManagement,
  ...Profile,
  ...PurchasePlan,
  ...ProposalManagement,
  Filters: postFilters
});
