import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { POST_LOGIN_DATA, SET_LOGIN_RESPONSE_STATUS } from '../../actions';
import LoginComponent from '../../components/UserManagement/LoginComponent';
import Modal from '../../components/common/Modal';
import { save, loadData, deleteLocalData } from '../../utils/storage';
import { USER_INFO } from '../../constants';

//import crypto from 'crypto';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state ={
          rememberMe: false,
          toggleModal: false
        };

        /* if(userLocalData && userLocalData.hasOwnProperty('data') && userLocalData.data.hasOwnProperty('authToken') && !this.props.hasOwnProperty('loginStatus')) {
          this.props.submitForm({ localLogin: userLocalData.data });  
        } */
    }

    componentWillReceiveProps(nextProps) {
      const { code } =  nextProps && nextProps.Login;
      if(nextProps && code === 200 && nextProps.LoginResponseLoaded) {
        if(nextProps.Login.userType === 'Customer') {
          this.setState({
            toggleModal : true
          });
        }
      }
    }

    _submitForm = data => {
      if(data.rememberMe) {
        deleteLocalData('user');
        save('user', data);
      }
        this.setState({
          rememberMe: data.rememberMe
        });
        this.props.setLoginResponseStatus({ 'dataLoaded': false });
        this.props.submitForm(data);

    }

    _closeModal = () => {
        this.setState({
          toggleModal: false
        });
    }

    render() {
        const { userType, status, authToken } = this.props.Login;
        const { toggleModal } = this.state;
        let loginData =  '';
        const dataLoaded = this.props && this.props.LoginResponseLoaded ? this.props.LoginResponseLoaded : null;
        if(dataLoaded) {
          const loginFailedError = this.props && this.props.Login.message ? this.props.Login.message : '';
          const loginSuccessCode = this.props && this.props.Login.code ? this.props.Login.code : null;
          loginData = {
            code: loginSuccessCode,
            loginFailedError
          };
        }
        const userLocalData = loadData('user');

        const buttonMeta = [
          {
              name: 'Ok',
              class: 'btn-delete',
              onclick: this._closeModal
          }
        ];

        if(authToken) {
            /* if(this.state.rememberMe) {
              save('user', this.props);
            } */
            if(userType === 'Associate' && status !== 'ACTIVE') {
                return <Redirect to={ '/generalinfo' } />;
            }
            else if(status !== 'PENDING_FOR_VERIFICATION' && userType !== 'Customer') {
                return <Redirect to={ '/dashboard' } />;
            }

        }
        return (
            <div>
               <LoginComponent 
                 userLocalData={ userLocalData && userLocalData.data } 
                 submitForm={ this._submitForm }  
                 loginData={ loginData } 
                 dataLoaded={ dataLoaded } 
               />

                { toggleModal && 
                <Modal 
                  title="Access denied" 
                  isShowModal={ toggleModal } 
                  modalBody={ USER_INFO.CUSTOMER_LOGIN_MSG }
                  closeModal={ this._closeModal }
                  buttons={ buttonMeta }
                /> 
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { Login, LoginResponseStatus } = state;
    return {
      Login,
      LoginResponseLoaded: LoginResponseStatus.dataLoaded
    };
};

const mapDispatchToProps = dispatch => {
    return {
        submitForm: data => {
            return dispatch({ type: POST_LOGIN_DATA, data});
            //dispatch(push(Path.leftnavigation));
        },
        setLoginResponseStatus: data => {
            return dispatch({ type: SET_LOGIN_RESPONSE_STATUS, data });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);