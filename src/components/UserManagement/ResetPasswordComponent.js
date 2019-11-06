import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, LogoImage } from '../common';
import { ICONS, ADMIN_USER } from '../../constants';
import { Footer } from '../common';

class ResetPasswordComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: {
                newPassword: '',
                confirmPassword: ''
            },
            invalidNewPasswordError: false,
            invalidConfirmPasswordError: false,
            errorMatch: '',
            passwordType: 'password'
        };
        this.togglePassword = 'Show';
        this._onKeyPress = this._onKeyPress.bind();
    }

    _onKeyPress = (e) => {
        if (e.key === 'Enter') {
          this._submitForm();
        }
    }

    _submitForm = () => {
        const { password } = this.state;
        const status = this._checkValidation(password);
        if(status) {
            const payload = {
                password: password.newPassword                
            };
            this.props.submitForm(payload);
        }
    }

    _checkValidation(value) {
        const { newPassword, confirmPassword} = value;
        let newPasswordError = '', confirmPasswordError = '', isPasswordMatch = false;
        if(!newPassword && !confirmPassword) {
            newPasswordError = ADMIN_USER.RESET_NEW_PASSWORD_TEXT;
            confirmPasswordError = ADMIN_USER.RESET_CONFIRM_PASSWORD_TEXT;
        } else if (!newPassword) {
            newPasswordError = ADMIN_USER.RESET_NEW_PASSWORD_TEXT;
            confirmPasswordError = '';
        } else if(!confirmPassword) {
            newPasswordError = '';
            confirmPasswordError = ADMIN_USER.RESET_CONFIRM_PASSWORD_TEXT;
        } else {
            if(newPassword !== confirmPassword) {
                newPasswordError = '';
                confirmPasswordError = ADMIN_USER.RESET_PASSWORD_MATCH_TEXT;
            }
            else {
                newPasswordError = '';
                confirmPasswordError = '';
                isPasswordMatch = true;
            }
        }
        this.setState({
            invalidNewPasswordError: newPasswordError,
            invalidConfirmPasswordError: confirmPasswordError
        });
        return isPasswordMatch;
    }

    _onFieldChange = e => {
        const { value, name } = e.target;
        this.setState(prevState => ({
            ...prevState,
            password: {
                ...prevState.password,
                [name]: value
            },
            invalidNewPasswordError: false,
            invalidConfirmPasswordError: false
        }));
    }

    _togglePassword = () => {
        let passwordType = ''; 
        if(this.togglePassword === 'Show') {
            this.togglePassword = 'Hide';
            passwordType = 'text';
        } else {
            this.togglePassword = 'Show';
            passwordType = 'password';
        }
        this.setState({
            passwordType: passwordType
        });
    }

    render() {
        const { newPassword, confirmPassword } = this.state.password;
        const { passwordType, invalidNewPasswordError, invalidConfirmPasswordError } = this.state;
        return (
            <div className="wrapper-main">
                <div className="container">
                <LogoImage className="login-logo"/>
                <div className="wrapper-password reset">
                        <div className="container-password" >
                            <p>Reset Password</p>
                        </div>
                        <div className="clear"></div>
                        <div className="field-container">
                            <div class="input-item">
                                <div class="input-label">
                                    <img src={ ICONS.PADLOCK } width="12" alt="" title="New Password" />
                                </div>
                                <div class="input-label-info">
                                    <p onClick={ this._togglePassword } className="togglepassword">{ this.togglePassword }</p>
                                    <span tooltip="Password must contain at least 8 character, one lowercase letter, one uppercase letter, one number and one special character" flow="left">
                                        <img src={ ICONS.INFO } width="16" alt="" />
                                    </span>
                                </div>
                                <Input 
                                  name="newPassword"
                                  className="form-input" 
                                  placeholder="New Password" 
                                  type={ passwordType } 
                                  defaultValue={ newPassword }
                                  textChange = { this._onFieldChange }
                                  maxLength="23"
                                  keyPress={ this._onKeyPress }
                                />
                                <span className="error">{ invalidNewPasswordError ? invalidNewPasswordError : '' }</span>
                            </div>   
                            <div class="input-item">
                                <div class="input-label reset-mail-label">
                                    <img src={ ICONS.PADLOCK } width="12" alt="" title="Confirm Password" />
                                </div>
                                <Input 
                                  name="confirmPassword"
                                  className="form-input" 
                                  placeholder="Confirm Password" 
                                  defaultValue={ confirmPassword }  
                                  type={ passwordType } 
                                  textChange={ this._onFieldChange }
                                  maxLength="23"
                                  keyPress={ this._onKeyPress }
                                />
                                <span className="error">{ invalidConfirmPasswordError ? invalidConfirmPasswordError : '' }</span>
                            </div>
                            <div className="btn-group-footer">
                                <Button name="Submit" className="button-resetpassword" onClick={ this._submitForm }/>
                            </div>
                        </div>
                </div>
                <Footer />
            </div>
          </div>
        );
    }
}

ResetPasswordComponent.propTypes = {
    submitResetetails: PropTypes.func
};

export default ResetPasswordComponent;