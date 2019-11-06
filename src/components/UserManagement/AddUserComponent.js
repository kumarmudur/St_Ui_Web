import React, { Component } from 'react';
import FloatingLabel from 'floating-label-react';
import { Button, DropdownBox } from '../common';
import { addUserValidation } from '../../utils/validations';
import { ICONS } from '../../constants';

class AddUserComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fields: this.getInitialstate(props),
        successMessage: '',
        errors: {},
        isFormValid: true,
        userTypeListoptions: [],
        roleListOptions: [],
        officeListOptions: [],
        departmentListOptions: [],
        selectedOffice: '',
        showUserTypeLabel : false,
        showRoleLabel: false,
        showOfficeLabel: false,
        showDepartmentLabel: false
      };
      this.contentEditFlag = false;
    }

    getInitialstate = state => {
      const obj = {
          firstName:        state.firstName || '',
          lastName:         state.lastName || '',
          phone:            state.phone || '',
          alternativePhone: state.alternativePhone || '',
          email:            state.email || '',
          userType:         state.userType || '',
          role:             state.role || '',
          houseBuilding:    state.houseBuilding || '',
          street:           state.street || '',
          zipCode:          state.zipCode || '',
          city:             state.city || '',
          county:           state.county || '',
          country:          state.country || '',
          state:            state.state || '',
          officeId:         state.officeId || '',
          office:           state.office || '',
          department:       state.department || ''
        };
      return obj;
    }

    componentWillReceiveProps(nextProps) {
      let obj = {};
      let selectedOffice = '';
      let { showUserTypeLabel, showRoleLabel, showOfficeLabel, showDepartmentLabel } = this.state;
      if(nextProps && nextProps.userData && this.contentEditFlag === false) {
        const { registerId, firstName, lastName, phone, alternativePhone, email, userType, role, houseBuilding, street,
          zipCode, city, county, country, state, officeId, office, department } = nextProps.userData;
        obj = {
          registerId:       registerId,
          firstName:        firstName || '',
          lastName:         lastName || '',
          phone:            phone || '',
          alternativePhone: alternativePhone || '',
          email:            email || '',
          userType:         userType || '',
          role:             role || '',
          houseBuilding:    houseBuilding || '',
          street:           street || '',
          zipCode:          zipCode || '',
          city:             city || '',
          county:           county || '',
          country:          country || '',
          state:            state || '',
          officeId:         officeId || '',
          office:           office || '',
          department:       department || ''
        };
        if(officeId) {
          selectedOffice = `${officeId}-${office}`;
        }
        showUserTypeLabel = userType ? true : false;
        showRoleLabel = role ? true : false;
        showOfficeLabel = officeId ? true : false;
        showDepartmentLabel = department ? true : false;
      }
      else {
        obj = this.getInitialstate(this.state.fields);
      }
      
      this.setState({
        successMessage: nextProps.formSuccessMessage,
        fields: obj,
        userTypeListoptions: nextProps.userTypeList || [],
        roleListOptions: nextProps.roleList || [],
        officeListOptions: nextProps.officeList || [],
        departmentListOptions: nextProps.departmentList || [],
        selectedOffice,
        showUserTypeLabel, 
        showRoleLabel, 
        showOfficeLabel, 
        showDepartmentLabel
      });
    }

    _submitForm = () => {
      let status = this._checkValidation();
      const registerId = this.props && this.props.userData && this.props.userData.registerId ? this.props.userData.registerId : null;
      if(status) {
        const dataObj = this.state.fields;
        if(registerId) {
          dataObj.registerId = registerId;
        }
        this.props.submitForm(dataObj);
      }
      if(this.state.successMessage) {
        this.setState({
          fields: this.getInitialstate()
        });
    }
  }

    _cancelFrom = () => {
      this.props.cancelForm();
    }

    _checkValidation = () => {
      const { fields } = this.state;
      const formStatus = addUserValidation(fields);
      this.setState({
        errors: formStatus.errors,
        isFormValid: formStatus.formIsValid
      });
      return formStatus.status;
    };

    _onFieldChange = e => {
      let { value, name } = e.currentTarget;
      if(name === 'phone' || name === 'alternativePhone' || name === 'zipCode' ) {
        const onlyNums = value.replace(/[^0-9]/g, '');
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
      this.setState(prevState => ({
          ...prevState,
          fields: {
              ...prevState.fields,
              [name]: value
          },
          errors: {}
      }));
    }

    _onChangeSelectDropDown = () => {
      this.props.getUserTypes();
    }

    _onChangeSelectUserType = value => {
      this.setState({
        showUserTypeLabel: true
      });
      this._changeSelectValue(value, 'userType');
    }

    _onChangeSelectRole = value => {
      this.setState({
        showRoleLabel: true
      });
      this._changeSelectValue(value, 'role');
    }

    _onChangeSelectOffice = value => {
      const { pageMode } = this.props;
      if(value) {
        this.contentEditFlag = true;
        const selectedValue = value;
        const indexValue = selectedValue && selectedValue.value.split('-');
        const officeId = indexValue && indexValue[0];
        this._changeSelectValue(selectedValue, 'office');
        this.props.getSelectedOffice(officeId);
        this.setState({
          showOfficeLabel: true
        });
        if(pageMode ==='edit_mode') {
          const { officeId, office } = this.state.fields;
          let selectedOffice = '';
          if(officeId) {
            selectedOffice = `${officeId}-${office}`;
          }
          const obj = this.getInitialstate(this.state.fields);
          this.setState({
            fields: obj,
            selectedOffice
          });
        }
      }
    }

    _onChangeSelectDepartment = value => {
      this.setState({
        showDepartmentLabel: true
      });
      this._changeSelectValue(value, 'department');
    }

    _changeSelectValue = (value, fieldName) => {
      let { fields } = this.state;
      const selectedValue = value;
      if(fieldName === 'office') {
        const indexValue = selectedValue && selectedValue.value.split('-');
        const officeId = indexValue && indexValue[0];
        const officeName = indexValue && indexValue[1];
        fields['officeId'] = officeId;
        fields[fieldName] = officeName;
      }
      else {
        fields[fieldName] = selectedValue.value;
      }
      this.setState({
        fields
      });
    };

    render() {
      const { firstName, lastName, phone, email, alternativePhone, houseBuilding, street, zipCode, city, county, country, state, userType, role, office, officeId, department  } = this.state.fields;
      const { errorFirstName, errorLastName, errorEmail, errorPhone, errorAlternative, errorHouseBuilding, errorStreet, errorZipcode, errorCity, errorCounty, errorCountry, errorState, errorUserType, errorRole, errorOffice, errorDepartment } = this.state.errors;
      const { userTypeListoptions, roleListOptions, officeListOptions, departmentListOptions } = this.state;
      let { selectedOffice, showUserTypeLabel, showRoleLabel, showOfficeLabel, showDepartmentLabel } = this.state;
      const roleList = roleListOptions && roleListOptions.map(role => {
        return {
          label: role.value,
          value: role.value
        };
      });

      const officeList = officeListOptions && officeListOptions.map(office => {
        return {
            label: office.value,
            value: `${office.id}-${office.value}`
        };
      });
      
      const departmentList = departmentListOptions && departmentListOptions.map(department => {
        return {
            label: department.value,
            value: department.value
        };
      });
      if(office && officeId) {
        selectedOffice = `${officeId}-${office}`;
      }
        return (
            <div className="container">
                <div className="content bg-content">
                    <div className="wrapper-adduser">
                        {/* <div className="container-header" >
                          { !this.props.id && <p>Add User</p> }
                          { this.props.id && <p>Edit User</p> }
                        </div> */}
                        <div className="clear"></div>
                        <div class="row">
                          <span className="input-wrapper">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="First Name*" 
                              type="text" 
                              name="firstName"
                              value={ firstName }
                              onChange={ this._onFieldChange }
                              maxLength="30"
                              autoComplete="none"
                            />
                            <div className="error">{ errorFirstName ? errorFirstName : '' }</div>
                          </span>
                          <span className="input-wrapper">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="Last Name*" 
                              type="text" 
                              name="lastName"
                              value={ lastName }
                              onChange={ this._onFieldChange }
                              maxLength="30"
                              autoComplete="none"
                            />
                            <div className="error">{ errorLastName ? errorLastName : '' }</div>
                          </span>
                          <span className="input-wrapper phone-prefix">
                            <span className="phone-constant">+1</span>
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="Phone Number*" 
                              type="text" 
                              name="phone"
                              maxLength="10"
                              value= { phone } 
                              onChange={ this._onFieldChange }
                              autoComplete="none"
                            />
                            <div className="error">{ errorPhone ? errorPhone : '' }</div>
                          </span>
                        </div> 
                        <div class="row">
                          <span className="input-wrapper phone-prefix">
                            <span className="phone-constant">+1</span>
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="Alternate Phone Number" 
                              type="text" 
                              name="alternativePhone"
                              maxLength="10"
                              value={ alternativePhone }
                              onChange={ this._onFieldChange }
                              autoComplete="none"
                            />
                            <div className="error">{ errorAlternative ? errorAlternative : '' }</div>
                          </span>
                          <span className="input-wrapper email-top">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="Email*" 
                              type="email" 
                              name="email"
                              value= { email } 
                              onChange={ this._onFieldChange }
                              maxLength="60"
                              autoComplete="off"
                            />
                            <div className="error">{ errorEmail ? errorEmail : '' }</div>
                          </span>
                          <div className="dropdown-userType" onClick = { this._onChangeSelectDropDown }>
                            {
                              showUserTypeLabel ? <label for="label" className="float-label">User Type*</label> : ''
                            }
                            <DropdownBox 
                              placeholder="User Type*"
                              name="userType"
                              options = { userTypeListoptions ? userTypeListoptions : [] }
                              onChangeSelect= { this._onChangeSelectUserType }
                              selectedValue={ userType }
                            />
                            <div className="error">{ errorUserType ? errorUserType : '' }</div>
                          </div>
                        </div> 
                        <div class="row">
                        <div className="dropdown-userRole">
                            {
                              showRoleLabel ? <label for="label" className="float-label">Role*</label> : ''
                            }
                            <DropdownBox 
                              placeholder="Role*"                           
                              name="role"
                              options = { roleList ? roleList : [] }
                              onChangeSelect= { this._onChangeSelectRole }
                              selectedValue={ role }
                            />
                            <div className="error">{ errorRole ? errorRole : '' }</div>
                          </div>
                          <div className="clear-float"></div>
                        </div>
                        <p className="address"><img className="image-margin" src={ ICONS.ADDRESS } width="20" height="20" alt="" /> Address</p>
                        <div class="row">
                          <span className="input-wrapper">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="Address 1*" 
                              type="text" 
                              name="houseBuilding"
                              value={ houseBuilding }
                              onChange={ this._onFieldChange }
                              maxLength="60"
                              autoComplete="off"
                            />
                            <div className="error">{ errorHouseBuilding ? errorHouseBuilding : '' }</div>
                          </span>
                          <span className="input-wrapper">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="Address 2*" 
                              type="text" 
                              name="street"
                              value={ street }
                              onChange={ this._onFieldChange }
                              maxLength="30"
                              autoComplete="none"
                            />
                            <div className="error">{ errorStreet ? errorStreet : '' }</div>
                          </span>
                          <span className="input-wrapper">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="Zip Code*" 
                              type="text" 
                              name="zipCode"  
                              value={ zipCode }  
                              onChange={ this._onFieldChange }
                              maxLength="5"
                              autoComplete="none"
                            />
                            <div className="error">{ errorZipcode ? errorZipcode : '' }</div>
                          </span>
                        </div> 
                        <div class="row">
                          <span className="input-wrapper">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="City*" 
                              type="text" 
                              name="city"
                              value={ city }
                              onChange={ this._onFieldChange }
                              maxLength="30"
                              autoComplete="none"
                            />
                            <div className="error">{ errorCity ? errorCity : '' }</div>
                          </span>
                          <span className="input-wrapper">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="County*" 
                              type="text" 
                              name="county"    
                              value={ county }
                              onChange={ this._onFieldChange }
                              maxLength="30"
                              autoComplete="none"
                            />
                            <div className="error">{ errorCounty ? errorCounty : '' }</div>
                          </span>
                          <span className="input-wrapper">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="State*" 
                              type="text" 
                              name="state"
                              value={ state }
                              onChange={ this._onFieldChange }
                              maxLength="30"
                              autoComplete="none"
                            />
                            <div className="error">{ errorState ? errorState : '' }</div>
                          </span>
                        </div> 
                        <div class="row">
                          <span className="input-wrapper">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="Country*" 
                              type="text" 
                              name="country" 
                              value={ country }   
                              onChange={ this._onFieldChange }
                              maxLength="30"
                              autoComplete="none"
                            />
                            <div className="error">{ errorCountry ? errorCountry : '' }</div>
                          </span>
                        </div> 
                      
                        <p className="address"><img className="image-margin" src={ ICONS.PIN } width="20" height="20" alt="" /> Select Office & Department</p>
                        <div className="row">
                          <div className="input-dropdown">
                            <div className="dropdown-office">
                              {
                                showOfficeLabel ? <label for="label" className="float-label">Office*</label> : ''
                              }
                              <DropdownBox 
                                placeholder="Office*"
                                name="office"
                                options = { officeList ? officeList : [] }
                                onChangeSelect= { this._onChangeSelectOffice }
                                selectedValue={ selectedOffice }
                              />
                              <div className="error">{ errorOffice ? errorOffice : '' }</div>
                            </div>
                            <div className="dropdown-department">
                              {
                                showDepartmentLabel ? <label for="label" className="float-label">Department*</label> : ''
                              }
                              <DropdownBox 
                                placeholder="Department*"
                                name="department"
                                options={ departmentList ? departmentList : [] }
                                onChangeSelect= { this._onChangeSelectDepartment }
                                selectedValue={ department }
                              />
                              <div className="error">{ errorDepartment ? errorDepartment : '' }</div>
                            </div>
                          </div>
                        </div>
                        <div className="btn-group-footer"> 
                          <Button name="Cancel" type="button" className="btn-cancel" onClick={ this._cancelFrom }/>
                          <Button 
                            name="Save" 
                            type="button" 
                            className="btn-save"
                            onClick={ this._submitForm }
                          /> 
                        </div>
                    </div>
                </div>  
            </div>
        );
    }
}

export default AddUserComponent;