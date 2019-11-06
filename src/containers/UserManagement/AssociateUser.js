
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GET_USER_DATA, SET_ALERT_STATUS, POST_ASSOCIATE_REGISTER, POST_ASSOCIATE_DOCUMENT_UPLOAD, LOGOUT } from '../../actions';
import AssociateUserEditComponent from '../../components/UserManagement/AssociateUserEditComponent';
import AssociateUserComponent from '../../components/UserManagement/AssociateUserComponent';
import Modal from '../../components/common/Modal';
import { Redirect } from 'react-router-dom';
import { ADMIN_USER } from '../../constants';


class AssociateUser extends Component {
    constructor(props) {
        super(props);
        const userSessionData = this._getRegisterId();
        const { registerId } = userSessionData;
        if(registerId) {
            this._getUserData(registerId);
        }
        this.state = {
            authToken: props.Login.authToken || null,
            logoutFlag: false
        };
    }

    _getRegisterId = () => {
        const { RegisterDetails, Login } = this.props;
        let registerId = null;
        let authToken = null;
        if(RegisterDetails && RegisterDetails.registerId) {
            registerId = RegisterDetails.registerId;
            authToken = RegisterDetails.inviteToken;
        }
        else if(Login && Login.registerId) {
            registerId = Login.registerId;
            authToken = Login.authToken;
        }
        return {
            registerId,
            authToken
        }; 
    }

    _logout = () => {
        this.setState({
            logoutFlag: true
        });
        this.props.logout({authToken: this.props.Login.authToken });
    }

    _getUserData = id => {
        const userSessionData = this._getRegisterId();
        const { authToken } = userSessionData;
        this.props.getUserData({ 
            id,
            authToken
        });
    }

    _submitForm = data => {
        const userSessionData = this._getRegisterId();
        const { authToken, registerId } = userSessionData;
        if(registerId) {
            const dataObj = {
                data,
                authToken
            };
            this.props.submitForm(POST_ASSOCIATE_REGISTER, dataObj);
        }
    }

    _closeModal = () => {
        const userSessionData = this._getRegisterId();
        const { registerId } = userSessionData;
        this.props.setAlertStatus({ 'visible': false });
        this._getUserData( registerId );
    }

    _submitFiles = files => {
        const userSessionData = this._getRegisterId();
        const { authToken, registerId } = userSessionData;
        if(files) {
            this.props.submitFiles( files, authToken, registerId );
            this._getUserData( registerId );
        }
    }

    render() {
        const { logoutFlag } = this.state;
        if(logoutFlag && !this.props.Login.authToken) {
            return <Redirect to={ '/login' } />;
        }
        const UserData = this.props && this.props.UserData ? this.props.UserData && this.props.UserData.user : null;
        const userStatus = UserData && UserData.status;
        let successMessage = '';
        let { generalInfosubmitStatus, documentUploadStatus, isAlertVisible } = this.props;

        if(generalInfosubmitStatus && generalInfosubmitStatus.code === 200) {
            successMessage = ADMIN_USER.GENERAL_INFO_SUBMITTED_MSG;
        }

        if(documentUploadStatus && documentUploadStatus.code === 200) {
            successMessage = ADMIN_USER.DOCUMENTS_SUBMITTED_MSG;
        }

        const buttonMeta = [
            {
                name: 'Ok',
                class: 'btn-delete',
                onclick: this._closeModal
            }
        ];
        return (
            <div className="container">
                <Modal 
                  title="Message" 
                  isShowModal={ isAlertVisible } 
                  modalBody={ successMessage }
                  closeModal={ this._closeModal }
                  buttons={ buttonMeta }
                />
                { (userStatus === 'GENERAL_INFO_SUBMITTED' || userStatus === 'DOCUMENTS_SUBMITTED' || userStatus === 'DOCUMENTS_REQUESTED' 
                  || userStatus === 'REJECTED' || userStatus === 'AGREEMENT_SENT' || userStatus === 'AGREEMENT_ESIGNED') && UserData && 
                    <AssociateUserComponent 
                      userDetails = { UserData } 
                      submitFiles={ this._submitFiles }
                      logout = { this._logout } 
                    /> 
                }
                { userStatus === 'CONFIRMED' && 
                    <AssociateUserEditComponent 
                      userData = { UserData } 
                      submitForm={ this._submitForm } 
                      cancelForm= { this._cancelForm } 
                      formSuccessMessage={ this.props.successMessage }
                      logout = { this._logout }  
                    /> 
                }
            </div>
        );
    }
}
const mapStateToProps = state => {
    const { PostAssociateRegister, UserData, Register, AlertStatus, PostAssociateUpload, Login } = state;
    return {
        UserData,
        Login,
        RegisterDetails: Register.userDetails,
        generalInfosubmitStatus: { code: PostAssociateRegister.code },
        isAlertVisible: AlertStatus.visible,
        documentUploadStatus: { code: PostAssociateUpload.code }
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        getUserData: data => {
            return dispatch({ type: GET_USER_DATA, data });
        },
        submitForm: (type, data) => {
            return dispatch({ type, data});
        },
        setAlertStatus: data => {
            return dispatch({ type: SET_ALERT_STATUS, data });
        },
        submitFiles: ( files, authToken, registerId ) => {
            return dispatch({ type: POST_ASSOCIATE_DOCUMENT_UPLOAD, files, authToken, registerId });
        },
        logout: data => dispatch({ type: LOGOUT, data })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssociateUser);