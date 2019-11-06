import { takeLatest } from 'redux-saga/effects';
import * as action from '../../actions/proposalManagement';
import viewProposalsSaga from './viewProposalsSaga';
import searchProposalsSaga from './searchProposalsSaga';
import updateProposalsSaga from './updateProposalsSaga';
import getProposalProgressSaga from './getProposalProgressSaga';

// watcher saga: watches for actions dispatched to the store, starts worker saga
function* watcherSaga() {
  yield takeLatest(action.GET_VIEW_PROPOSALS, viewProposalsSaga);
  yield takeLatest(action.POST_SEARCH_PROPOSALS, searchProposalsSaga);
  yield takeLatest(action.PATCH_UPDATE_PROPOSAL, updateProposalsSaga);
  yield takeLatest(action.GET_PROPOSAL_PROGRESS, getProposalProgressSaga);
  
  
}


const UserManagementSagas = [ watcherSaga() ];
export default UserManagementSagas;
