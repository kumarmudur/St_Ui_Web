import React, { Component } from 'react';
import FloatingLabel from 'floating-label-react';
import { Button, Radio } from '../common';
import { associateFormValidation, contactPersonValidation } from '../../utils/validations';
import { ICONS } from '../../constants';

class EditAssociateProfileComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fields: this.getInitialstate(props),
        successMessage: '',
        errors: {},
        errorsContactPersons: {},
        isFormValid: true,
        contactName: '',
        contactEmail: '',
        contactPhone: ''
      };
    }

    getInitialstate = () => {
      const obj = {
          firstName:        '',
          lastName:         '',
          phone:            '',
          email:            '',
          companyName:      '',
          companyEin:       '', 
          companyRegistrationState: '',
          houseBuilding:    '',
          street:           '',
          zipCode:          '',
          city:             '',
          county:           '',
          country:          '',
          state:            '',
          contactPersons:   []
        };
      return obj;
    }

    componentWillReceiveProps(nextProps) {
      let obj = {};
      if(nextProps && nextProps.userData) {
        obj = {
          registerId:       nextProps.userData.registerId,
          firstName:        nextProps.userData.firstName || '',
          lastName:         nextProps.userData.lastName || '',
          phone:            nextProps.userData.phone || '',
          email:            nextProps.userData.email || '',
          companyName:      nextProps.userData.companyName || '',
          companyEin:       nextProps.userData.companyEin || '',
          companyRegistrationState: nextProps.userData.companyRegistrationState || '',
          houseBuilding:    nextProps.userData.houseBuilding || '',
          street:           nextProps.userData.street || '',
          zipCode:          nextProps.userData.zipCode || '',
          city:             nextProps.userData.city || '',
          county:           nextProps.userData.county || '',
          country:          nextProps.userData.country || '',
          state:            nextProps.userData.state || '',
          contactPersons:   nextProps.userData.contactPersons || []
        };
      } 
      this.setState({
        successMessage: nextProps.formSuccessMessage,
        fields: obj
      });
    }

    _checkContactPersonValidation = type => {
      let formStatus = '';
      if(type === 'main') {
        const { contactEmail, contactPhone } = this.state;
        formStatus = contactPersonValidation( { contactEmail, contactPhone, type });
      }
      else {
        const { contactPersons } = this.state.fields;
        formStatus = contactPersonValidation( { contactPersons, type });
      }
      this.setState({
        errorsContactPersons: formStatus.errors,
        isFormValid: formStatus.formIsValid
      });
      return formStatus.status;
    };

    _addContactPerson = () => {
      const { contactName, contactEmail, contactPhone } = this.state;
      const status = this._checkContactPersonValidation('main');
      if(status) {
          let { fields } = this.state;
          const { contactPersons } = fields;
          if(contactName) {
              const isOnTheList = contactPersons.some(list => list.contactName === contactName);
              if(!isOnTheList) {
                  const contactPersonsFields = contactPersons.concat([ { name: contactName, email: contactEmail, phone: contactPhone }]);
                  fields.contactPersons = contactPersonsFields;
                  this.setState({
                      fields,
                      contactName: '',
                      contactEmail: '',
                      contactPhone:''
                  });
              }
          }
      }
    }

    _deleteContactPerson = e => {
        let { fields } = this.state;
        const { contactPersons } = fields;
        const { id } = e.currentTarget;
        const filteredData = contactPersons.filter((s, index) => parseInt(id) !== index);
        fields.contactPersons = filteredData;
        this.setState({
            fields
        });
    }

    _onContactPersonChange = e => {
      let { value, name } = e.currentTarget;
      if(name === 'contactPhone') {
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
      this.setState({
          [name]: value,
          errorsContactPersons: {}
      });
    }
  
    _submitForm = () => {
      let status = this._checkValidation();
      const contactPersonStatus = this._checkContactPersonValidation('sub');
      if(status && contactPersonStatus) {
          this.props.submitForm(this.state.fields);
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
      const formStatus = associateFormValidation(fields, 'profile');
      this.setState({
        errors: formStatus.errors,
        isFormValid: formStatus.formIsValid
      });
      return formStatus.status;
    };

    _onFieldChange = e => {
      let { value, name } = e.currentTarget;
      let indexValue = name && name.split('-');
      let fieldName = indexValue && indexValue[0];
      let index = indexValue && indexValue[1];
      
      let { fields } = this.state;
      const { contactPersons } = fields;
      if(name.includes('phone-') === true || name === 'zipCode') {
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
      if(name.includes('-') === false) {
        fields[name] = value;
      }
      index = parseInt(index);
      contactPersons && contactPersons.map((item, i) => {
          if(i === index) {
              item[fieldName] = value;
          }
      });
      fields.contactPersons = contactPersons;
      this.setState({
          fields,
          errors: {},
          errorsContactPersons: {}
      });
    }

    render() {
      const { firstName, lastName, phone, email, companyName, companyEin, companyRegistrationState, houseBuilding, street, zipCode, city, county, country, state, contactPersons  } = this.state.fields;
      const { errorFirstName, errorLastName, errorHouseBuilding, errorStreet, errorZipcode, errorCity, errorCounty, errorCountry, errorState,
        errorCompanyEin, errorCompanyName, errorRegistrationState } = this.state.errors;
        const { contactName, contactEmail, contactPhone } = this.state;
        const { errorContactEmail, errorContactPhone } = this.state.errorsContactPersons;
        const { errorsContactPersons } = this.state;   
        const contactPersonFields = contactPersons && contactPersons.map((item, index) => (
          <div className="row">
              <div className="cols">
                  <span className="input-wrapper">
                      <FloatingLabel 
                        key={ index }
                        className="form-input" 
                        placeholder="Name"
                        type="text" 
                        name={ `name-${ index }` }
                        value={ item.name }
                        maxLength="60"   
                        onChange={ this._onFieldChange }
                      />
                  </span>
              </div>
              <div className="cols">
                  <span className="input-wrapper">
                      <FloatingLabel 
                        key={ index }
                        className="form-input" 
                        placeholder="Email"
                        type="text" 
                        name={ `email-${ index }` }
                        value={ item.email } 
                        maxLength="60"  
                        onChange={ this._onFieldChange }
                      />
                      <div className="error">{ errorsContactPersons[`errorEmail-${ index }`] }</div>
                  </span>
              </div>
              <div className="cols">
                    <span className="phone-constant phone-field-style">+1</span>
                    <span className="input-wrapper phone-prefix">
                      <FloatingLabel 
                        key={ index }
                        className="form-input"
                        placeholder="Phone" 
                        type="text" 
                        name={ `phone-${ index }` }
                        value={ item.phone } 
                        maxLength="10"  
                        onChange={ this._onFieldChange }
                      />
                      <div className="error">{ errorsContactPersons[`errorPhone-${ index }`] }</div>
                  </span>
              </div>
              <div className="cols list-item-delete">
                  <div className="input-label">
                      <img className="delete" id={ index } src={ ICONS.DELETE } width="20" title="delete" onClick={ this._deleteContactPerson }/>
                  </div>
              </div>
          </div>
        ));

        return (
            <div className="content edit-profile">
                <div className="row">
                    <div className="text-alignment field-padding border-separator clear-margin">
                        <div className="heading-tabs">General Info</div>
                        <div className="clear"></div>
                    </div>
                </div>  
                <div className="row border-separator">  
                    <div className="cols customWidth">
                        <div className="row general-info-data">
                            <div className="cols col1-width">
                                <span className="input-wrapper">
                                    <FloatingLabel 
                                      className="form-input" 
                                      placeholder="First Name*" 
                                      type="text" 
                                      name="firstName"
                                      value={ firstName }
                                      onChange={ this._onFieldChange }
                                      maxLength="60"
                                    />
                                    <div className="error">{ errorFirstName }</div>
                                </span>
                            </div>
                            <div className="cols col1-width">
                                <span className="input-wrapper">
                                    <FloatingLabel 
                                      className="form-input" 
                                      placeholder="Last Name*" 
                                      type="text" 
                                      name="lastName"
                                      value={ lastName }
                                      onChange={ this._onFieldChange }
                                      maxLength="60"
                                    />
                                    <div className="error">{ errorLastName }</div>
                                </span>
                            </div>
                            <div className="cols col2-width readonly-field-spacing">
                              <div className="user-info-edit-page">
                                <span className="form-label">Email</span> <span className="form-label-text">{ email }</span>
                              </div>
                            </div>
                            <div className="cols col1-width readonly-field-spacing">
                              <div className="user-info-edit-page">
                                <span className="form-label">Mobile</span> <span className="form-label-text"><span className="phone-constant-readonly">+1</span>{ phone }</span>
                              </div>
                            </div>
                        </div>
                    </div>  
              </div>  
              <div className="row">
                    <div className='radio-btn-group'>
                        <Radio type='radio' value='Company' checked='true' name='company' /><span>Company</span>
                        <Radio type='radio' value='Vendor' name='company'/><span>Vendor</span>
                    </div>
              </div>

              <div className="row border-separator">
                    <div className="cols">
                        <span className="input-wrapper">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="Company Name*" 
                              type="text" 
                              name="companyName"
                              value={ companyName }
                              onChange={ this._onFieldChange }
                              maxLength="60"
                            />
                            <div className="error">{ errorCompanyName }</div>
                        </span>
              </div>
              <div className="cols">
                        <span className="input-wrapper">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="Company EIN / SSN*" 
                              type="text" 
                              name="companyEin"
                              value={ companyEin }
                              onChange={ this._onFieldChange }
                              maxLength="9"
                            />
                            <div className="error">{ errorCompanyEin }</div>
                        </span>
              </div>
              <div className="cols">
                        <span className="input-wrapper">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="Company Registration State*" 
                              type="text" 
                              name="companyRegistrationState"
                              value={ companyRegistrationState }
                              onChange={ this._onFieldChange }
                              maxLength="30"
                            />
                            <div className="error">{ errorRegistrationState }</div>
                        </span>
                    </div>
              </div>

              <div className="row">
                    <div className="heading-viewProfile">
                        <p>Address</p>
                    </div>
              </div>
              <div className="row">
                    <div className="cols">
                        <span className="input-wrapper">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="Address 1*" 
                              type="text" 
                              name="houseBuilding"
                              value={ houseBuilding }
                              onChange={ this._onFieldChange }
                              maxLength="60"
                            />
                            <div className="error">{ errorHouseBuilding }</div>
                        </span>
                    </div>
                    <div className="cols">
                        <span className="input-wrapper">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="Address 2*" 
                              type="text" 
                              name="street"
                              value={ street }
                              onChange={ this._onFieldChange }
                              maxLength="30"
                            />
                            <div className="error">{ errorStreet }</div>
                        </span>
                    </div>
                    <div className="cols">
                        <span className="input-wrapper">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="Zip code*" 
                              type="text" 
                              name="zipCode"  
                              value={ zipCode }  
                              onChange={ this._onFieldChange }
                              maxLength="5"
                            />
                            <div className="error">{ errorZipcode }</div>
                        </span>
                    </div>
                    <div className="cols">
                        <span className="input-wrapper">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="City*" 
                              type="text" 
                              name="city"
                              value={ city }
                              onChange={ this._onFieldChange }
                              maxLength="30"
                            />
                            <div className="error">{ errorCity }</div>
                        </span>
                    </div>
              </div>
              <div className="row border-separator">
                    <div className="cols">
                        <span className="input-wrapper">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="County*" 
                              type="text" 
                              name="county"    
                              value={ county }
                              onChange={ this._onFieldChange }
                              maxLength="30"
                            />
                            <div className="error">{ errorCounty }</div>
                        </span>
                    </div>
                    <div className="cols">
                        <span className="input-wrapper">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="State*" 
                              type="text" 
                              name="state"
                              value={ state }
                              onChange={ this._onFieldChange }
                              maxLength="30"
                            />
                            <div className="error">{ errorState }</div>
                        </span>
                    </div>
                    <div className="cols">
                        <span className="input-wrapper">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="Country*" 
                              type="text" 
                              name="country" 
                              value={ country }   
                              onChange={ this._onFieldChange }
                              maxLength="30"
                            />
                            <div className="error">{ errorCountry }</div>
                        </span>
                    </div>
              </div>

              <div className="row">
                    <div className="heading-viewProfile">
                        <p>Contact Person <span className="form-label align-middle"></span></p>
                    </div>
                </div>
                <div className="row">
                    <div className="cols">
                        <span className="input-wrapper">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="Name" 
                              type="text" 
                              name="contactName"
                              value={ contactName }   
                              onChange={ this._onContactPersonChange }
                              maxLength="60"
                            />
                        </span>
                    </div>
                    <div className="cols">
                        <span className="input-wrapper">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="Email" 
                              type="text" 
                              name="contactEmail"
                              value={ contactEmail }   
                              onChange={ this._onContactPersonChange }
                              maxLength="60"
                            />
                            <div className="error">{ errorContactEmail }</div>
                        </span>
                    </div>
                    <div className="cols">
                        <span className="phone-constant phone-field-style">+1</span>
                        <span className="input-wrapper phone-prefix">
                            <FloatingLabel 
                              className="form-input" 
                              placeholder="Phone" 
                              type="text" 
                              name="contactPhone"
                              value={ contactPhone }
                              maxLength="10"   
                              onChange={ this._onContactPersonChange }
                            />
                            <div className="error">{ errorContactPhone }</div>
                        </span>
                    </div>
                    <div className="cols add-contact-person">
                        <Button name="Add" type="button" className="btn-footer-submit" onClick={ this._addContactPerson }/>
                    </div>
                </div>
                <div className="border-separator">
                    { contactPersonFields }
                </div>

                <div className="row">
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
        );
    }
}

export default EditAssociateProfileComponent;