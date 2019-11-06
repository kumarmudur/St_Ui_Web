import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { Input, Button, LogoImage } from '../common';
import { ICONS } from '../../constants';
import { usernameValidation } from '../../utils/validations';
import { Footer } from '../common';
import { ADMIN_USER } from '../../constants';

class ForgotPasswordComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            isInvalidUsername: false,
            errorMessage: ''
        };
        this._onKeyPress = this._onKeyPress.bind();
    }

    _onKeyPress = (e) => {
        if (e.key === 'Enter') {
          this._submitForm();
        }
    }

    componentWillReceiveProps(nextProps) {
        let { errorMessage } = this.state;
        if(nextProps && nextProps.ForgotPassword) {
            if(!errorMessage && nextProps.ForgotPassword.code === 403) {
                this.setState({
                    errorMessage: ADMIN_USER.FORGOT_PASSWORD_WRONG_EMAIL,
                    isInvalidUsername: true
                });
            }
        }
    }
    
    _submitForm = () => {
       const { username } = this.state;
       let fieldStatus = this._checkValidation();
       if(!fieldStatus.status) {
           const payload = {
              email: username,
              originApp : 'adminApp'
           };
           this.props.submitForm(payload);
       }
    }

    _checkValidation = (username = null) => {
        const name = username ? username : this.state.username;
        let validationStatus =  usernameValidation(name);
        this.setState({
            isInvalidUsername: validationStatus.status,
            errorMessage: validationStatus.errorMessage
        });
        return validationStatus;
    }

    _onFieldPasswordChange = e => {
        const { value } = e.currentTarget;
        this.setState({
            username: value,
            errorMessage: '',
            isInvalidUsername: false
        });
    }

    render() {
        const { username, isInvalidUsername, errorMessage } = this.state;
        return (
            <div className="wrapper-main">
                <div className="container">
                <LogoImage className="login-logo"/>
                <div className="wrapper-password">
                        <div className="container-password" >
                            <p>Forgot Password</p>
                        </div>
                        <div className="clear"></div>
                        <div className="field-container">
                            <div class="input-item">
                                <div class="input-label">
                                    <img src={ ICONS.USERINPUT } width="18" height="20" alt="" title="Email" />
                                </div>
                                <Input 
                                  className="form-input" 
                                  placeholder="Email" 
                                  type="text"
                                  defaultValue={ username } 
                                  textChange={ this._onFieldPasswordChange }
                                  maxLength="60"
                                  keyPress={ this._onKeyPress }
                                  autoComplete="none"  
                                />
                                <span className="error">{ isInvalidUsername ? errorMessage : '' }</span>
                            </div>
                            <div className="btn-group-footer">
                                <Button name="Submit" className="button-forgotpassword" onClick={ this._submitForm }/>
                            </div>
                            <div className="back-login">
                                <p><span>Back to </span><NavLink to='/login'>Log In</NavLink></p>
                            </div>
                        </div>
                </div>
                <Footer />
            </div>
        </div>
        );
    }
}

ForgotPasswordComponent.propTypes = {
    submitLoginDetails: PropTypes.string
};

export default ForgotPasswordComponent;