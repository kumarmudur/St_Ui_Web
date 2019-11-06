import viewProposals from './viewProposals';
import patchUpdateProposal from './patchUpdateProposal';
import postSearchProposals from './postSearchProposals';
import getProposalProgress from './getProposalProgress';

//patchUpdateProposalsSaga
/* import addUser from './addUser';
import editUser from './editUser';
import searchUsers from './searchUsers';
import exportUsers from './exportUsers';
import userData from './getUserData';
import deleteUser from './deleteUser'; */


const ProposalManagementReducers = {
  ViewProposals: viewProposals,
  UpdateProposal: patchUpdateProposal,
  SearchProposals: postSearchProposals,
  ProposalProgress: getProposalProgress

  /* ExportUsers: exportUsers,
  AddUser: addUser,
  EditUser: editUser,
  SearchUsers: searchUsers,
  UserData: userData,
  DeleteUser: deleteUser, */
};

export default ProposalManagementReducers;
