
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NAVIGATION, GET_USER_DATA, SET_ALERT_STATUS, SET_PRINT_AGREEMENT_STATUS, POST_ADMIN_ADDITIONAL_INFO, POST_ADMIN_REJECT_ASSOCIATE, GET_SEND_AGREEMENT, GET_ROLE_LIST, POST_ADMIN_PRINT_AGREEMENT } from '../../actions';
import UserDetailComponent from '../../components/UserManagement/UserDetailComponent';
import AdminUserDetailComponent from '../../components/UserManagement/AdminUserDetailComponent';
import { Breadcrumb } from '../../components/common';
import Modal from '../../components/common/Modal';
import { ADMIN_USER } from '../../constants';

class UserDetail extends Component {
    constructor(props) {
        super(props);
        if(props && props.id) {
            this._getUserData( props.id );
            this._getRoleList();
        }
    }

    _getUserData = id => {
        const { authToken } = this.props.Login;
        this.props.getUserData({ 
            id,
            authToken
        });
        
    }

    _getRoleList = () => {
        const { authToken } = this.props.Login;
        this.props.getRoleList({ authToken });
    }
    
    _navigateTo = (page) => {
        this.props.navigate({ currentPage: page });
    }

    _changePage = () => {
        this.props.navigate({ currentPage: 'VIEW_USERS' });
    }

    _requestAdditionalDocs = data => {
        const { authToken } = this.props.Login;
        if(data) {
            const dataObj = {
                data,
                authToken
            };
            this.props.requestAdditionalDocs(dataObj);
        }
    }

    _rejectUser = data => {
        const { authToken } = this.props.Login;
        const dataObj = {
            data,
            authToken
        };
        this.props.rejectUser(dataObj);
    }

    _closeModal = () => {
        this.props.setAlertStatus({ 'visible': false });
        this._changePage();
    }

    _sendAgreementRegisterId = data => {
        const { authToken } = this.props.Login;
        if(data) {
            data.authToken = authToken;
            this.props.sendAgreementRegisterId(data);
        }
    }

    _printAgreement = data => {
        const { authToken } = this.props.Login;
        const dataObj = {
            data,
            authToken
        };
        this.props.printAgreement(dataObj);
    }

    render() {
        const userDetails = this.props && this.props.UserData ? this.props.UserData && this.props.UserData.user : null;
        const registerId = userDetails && userDetails.registerId;
        const { isAlertVisible } = this.props;
        const userType = userDetails && userDetails.userType;
        let dataLoaded = false;
        if(this.props.id && parseInt(this.props.id) === registerId) {
            dataLoaded = true;
        }
        const loggedInUserType = this.props && this.props.Login.userType;
        const { AdminAdditionalInfo, AdminRejectUser, roleList, AdminPrintAgreement, printAgreementEnabled } = this.props;
        let successMessage = '';
        let printAgreementUrl = '';
        if(AdminAdditionalInfo.code === 200) {
            successMessage = AdminAdditionalInfo.message;
        }
        if(AdminRejectUser.code === 200) {
            successMessage = ADMIN_USER.REJECT_USER_MSG;
        }
        if(AdminPrintAgreement.code === 200 && printAgreementEnabled === true) {
            printAgreementUrl = AdminPrintAgreement.filePath;
            this.props.setPrintAgreementStatus({ 'downloadFile': false });
        }

        const buttonMeta = [
            {
                name: 'Ok',
                class: 'btn-delete',
                onclick: this._closeModal
            }
        ];
        return (
            <div className="container user-details">
              <div>
                <Breadcrumb 
                  firstTitle="User Management"
                  secondTitle="Manage Users"
                  thirdTitle="View User"
                  changePage={ this._changePage }
                  className='user-management-bread-crumb'
                />
              </div>  
              <Modal 
                title="Message" 
                isShowModal={ isAlertVisible } 
                modalBody={ successMessage }
                closeModal={ this._closeModal }
                buttons={ buttonMeta }
              />
               { dataLoaded && userDetails && loggedInUserType === 'Admin' && userType === 'Associate' && 
                 <AdminUserDetailComponent 
                   userDetails={ userDetails } 
                   roleList={ roleList } 
                   navigateTo= { this._navigateTo } 
                   requestAdditionalDocs={ this._requestAdditionalDocs } 
                   rejectUser={ this._rejectUser } 
                   sendAgreementRegisterId = { this._sendAgreementRegisterId } 
                   printAgreement= { this._printAgreement }
                   agreementPath={ printAgreementUrl }
                 /> 
                }
               { dataLoaded && userDetails && (loggedInUserType !== 'Admin' || loggedInUserType === 'Admin' && userType !== 'Associate') && 
                 <UserDetailComponent 
                   userDetails={ userDetails } 
                   navigateTo= { this._navigateTo } 
                 /> 
                }
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { Login, PostAdminAdditionalInfo, PostAdminRejectAssociate, AlertStatus, UserData, PrintAgreementStatus, GetRoleList, PostAdminPrintAgreement } = state;
    const roleList= GetRoleList && GetRoleList.roleList ? GetRoleList.roleList : [];
    return {
        UserData,
        Login,
        isAlertVisible: AlertStatus.visible,
        AdminRejectUser: PostAdminRejectAssociate,
        AdminPrintAgreement: PostAdminPrintAgreement,
        roleList,
        printAgreementEnabled: PrintAgreementStatus.downloadFile,
        AdminAdditionalInfo: { code : PostAdminAdditionalInfo.code, message:PostAdminAdditionalInfo.message }
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        navigate: data => {
            return dispatch({ type: NAVIGATION, data });
        },
        requestAdditionalDocs: data => {
            return dispatch({ type: POST_ADMIN_ADDITIONAL_INFO, data });
        },
        rejectUser: data => {
            return dispatch({ type: POST_ADMIN_REJECT_ASSOCIATE, data });
        },
        getUserData: data => {
            return dispatch({ type: GET_USER_DATA, data });
        },
        setAlertStatus: data => {
            return dispatch({ type: SET_ALERT_STATUS, data });
        },
        sendAgreementRegisterId: data => {
            return dispatch({ type: GET_SEND_AGREEMENT, data });            
        },
        getRoleList: data => {
            return dispatch({ type: GET_ROLE_LIST, data});
        },
        printAgreement: data => {
            return dispatch({ type: POST_ADMIN_PRINT_AGREEMENT, data });
        },
        setPrintAgreementStatus: data => {
            return dispatch({ type: SET_PRINT_AGREEMENT_STATUS, data });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);