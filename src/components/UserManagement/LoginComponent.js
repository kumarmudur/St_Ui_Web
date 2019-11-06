import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { ICONS } from '../../constants';

import { Input , Button, Checkbox, Footer, LogoImage,  Modal } from '../common';
import { loginValidation } from '../../utils/validations';

class LoginComponent extends Component {

  constructor(props) {
    super(props);
    let checked = false;
    if(props.userLocalData && props.userLocalData.userName && props.userLocalData.userName !== '') {
      checked = true;
    }
    this.state = {
        loginInfo: {
            userName: props.userLocalData && props.userLocalData.userName && props.userLocalData.userName || '',
            password: props.userLocalData && props.userLocalData.password && props.userLocalData.password || ''
        },
        checked,
        isInvalidUsername: false,
        isInvalidPassword: false,
        errorUsernameMessage: '',
        errorPasswordMessage: '',
        userLocalData: {
            userName: props.userLocalData && props.userLocalData.userName && props.userLocalData.userName || '',
            password: props.userLocalData && props.userLocalData.password && props.userLocalData.password || '',
        }
    };   
    this._onKeyPress = this._onKeyPress.bind();
  }

    _onKeyPress = (e) => {
        if (e.key === 'Enter') {
          this._submitForm();
        }
      }
    
      componentWillReceiveProps(nextProps) {
        let loginErrorMsg = '';
        let invalidLogin = false;
        
        if(nextProps && nextProps.loginData && nextProps.dataLoaded) {
            if(nextProps.loginData.code === 200) {
              loginErrorMsg = '';
              invalidLogin = false;
            }
            if(nextProps.loginData.code === 401) {
              loginErrorMsg = nextProps.loginData.loginFailedError;
              invalidLogin = true;
            }
            if(nextProps.loginData.code === 403) {
              loginErrorMsg = nextProps.loginData.loginFailedError;
              invalidLogin = true;
            }
            this.setState({
              isInvalidPassword : invalidLogin,
              errorPasswordMessage: loginErrorMsg
            });
        }
      }

      _submitForm = () => {
        let { loginInfo, userLocalData, checked } = this.state;
        if(!loginInfo && userLocalData) {
          loginInfo = userLocalData;
        }
        const loginStatus = loginValidation(loginInfo);
        this.setState({
            isInvalidUsername: loginStatus.invalidUsername,
            isInvalidPassword: loginStatus.invalidPassword,
            errorUsernameMessage: loginStatus.errorUserNameMessage,
            errorPasswordMessage: loginStatus.errorPasswordMessage
        });
        loginInfo.rememberMe = checked;
        if(loginStatus.validationFailed === false) {
          this.props.submitForm(loginInfo); 
        }
    }

    _onFieldUsernameChange = e => {
      const { type, checked, name } = e.target;
      const { userLocalData } = this.state;
      let { value } = e.target;
      if(!value && userLocalData && userLocalData.userName && userLocalData.userName !== '' ) {
        value = userLocalData.userName;
      }

      const data = type === 'checkbox' ? checked : value;
      //let fieldStatus = usernameValidation(value);
      this.setState(prevState => ({
          ...prevState,
          loginInfo: {
              ...prevState.loginInfo,
              [name]: data
          },
          isInvalidUsername: false,
          errorUsernameMessage: ''
      }));
    }

     _onFieldPasswordChange = e => {
      const { type, checked, name } = e.target;
      const { userLocalData } = this.state;
      let { value } = e.target;
      if(!value && userLocalData && userLocalData.password && userLocalData.password !=='' ) {
        value = userLocalData.password;
      }
      const data = type === 'checkbox' ? checked : value;

      this.setState(prevState => ({
          ...prevState,
          loginInfo: {
              ...prevState.loginInfo,
              [name]: data
          },
          isInvalidPassword: false,
          errorPasswordMessage: ''
      }));
    }

    _handleCheckBoxChange = e => {
      let { loginInfo } = this.state;
      const checked = e.currentTarget.checked;
      loginInfo.rememberMe = checked;
      this.setState({
        loginInfo,
        checked
      });
    }

    render() {
      const { checked, isInvalidUsername, isInvalidPassword, errorUsernameMessage, errorPasswordMessage, userLocalData} = this.state;
        return (
             <div className="wrapper-main"> 
              <div className="container">
                <LogoImage className="login-logo"/>
                <Modal />
                  <div className="wrap-input-item">
                      <div className="field-container">
                          <div className="input-item">
                              <div className="input-label">
                                  <img src={ ICONS.USERINPUT } width="18" height="20" alt="" title="Email" />
                              </div>
                              <Input 
                                className="form-input" 
                                name="userName" 
                                type="text" 
                                placeholder="Email" 
                                textChange = { this._onFieldUsernameChange }
                                keyPress={ this._onKeyPress }
                                required={ true }
                                autoComplete="none"
                                defaultValue={ userLocalData.userName }
                                maxLength="60" 
                              />
                              <span className="error">{ isInvalidUsername ? errorUsernameMessage : '' }</span>
                          </div>

                          <div className="input-item">
                              <div className="input-label">
                                  <img src={ ICONS.PADLOCK } width="15" height="20" alt="" title="Password" />
                              </div>
                              <Input 
                                className="form-input" 
                                name="password" 
                                type="password" 
                                placeholder="Password" 
                                textChange={ this._onFieldPasswordChange }
                                required={ true }
                                keyPress={ this._onKeyPress }
                                autoComplete="new-password"
                               // defaultValue={ userLocalData.password }
                                maxLength="30" 
                                defaultValue="Solar@123"
                              />
                              <span className="error">{ isInvalidPassword ? errorPasswordMessage : '' }</span>
                          </div>
                          <div className="btn-group-footer">
                              <Button name="Log In" className="button-login" onClick={ this._submitForm }/>
                          </div>
                          <div className="input-remember">
                              <label className="checkbox-label">
                              <Checkbox name="checked" type="checkbox" checked={ checked } value={ checked } onChange={ this._handleCheckBoxChange } />
                              </label>
                              <span>Remember Me</span>

                          <NavLink to='/forgotpassword'>Forgot Password?</NavLink>
                          </div>
                          <div className="input-newuser">
                              <p><span>New User? </span><NavLink to='/register'>Register</NavLink></p>
                          </div>
                      </div>
                  </div>
              </div>
              <Footer />
            </div>
        );
    }
}

LoginComponent.propTypes = {
    submitLoginData: PropTypes.func
};

export default LoginComponent;