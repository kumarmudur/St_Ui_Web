/* import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router/immutable'; */
import dashboard from './dashboard';
import counterReducer from './counter';
import register from './register';
import login from './login';
import forgotPassword from './forgotPassword';
import resetPassword from './resetPassword';
import addUser from './addUser';
import editUser from './editUser';
import viewUsers from './viewUsers';
import searchUsers from './searchUsers';
import navigation from './navigation';
import department from './department';
import office from './office';
import city from './city';
import country from './country';
import states from './states';
import rolesData from './getRoleData';
import viewUsersBulkImport from './viewUsersBulkImport';
import viewRoles from './viewRoles';
import searchRoles from './searchRoles';
import exportUsers from './exportUsers';
import userData from './getUserData';
import deleteUser from './deleteUser';
import viewOrganizations from './viewOrganizations';
import deleteOffice from './deleteOffice';
import deleteDepartment from './deleteDepartment';
import editOrganization from './editOrganization';
import getOrganization from './getOrganization';
import getEditRoleData from './getEditRoleData';
import postEditRole from './postEditRole';
import addRole from './addRole';
import setAlertStatus from './setAlertStatus';
import chartView from './chartView';
import getDepartmentList from './getDepartmentList';
import getUserTypeList from './getUserTypeList';
import getRoleList from './getRoleList';
import getOfficeList  from './getOfficeList';
import getSendAgreement from './getSendAgreement';
import postAssociateRegister from './postAssociateRegister';
import postAssociateUpload from './postAssociateUpload';
import postAdminAdditionalInfo from './postAdminAdditionalInfo';
import postAdminRejectAssociate from './postAdminRejectAssociate';
import postAdminPrintAgreement from './postAdminPrintAgreement';
import setPrintAgreementStatus from './setPrintAgreementStatus';
import postResendEmailLink from './postResendEmailLink';
import setLoginResponseStatus from './setLoginResponseStatus';

const UserManagementReducers = {
  //router: connectRouter(history),
  count: counterReducer,
  Dashboard: dashboard,
  Register: register,
  Login: login,
  ForgotPassword: forgotPassword,
  ResetPassword: resetPassword,
  AddUser: addUser,
  EditUser: editUser,
  ViewUsers: viewUsers,
  SearchUsers: searchUsers,
  Navigation: navigation,
  ViewUsersBulkImport: viewUsersBulkImport,
  Department: department,
  Office: office,
  City: city,
  Country: country,
  States: states,
  rolesData: rolesData,
  ViewRoles: viewRoles,
  SearchRoles: searchRoles,
  ExportUsers: exportUsers,
  UserData: userData,
  DeleteUser: deleteUser,
  ViewOrganizations: viewOrganizations,
  DeleteOffice: deleteOffice,
  DeleteDepartment: deleteDepartment,
  EditOrganization: editOrganization,
  GetOrganization: getOrganization,
  GetEditRoleData: getEditRoleData,
  PostEditRole: postEditRole,
  AddRole: addRole,
  ChartView: chartView,
  AlertStatus: setAlertStatus,
  GetDepartmentList: getDepartmentList,
  GetUserTypeList: getUserTypeList,
  GetRoleList: getRoleList,
  GetOfficeList: getOfficeList,
  GetSendAgreement: getSendAgreement,
  PostAssociateRegister: postAssociateRegister,
  PostAssociateUpload: postAssociateUpload,
  PostAdminAdditionalInfo: postAdminAdditionalInfo,
  PostAdminRejectAssociate: postAdminRejectAssociate,
  PostAdminPrintAgreement: postAdminPrintAgreement,
  PrintAgreementStatus: setPrintAgreementStatus,
  PostResendEmailLink: postResendEmailLink,
  LoginResponseStatus: setLoginResponseStatus
};
export default UserManagementReducers;

/* 
export default (history) => combineReducers({
  router: connectRouter(history),
  count: counterReducer,
  Dashboard: dashboard,
  Register: register,
  Login: login,
  ForgotPassword: forgotPassword,
  ResetPassword: resetPassword,
  AddUser: addUser,
  EditUser: editUser,
  ViewUsers: viewUsers,
  SearchUsers: searchUsers,
  Navigation: navigation,
  ViewUsersBulkImport: viewUsersBulkImport,
  Department: department,
  Office: office,
  City: city,
  Country: country,
  States: states,
  rolesData: rolesData,
  ViewRoles: viewRoles,
  SearchRoles: searchRoles,
  ExportUsers: exportUsers,
  UserData: userData,
  DeleteUser: deleteUser,
  ViewOrganizations: viewOrganizations,
  DeleteOffice: deleteOffice,
  DeleteDepartment: deleteDepartment,
  EditOrganization: editOrganization,
  GetOrganization: getOrganization,
  GetEditRoleData: getEditRoleData,
  PostEditRole: postEditRole,
  AddRole: addRole,
  ChartView: chartView,
  AlertStatus: setAlertStatus
} );
*/

