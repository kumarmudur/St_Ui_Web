import React, { Component } from 'react';
import { connect } from 'react-redux';
import { POST_RESEND_EMAIL_LINK, SET_ALERT_STATUS } from '../../actions';
import ActivateUserComponent from '../../components/UserManagement/ActivateUserComponent';
import Modal from '../../components/common/Modal';
import { ADMIN_USER } from '../../constants';

class ActivateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activateUserPayload: this._getRegisterData(props)
        };
    }

    _getRegisterData = props => {
        const { RegisterDetails } = props;
        const activateUserPayload = {};
        if(RegisterDetails && RegisterDetails.registerId) {
            activateUserPayload.email = RegisterDetails.email;
            activateUserPayload.inviteToken = RegisterDetails.inviteToken;
            activateUserPayload.firstName = RegisterDetails.firstName;
        }
        return activateUserPayload;
    }

    _resendEmailLink = () => {
        const { activateUserPayload } = this.state;
        if(activateUserPayload) {
            const dataObj = {
                data: activateUserPayload,
                authToken: activateUserPayload.inviteToken
            };
            this.props.resendEmailLink(dataObj);
        }
    }

    _closeModal = () => {
        this.props.setAlertStatus({ 'visible': false });
    }

    render() {
        const { reSendEmailLink, isAlertVisible } = this.props;
        const email = this.props && this.props.RegisterDetails ? this.props.RegisterDetails && this.props.RegisterDetails.email : '';
        let successMessage = '';
        if(reSendEmailLink && reSendEmailLink.code === 200) {
            successMessage = ADMIN_USER.USER_EMAIL_RESEND_MSG;
        }
        const buttonMeta = [
            {
                name: 'Ok',
                class: 'btn-delete',
                onclick: this._closeModal
            }
        ];

        return (
            <div>
                { reSendEmailLink && 
                  <Modal 
                    title="Message" 
                    isShowModal={ isAlertVisible } 
                    modalBody={ successMessage }
                    closeModal={ this._closeModal }
                    buttons={ buttonMeta }
                  />
                }
               <ActivateUserComponent resendEmailLink={ this._resendEmailLink } userEmail={ email } />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { Register, AlertStatus, PostResendEmailLink } = state;
    return {
        RegisterDetails: Register.userDetails,
        isAlertVisible: AlertStatus.visible,
        reSendEmailLink: PostResendEmailLink
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setAlertStatus: data => {
            return dispatch({ type: SET_ALERT_STATUS, data });
        },
        resendEmailLink: data => {
            return dispatch({ type: POST_RESEND_EMAIL_LINK, data});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivateUser);