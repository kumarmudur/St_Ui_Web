import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { POST_RESET_PASSWORD, SET_ALERT_STATUS } from '../../actions';
import Modal from '../../components/common/Modal';
import { ADMIN_USER } from '../../constants';

import ResetPasswordComponent from '../../components/UserManagement/ResetPasswordComponent';
class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resetPasswordToken: this._getResetPasswordToken(props),
            loginRedirectFlag: false
        };
    }

    _getResetPasswordToken = props => {
        let forgotToken = '';
        const urlParams = new URLSearchParams(props.location.search);
        if(urlParams) {
            forgotToken = urlParams.get('forgotToken');
        }
        return forgotToken;
    }

    _submitForm = data => {
        const { resetPasswordToken } = this.state;
        if(resetPasswordToken) {
            data.forgotToken = resetPasswordToken;
            this.props.submitForm(data);
        }
    }

    _closeModal = () => {
        this.props.setAlertStatus({ 'visible': false });
        this.setState({
            loginRedirectFlag: true
        });
    }

    render() {
        const { ResetPassword, isAlertVisible } = this.props;
        const { loginRedirectFlag } = this.state;

        let successMessage = '';
        if(ResetPassword && ResetPassword.code === 200) {
            successMessage = ADMIN_USER.RESET_PASSWORD_MSG;
        }
        if(loginRedirectFlag) {
            return <Redirect to={ '/login' } />;
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
                { ResetPassword.code === 200 && 
                  <Modal 
                    title="Message" 
                    isShowModal={ isAlertVisible } 
                    modalBody={ successMessage }
                    closeModal={ this._closeModal }
                    buttons={ buttonMeta }
                  />
                }
                <ResetPasswordComponent submitForm={ this._submitForm }/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { AlertStatus, ResetPassword } = state;
    return {
        isAlertVisible: AlertStatus.visible,
        ResetPassword
    };
};

const mapDispatchToProps = dispatch => {
    return {
        submitForm: data => {
            return dispatch({ type: POST_RESET_PASSWORD, data});
        },
        setAlertStatus: data => {
            return dispatch({ type: SET_ALERT_STATUS, data });
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);