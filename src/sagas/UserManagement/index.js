import { takeLatest } from 'redux-saga/effects';
import * as action from '../../actions';
import getDataSaga from './getDataSaga';
import postRegisterSaga from './registerSaga';
import postLoginDataSaga from './loginSaga';
import Logout from './logoutSaga';
import postForgotPasswordSaga from './forgotPasswordSaga';
import postResetPasswordSaga from './resetPasswordSaga';
import postOtpSaga from './otpVerificationSaga';
import postAddUserSaga from './addUserSaga';
import postEditUserSaga from './editUserSaga';
import postAssociateRegisterSaga from './postAssociateRegisterSaga';
import postAssociateUploadSaga from './postAssociateUploadSaga';
import postAdminAdditionalInfoSaga from './postAdminAdditionalInfoSaga';
import postAdminRejectAssociateSaga from './postAdminRejectAssociateSaga';
import postAdminPrintAgreementSaga from './postAdminPrintAgreementSaga';
import postResendEmailLinkSaga from './postResendEmailLinkSaga';
import getSendAgreementSaga from './getSendAgreementSaga';
import viewUsersSaga from './viewUsersSaga';
import searchUsersSaga from './searchUsersSaga';
import postAddRoleSaga from './addRoleSaga';
import postDepartmentSaga from './departmentSaga';
import postOfficeSaga from './officeSaga';
import getCountrySaga from './countrySaga';
import getStatesSaga from './statesSaga';
import getCitySaga from './citySaga';

import getUserTypesSaga from './getUserTypesSaga';
import postAddBulkImportSaga from './addBulkImportSaga';
import getRoleDataSaga from './getRoleSaga';
import viewUsersBulkImportSaga from './viewUsersBulkImportSaga';
import viewRolesSaga from './viewRolesSaga';
import searchRolesSaga from './searchRolesSaga';
import exportUserSaga from './exportUserSaga';
import getUserDataSaga from './getUserDataSaga';
import getEditRoleDataSaga from './getEditRoleDataSaga';

import DeleteUserSaga from './deleteUserSaga';
import viewOrganizationsSaga from './viewOrganizationSaga';

import deleteOfficeSaga from './deleteOfficeSaga';
import deleteDepartmentSaga from './deleteDepartmentSaga';
import editOrganizationSaga from './editOrganizationSaga';

import getOrganizationSaga from './getOrganizationSaga';
import postEditRoleSaga from './postEditRoleSaga';
import chartViewSaga from './chartViewSaga';
//import Navigation from './NavigationSaga';
import setAlertStatus from './setAlertStatusSaga';

import getUserTypeListSaga from './getUserTypeListSaga';
import getRoleListSaga from './getRoleListSaga';
import getOfficeListSaga from './getOfficeListSaga';
import getDepartmentListSaga from './getDepartmentListSaga';
import setPrintAgreementStatusSaga from './setPrintAgreementStatusSaga';
import setLoginResponseStatusSaga from './setLoginResponseStatusSaga';
import Filters from './Filters';

// watcher saga: watches for actions dispatched to the store, starts worker saga
function* watcherSaga() {
  //yield takeLatest(action.NAVIGATION, Navigation);
  yield takeLatest(action.POST_FILTERS, Filters);
  yield takeLatest(action.SET_ALERT_STATUS, setAlertStatus);
  yield takeLatest(action.SET_PRINT_AGREEMENT_STATUS, setPrintAgreementStatusSaga);
  yield takeLatest(action.SET_LOGIN_RESPONSE_STATUS, setLoginResponseStatusSaga);
  yield takeLatest(action.DELETE_USER, DeleteUserSaga);
  yield takeLatest(action.LOGOUT, Logout);
  yield takeLatest(action.POST_REGISTER_DATA, postRegisterSaga);
  yield takeLatest(action.POST_LOGIN_DATA, postLoginDataSaga);
  yield takeLatest(action.POST_FORGOT_PASSWORD, postForgotPasswordSaga);
  yield takeLatest(action.POST_RESET_PASSWORD, postResetPasswordSaga);
  yield takeLatest(action.POST_OTP_DATA, postOtpSaga);
  yield takeLatest(action.POST_ADD_USER, postAddUserSaga);
  yield takeLatest(action.POST_EDIT_USER, postEditUserSaga);
  yield takeLatest(action.POST_SEARCH_USERS, searchUsersSaga);
  yield takeLatest(action.POST_ADD_ROLE, postAddRoleSaga);
  yield takeLatest(action.POST_SEARCH_ROLES, searchRolesSaga);
  yield takeLatest(action.POST_EXPORT_USERS, exportUserSaga);
  //yield takeLatest(action.POST_ADD_DEPARTMENT, postDepartmentSaga);
  //yield takeLatest(action.POST_ADD_OFFICE, postOfficeSaga);
  yield takeLatest(action.POST_ADD_DEPARTMENT, postDepartmentSaga);
  yield takeLatest(action.POST_ADD_OFFICE, postOfficeSaga);
  yield takeLatest(action.POST_ASSOCIATE_REGISTER, postAssociateRegisterSaga);
  yield takeLatest(action.POST_ASSOCIATE_DOCUMENT_UPLOAD, postAssociateUploadSaga);
  yield takeLatest(action.POST_ADMIN_ADDITIONAL_INFO, postAdminAdditionalInfoSaga);
  yield takeLatest(action.POST_ADMIN_REJECT_ASSOCIATE, postAdminRejectAssociateSaga);
  yield takeLatest(action.POST_ADMIN_PRINT_AGREEMENT, postAdminPrintAgreementSaga);
  yield takeLatest(action.POST_RESEND_EMAIL_LINK, postResendEmailLinkSaga);

  yield takeLatest(action.GET_SEND_AGREEMENT, getSendAgreementSaga);
  yield takeLatest(action.GET_COUNTRY, getCountrySaga);
  yield takeLatest(action.GET_ADD_BULK_IMPORT, viewUsersBulkImportSaga);
  yield takeLatest(action.GET_DATA, getDataSaga);
  yield takeLatest(action.GET_VIEW_USERS, viewUsersSaga);
  yield takeLatest(action.GET_STATES, getStatesSaga);
  yield takeLatest(action.GET_CITY, getCitySaga);
  yield takeLatest(action.GET_USER_TYPES, getUserTypesSaga);
  yield takeLatest(action.POST_ADD_BULK_IMPORT, postAddBulkImportSaga);
  yield takeLatest(action.GET_ROLE_DATA, getRoleDataSaga);
  yield takeLatest(action.GET_VIEW_ROLES, viewRolesSaga);
  yield takeLatest(action.GET_USER_DATA, getUserDataSaga);
  
  yield takeLatest(action.GET_VIEW_ORGANIZATIONS, viewOrganizationsSaga);

  yield takeLatest(action.DELETE_OFFICE, deleteOfficeSaga);
  yield takeLatest(action.DELETE_DEPARTMENT, deleteDepartmentSaga);  
  yield takeLatest(action.POST_EDIT_ORGANIZATION, editOrganizationSaga);
  yield takeLatest(action.GET_ORGANIZATION, getOrganizationSaga);

  yield takeLatest(action.GET_EDIT_ROLE_DATA, getEditRoleDataSaga);
  yield takeLatest(action.POST_EDIT_ROLE, postEditRoleSaga);
  yield takeLatest(action.GET_ORGANIZATIONS_CHART, chartViewSaga);

  yield takeLatest(action.GET_USER_TYPE_LIST, getUserTypeListSaga);
  yield takeLatest(action.GET_ROLE_LIST, getRoleListSaga);
  yield takeLatest(action.GET_OFFICE_LIST, getOfficeListSaga);
  yield takeLatest(action.GET_DEPARTMENT_LIST, getDepartmentListSaga);
}


// // single entry point to start all Sagas at once
/* export default function *rootSaga() {
  yield all([
    watcherSaga(),
  ]);
} */

const UserManagementSagas = [ watcherSaga() ];
export default UserManagementSagas;
