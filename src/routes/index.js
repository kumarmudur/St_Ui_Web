import React from 'react';
import { Route, Switch } from 'react-router';
import { PATH } from '../constants';
import NoMatch from '../components/UserManagement/NoMatch';
import Register from '../containers/UserManagement/Register';
import Login from '../containers/UserManagement/Login';
import ForgotPassword from '../containers/UserManagement/ForgotPassword';
import ResetPassword from '../containers/UserManagement/ResetPassword';
import AssociateUser from '../containers/UserManagement/AssociateUser';
import VerifyUser from '../containers/UserManagement/VerifyUser';
import ActivateUser from '../containers/UserManagement/ActivateUser';

import Navigation from '../containers/Navigation';
import Organization from '../containers/UserManagement/Organization';

import PrivacyComponent from '../components/common/Privacy';
import TermsAndConditionsComponent from '../components/common/TermsConditions';

import AddBulkImport from '../containers/UserManagement/AddBulkImport';
import ViewUsersBulkImport from '../containers/UserManagement/ViewUsersBulkImport';

const routes = (
  <div>
    <Switch>
      <Route exact path={ PATH.ROOT } component={ Login } />
      <Route path={ PATH.DASHBOARD } component={ Navigation } />
      <Route path={ PATH.REGISTER } component={ Register } />
      <Route path={ PATH.LOGIN } component={ Login } />
      <Route path={ PATH.FORGOTPASSWORD } component={ ForgotPassword }/>
      <Route path={ PATH.RESETPASSWORD } component={ ResetPassword }/>
      <Route path={ PATH.ORGANIZATION } component={ Organization }/>
      <Route path={ PATH.BULKIMPORT } component={ AddBulkImport }/>
      <Route path={ PATH.VIEWBULKIMPORT } component={ ViewUsersBulkImport } />
      <Route path={ PATH.ASSOCIATE_USER } component={ AssociateUser } />
      <Route path={ PATH.VERIFICATION } component={ VerifyUser } />
      <Route path={ PATH.ACTIVATE } component={ ActivateUser } />
      <Route path={ PATH.PRIVACY } component={ PrivacyComponent } />
      <Route path={ PATH.TERMSCONDITIONS } component={ TermsAndConditionsComponent } />

      <Route component={ NoMatch } />
    </Switch>
  </div>
);

export default routes;
