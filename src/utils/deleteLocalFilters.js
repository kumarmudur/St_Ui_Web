//import deleteLocalFilters from './deleteLocalFilters';
import { deleteLocalData } from './storage';

export const deleteLocalFilters = () => {
  const localFilters = [
    'view-users',
    'purchase-plans',
    'manage-warehouse',
    'manage-supplier',
    'manage-products',
    'manage-purchase-order',
    'view-proposals'
    ];
    localFilters.map(item => deleteLocalData(item));
};
