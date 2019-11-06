import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NAVIGATION, SET_ALERT_STATUS } from '../../actions';
import { POST_CHANGE_PASSWORD } from '../../actions/profile';
import Modal from '../../components/common/Modal';
import ChangePasswordComponent from '../../components/Profile/ChangePasswordComponent';
import { ADMIN_USER } from '../../constants';
class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resetDetails: ''
        };
    }

    _submitForm = data =>{
        const { email, authToken } = this.props.Login;
        const dataObj = {
            data: {
                email: email,
                password: data.oldPassword,
                newPassword: data.newPassword
            },
            authToken
        };
        this.props.submitForm(dataObj);
    }

    _navigate = () => {
        const { registerId } = this.props.Login;
        this.props.navigate({ currentPage: 'PROFILE', registerId  });
    }

    _closeModal = () => {
        const { registerId } = this.props.Login;
        const { code } = this.props.ChangePassword;
        this.props.setAlertStatus({ 'visible': false });
        if(code === 200) {
            this.props.navigate({ currentPage: 'PROFILE', registerId });
        }
    }

    render() {
        const { code } = this.props.ChangePassword;
        const { isAlertVisible } = this.props;
        let successMessage = '';
        if(code === 200) {
            successMessage = ADMIN_USER.CHANGE_PASSWORD_MSG;
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
                { code === 200 && isAlertVisible && 
                    <Modal 
                      title="Message" 
                      isShowModal={ isAlertVisible } 
                      modalBody={ successMessage }
                      closeModal={ this._closeModal }
                      buttons={ buttonMeta }
                    />
                }
                <ChangePasswordComponent submitForm={ this._submitForm } navigate={ this._navigate } successCode={ code } />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { Login, AlertStatus, PostChangePassword } = state;
    return {
        Login,
        isAlertVisible: AlertStatus.visible,
        ChangePassword: PostChangePassword
    };
};

const mapDispatchToProps = dispatch => {
    return {
        submitForm: data => {
            return dispatch({ type: POST_CHANGE_PASSWORD, data});
        },
        navigate: data => {
            return dispatch({ type: NAVIGATION, data });
        },
        setAlertStatus: data => {
            return dispatch({ type: SET_ALERT_STATUS, data });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);