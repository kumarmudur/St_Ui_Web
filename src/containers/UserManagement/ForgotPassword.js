import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { POST_FORGOT_PASSWORD, SET_ALERT_STATUS } from '../../actions';
import ForgotPasswordComponent from '../../components/UserManagement/ForgotPasswordComponent';
import Modal from '../../components/common/Modal';
import { ADMIN_USER } from '../../constants';
import '../../styles/index.scss';
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginRedirectFlag: false
        };
    }

    _submitForm = data => {
        this.props.submitForm(data);
    }

    _closeModal = () => {
        const { ForgotPassword } = this.props;
        this.props.setAlertStatus({ 'visible': false });
        if(ForgotPassword.code === 200) {
            this.setState({
                loginRedirectFlag: true
            });
        }
    }

    render() {
        const { ForgotPassword, isAlertVisible } = this.props;
        const { loginRedirectFlag } = this.state;
        let successMessage = '';
        if(ForgotPassword && ForgotPassword.code === 200) {
            successMessage = ADMIN_USER.FORGOT_PASSWORD_MSG;
        }
        
        if(loginRedirectFlag && ForgotPassword.code === 200) {
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
            <Fragment>
                { ForgotPassword.code === 200 && 
                  <Modal 
                    title="Message" 
                    isShowModal={ isAlertVisible } 
                    modalBody={ successMessage }
                    closeModal={ this._closeModal }
                    buttons={ buttonMeta }
                  />
                }
               <ForgotPasswordComponent submitForm={ this._submitForm } ForgotPassword={ ForgotPassword } />
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { AlertStatus, ForgotPassword } = state;
    return {
        isAlertVisible: AlertStatus.visible,
        ForgotPassword
    };
};

const mapDispatchToProps = dispatch => {
    return {
        submitForm: data => {
            return dispatch({ type: POST_FORGOT_PASSWORD, data});
        },
        setAlertStatus: data => {
            return dispatch({ type: SET_ALERT_STATUS, data });
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);