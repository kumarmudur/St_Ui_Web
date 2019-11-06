import React, { Component } from 'react';
import { Button, Input } from '../common';
import { ICONS } from '../../constants';
import { changePasswordValidation } from '../../utils/validations';
import { ADMIN_USER } from '../../constants';

class ChangePasswordComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            errors: {},
            toggleOldPassword: false,
            toggleNewPassword: false,
            isFormValid: true
        };
    }

    componentWillReceiveProps(nextProps) {
        let { errorOldPassword } = this.state.errors;
        if(nextProps && nextProps.successCode) {
            if(!errorOldPassword && nextProps.successCode === 400) {
                this.setState({
                    errors: {
                        errorOldPassword: ADMIN_USER.CHANGE_WRONG_PASSWORD_MSG
                    }
                });
            }
        }

    }
    _submitForm = () => {
        const { password } = this.state;
        const formStatus =  this._checkValidation();
        if(formStatus) {
            this.props.submitForm(password);
        }
    }

    _checkValidation = () => {
        const formStatus = changePasswordValidation(this.state.password);
        this.setState({
          errors: formStatus.errors,
          isFormValid: formStatus.formIsValid
        });
        return formStatus.status;
      };

    //   _onFieldBlur = () => {
    //     this._checkValidation();
    //   }

    _onFieldChange = e => {
        const { value, name } = e.target;
        this.setState(prevState => ({
            ...prevState,
            password: {
                ...prevState.password,
                [name]: value
            },
            errors: {},
            isFormValid: true
        }));
    }

    _togglePassword = e => {
        const fieldName = e.currentTarget.title;
        let { toggleOldPassword, toggleNewPassword } = this.state;
        if(fieldName === 'oldPassword') {
            toggleOldPassword = !toggleOldPassword;
        }
        else {
            toggleNewPassword = !toggleNewPassword;
        }
        this.setState({
            toggleOldPassword,
            toggleNewPassword
        });
    }

    _navigateTo = () => {
        this.props.navigate();
    }

    render() {
        const { oldPassword, newPassword, confirmPassword } = this.state.password;
        let { toggleOldPassword, toggleNewPassword } = this.state;
        const { errorOldPassword, errorPassword, errorConfirmPassword } = this.state.errors;
        let oldPasswordType = 'password';
        let newPasswordType = 'password';
        toggleOldPassword = toggleOldPassword === false ? 'Show' : 'Hide';
        oldPasswordType = toggleOldPassword === 'Show' ? 'password' : 'text';

        toggleNewPassword = toggleNewPassword === false ? 'Show' : 'Hide';
        newPasswordType = toggleNewPassword === 'Show' ? 'password' : 'text';
        return (
            <div className="container changepwd">
               <div className="wrapper-password changepwdForm">
                 <div className="container-password" >
                     <p>Change Password</p>
                 </div>
                 <div className="clear"></div>
                 <div className="field-container">
                        <div class="input-item">
                            <div class="input-label">
                                <img src={ ICONS.PADLOCK } width="12" alt="" title="Old Password" />
                            </div>
                            <div class="input-label-info">
                                <p onClick={ this._togglePassword } title="oldPassword" className="togglepassword oldPassword">{ toggleOldPassword }</p>
                            </div>
                            <Input 
                              name="oldPassword"
                              className="form-input" 
                              placeholder="Old password" 
                              type={ oldPasswordType } 
                              value={ oldPassword }
                              textChange={ this._onFieldChange }
                              maxLength="26"
                            />
                            <span className="error">{ errorOldPassword ? errorOldPassword : '' }</span>
                        </div>

                        <div class="input-item">
                            <div class="input-label">
                                <img src={ ICONS.PADLOCK } width="12" alt="" title="New Password" />
                            </div>
                            <div class="input-label-info">
                                <p onClick={ this._togglePassword } title="newPassword" className="togglepassword">{ toggleNewPassword }</p>
                                <span tooltip="Password must contain at least 8 character, one lowercase letter, one uppercase letter, one number and one special character" flow="left">
                                    <img src={ ICONS.INFO } width="12" alt="" />
                                </span>
                            </div>
                            <Input 
                              name="newPassword"
                              className="form-input" 
                              placeholder="New password" 
                              type={ newPasswordType } 
                              value={ newPassword }
                              textChange={ this._onFieldChange }
                              maxLength="26"
                            />
                            <span className="error">{ errorPassword ? errorPassword : '' }</span>
                        </div>   
                        <div class="input-item">
                            <div class="input-label reset-mail-label">
                                <img src={ ICONS.PADLOCK } width="12" alt="" title="Confirm Password" />
                            </div>
                            <Input 
                              name="confirmPassword"
                              className="form-input" 
                              placeholder="Confirm password" 
                              value={ confirmPassword }  
                              type={ newPasswordType } 
                              textChange={ this._onFieldChange }
                              maxLength="26"
                            />
                            <span className="error">{ errorConfirmPassword ? errorConfirmPassword : '' }</span>
                        </div> 
                        <div className="btn-group-footer text-right">
                            <Button name="Cancel" className="btn-cancel" onClick={ this._navigateTo } />  
                            <Button name="Submit" className="btn-save" onClick={ this._submitForm }/>
                        </div>
                    </div>                        
               </div>
          </div>
        );
    }
}

export default ChangePasswordComponent;