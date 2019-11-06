import React, { Component } from 'react';
import FloatingLabel from 'floating-label-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { Button, Footer, LogoImage, Modal  } from '../common';
import { CUSTOMER, ASSOCIATE, ICONS, ASSOCIATE_TAB_MSG, CUSTOMER_TAB_MSG } from '../../constants';
import { registerValidation } from '../../utils/validations';

class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDropdown : false,
      fields: {
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        phone: '',
        alternativePhone: '',
        password: '',
        confirmPassword: '',
        userType: 'Customer'
      },
      errors: {},
      passwordType: 'password',
      isShowModal: false,
      isFormValid: true
    };
    this.customerClassName = 'customer active';
    this.associateClassName = 'associate';
    this.togglePassword = 'Show';
    this._onKeyPress = this._onKeyPress.bind();
  }

  _onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this._submitForm();
    }
  }

  _submitForm = () => {
    const formStatus =  this._checkValidation();
    if(formStatus) {
      this.props.submitForm(this.state.fields);
    }
  }

  _checkValidation = () => {
    const formStatus = registerValidation(this.state.fields);
    this.setState({
      errors: formStatus.errors,
      isFormValid: formStatus.status
    });
    return formStatus.status;
  };

  _tabsChange = tab => () => {
    let userType = '';
    let showModal = false;
    const fieldsObj = {};
    const { firstName, lastName, email, confirmEmail, phone, password } = this.state.fields;
    const { errorFirstName, errorLastName, errorEmail, errorConfirmEmail, errorPhone, errorPassword, errorConfirmPassword } = this.state.errors;
    if( firstName || lastName || email || confirmEmail || phone || password 
      || errorFirstName || errorLastName || errorEmail || errorConfirmEmail || errorPhone || errorPassword || errorConfirmPassword) {
      showModal = true;
    }
    else {
      showModal = false;
        let isShowDropdown = this._checkTab(tab);
        userType = isShowDropdown === true ? 'Associate' : 'Customer'; 
        fieldsObj.isShowDropdown = isShowDropdown;
        fieldsObj.fields = {
              userType
        };
    }
    if(showModal) {
      fieldsObj.isShowModal = true;
      fieldsObj.tab = tab;
    }
    this.setState(
      fieldsObj
    );
  };

  _checkTab = tabValue => {
    if(tabValue === ASSOCIATE) {
        this.customerClassName = 'customer';
        this.associateClassName = 'associate active';
        return true;
    } else {
        this.customerClassName = 'customer active';
        this.associateClassName = 'associate';
        return false;
    }
  }

  _onFieldChange = e => {
    let { value, name } = e.currentTarget;
    const { fields } = this.state;
    if(name === 'phone' || name === 'alternativePhone') {
      const onlyNums = e.target.value.replace(/[^0-9]/g, '');
      if (onlyNums.length < 10) {
          value = onlyNums;
      } else if (onlyNums.length === 10) {
          const number = onlyNums.replace(
          /(\d{3})(\d{3})(\d{4})/,
          '($1) $2-$3'
          );
          value = number;
      }
    }
    fields[name] = value;
    this.setState({
      fields,
      errors: {},
      isFormValid: true
    });
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

  _toggleModal = () => {
    this.setState({
      isShowModal: !this.state.isShowModal
    });
  }

  _confirmTabchange = () => {
    let isShowDropdown = this._checkTab(this.state.tab);
    let userType = isShowDropdown === true ? 'Associate' : 'Customer'; 
    this._toggleModal();
    this.setState(prevState => ({
      ...prevState,
      fields: {
        ...prevState.fields,
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        phone: '',
        alternativePhone: '',
        password: '',
        confirmPassword: '',
        userType
      },
      isShowDropdown,
      errors: {},
      isFormValid: true
    }));
  }

  render() {
    const { passwordType, isShowModal, isShowDropdown } = this.state;
    const { errorFirstName, errorLastName, errorEmail, errorConfirmEmail, errorPhone, errorPassword, errorConfirmPassword, errorAlternative } = this.state.errors;
    const { firstName, lastName, email, confirmEmail, phone, alternativePhone, password, confirmPassword } = this.state.fields;
    const modalBody = isShowDropdown ? CUSTOMER_TAB_MSG  : ASSOCIATE_TAB_MSG;
    const buttonMeta = [
      {
          name: 'Cancel',
          class: 'btn-cancel',
          onclick: this._toggleModal
      },
      {
          name: 'Ok',
          class: 'btn-save',
          onclick: this._confirmTabchange
      }
];
    return (
    <div className="wrapper-main register">
      <div className="container">
          <LogoImage className="register-logo"/>

          <div className="container-box">
                <div className={ this.customerClassName } onClick={ this._tabsChange(CUSTOMER) }> Customer </div>
                <div className={ this.associateClassName } onClick={ this._tabsChange(ASSOCIATE) }> Associate </div>
              <div class="input-item">
                  <div class="input-label">
                      <img src={ ICONS.USERINPUT } width="16" height="16" alt="" title="First Name" />
                  </div>
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="First Name*" 
                    type="text"
                    name="firstName" 
                    value={ firstName }
                    onChange={ this._onFieldChange }
                    onKeyPress={ this._onKeyPress }
                    maxLength="60"
                    autoComplete="none"
                  />
                  <span className="error">{ errorFirstName }</span>
                </div>
                <div class="input-item">
                    <div class="input-label">
                        <img src={ ICONS.USERINPUT } width="16" height="16" alt="" title="Last Name" />
                    </div>
                    <FloatingLabel 
                      className="form-input" 
                      placeholder="Last Name*" 
                      type="text" 
                      name="lastName"
                      value={ lastName }
                      onChange={ this._onFieldChange }
                      onKeyPress={ this._onKeyPress }
                      maxLength="60"
                      autoComplete="none"
                    />
                    <span className="error">{ errorLastName }</span>
                </div>
                <div class="input-item">
                  <div class="input-label">
                      <img src={ ICONS.MAIL } width="16" alt="" title="Email" />
                  </div>
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="Email*" 
                    type="email" 
                    name="email" 
                    value={ email }    
                    onChange={ this._onFieldChange }
                    onKeyPress={ this._onKeyPress }
                    required={ true }
                    maxLength="60"    
                    autoComplete="off"           
                  />
                  <span class="error">{ errorEmail }</span>  
                </div>
                <div class="input-item">
                    <div class="input-label">
                        <img src={ ICONS.MAIL } width="16" alt="" title="Confirm Email" />
                    </div>
                    <FloatingLabel 
                      className="form-input" 
                      placeholder="Confirm Email*" 
                      type="email" 
                      name="confirmEmail"
                      value={ confirmEmail }
                      onChange={ this._onFieldChange }
                      onKeyPress={ this._onKeyPress }
                      required={ true } 
                      maxLength="60"      
                      autoComplete="off"    
                    />
                    <span className="error">{ errorConfirmEmail }</span>
                </div>
                <div class="input-item phone-constant-wrapper">
                  <div class="input-label">
                      <img src={ ICONS.PHONE } width="16" alt="" title="Phone" />
                  </div>
                  <span className="phone-constant-register">+1</span>
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="Phone Number*" 
                    type="text" 
                    maxLength="10"
                    name="phone"
                    value={ phone }
                    onChange={ this._onFieldChange }
                    onKeyPress={ this._onKeyPress }
                    required={ true }
                    maxLength="10"
                    autoComplete="none"               
                  />
                  <span className="error">{ errorPhone }</span>
                </div>
                <div class="input-item phone-constant-wrapper">
                    <div class="input-label">
                        <img src={ ICONS.PHONE } width="16" alt="" title="Alternate phone" />
                    </div>
                    <span className="phone-constant-register">+1</span>
                    <FloatingLabel 
                      className="form-input" 
                      placeholder="Alternate Phone Number" 
                      type="text"  
                      name="alternativePhone"  
                      value={ alternativePhone }
                      onChange={ this._onFieldChange }
                      onKeyPress={ this._onKeyPress }
                      maxLength="10"
                      autoComplete="none"
                    />
                    <span className="error">{ errorAlternative }</span>
                </div>
                <div class="input-item">
                    <div class="input-label">
                        <img src={ ICONS.PADLOCK } width="16" height="20" alt="" title="Password" />
                    </div>
                    <div class="input-label-info">
                        <p onClick={ this._togglePassword } className="togglepassword">{ this.togglePassword }</p>
                        <span tooltip="Password must contain at least 8 character, one lowercase letter, one uppercase letter, one number and one special character" flow="left">
                            <img src={ ICONS.INFO } width="16" alt="" />
                        </span>
                    </div>
                    <FloatingLabel 
                      className="form-input" 
                      placeholder="Password*" 
                      type={ passwordType } 
                      name="password"
                      value={ password }
                      maxLength="30"
                      onChange={ this._onFieldChange }
                      onKeyPress={ this._onKeyPress }
                      autoComplete="off"
                    />
                    <span className="error">{ errorPassword }</span>
                </div>
                <div class="input-item">
                    <div class="input-label">
                        <img src={ ICONS.PADLOCK } width="15" height="20" alt="" title="Confirm Password" />
                    </div>
                    <FloatingLabel 
                      className="form-input" 
                      placeholder="Confirm Password*" 
                      type={ passwordType } 
                      name="confirmPassword"
                      value={ confirmPassword }
                      maxLength="30"
                      onChange={ this._onFieldChange }
                      onKeyPress={ this._onKeyPress }
                      autoComplete="off"
                    />
                    <span className="error">{ errorConfirmPassword }</span>
                </div>
                
                <div className="input-item already-register">
                      <p><span>Already Registered?</span><NavLink to='/login'>Log In</NavLink></p>
                </div>
                <div className="btn-group-footer">
                    <Button name="Register" className="button-register" onClick={ this._submitForm }/>
                </div>

          </div>
          <Modal 
            title="Confirmation" 
            isShowModal={ isShowModal }
            modalBody={ modalBody }   
            closeModal={ this._toggleModal }
            buttons={ buttonMeta }
          />

      </div>
      <Footer />
    </div>
    );
  }
}

RegisterComponent.propTypes = {
  submitFormData: PropTypes.func
};
 
export default RegisterComponent;
