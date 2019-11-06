import React, { Component } from 'react';
import { Input, Button, Radio } from '../../common';
import { supplierValidation, contactSupplierValidation } from '../../../utils/InventoryManagement/validations';
import { ICONS } from '../../../constants';
import { checkAlphanumeric, checkAlphabets, checkNumeric } from '../../../utils/utility';
import FloatingLabel from 'floating-label-react';

class SupplierComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: this._getInitialState(),
            errors: {},
            contactName: '',
            contactEmail: '',
            contactPhone: '',
            isPrimaryContact: false,
            errorsContactSupplier: {},
            showPhoneLabel: false
        };
    }

    _getInitialState = data => {
        const obj = {
            organizationName: data && data.organizationName || '',
            supplierNo: data && data.supplierNo || '',
            registrationNo: data && data.registrationNo || '',
            taxPayerId: data && data.taxPayerId || '',
            houseNo: data && data.houseNo || '',
            street: data && data.street || '',
            city: data && data.city || '',
            state: data && data.state || '',
            country: data && data.country || '',
            county: data && data.county || '',
            zipCode: data && data.zipCode || '',
            contacts: data && data.contacts || []
        };
        return obj;
    }

    componentWillReceiveProps(nextProps) {
      let obj = {};
      if(nextProps && nextProps.id && nextProps.supplierData) {
        const { supplierData } = nextProps;
        obj = {
          organizationName: supplierData.organizationName || '',
          supplierNo: supplierData.supplierNo || '',
          registrationNo: supplierData.registrationNo || '',
          taxPayerId: supplierData.taxPayerId || '',
          active: supplierData.active || '',
          status: supplierData.status || '',
          houseNo: supplierData.houseNo || '',
          street: supplierData.street || '',
          zipCode: supplierData.zipCode || '',
          city: supplierData.city || '',
          county: supplierData.county || '',
          state: supplierData.state || '',
          country: supplierData.country || '',
          contacts: supplierData.contacts || ''
        };
      } else {
        obj = this._getInitialState(this.state.fields);
      }
      this.setState({
        fields: obj,
      });
    }

    _onFieldChange = e => {
        const { value, name } = e.target;
        const { fields } = this.state;
        fields[name] = value;
        this.setState({
          fields,
          errors: {}
        });
    }

    _onFieldChange = (value, name, type) => {
      const { fields } = this.state;
      if(value && type(value)) {
        fields[name] = value;
      } else {
        if(!value) {
          fields[name] = value;
        }
      }
      this.setState({
        fields,
        errors: {}
      });
    }
  
    _onFieldChangeNumeric = e => {
      const { value, name } = e.currentTarget;
      this._onFieldChange(value, name, checkNumeric);
    }
  
    _onFieldChangeAlphaNumeric = e => {
      const { value, name } = e.target;
      this._onFieldChange(value, name, checkAlphanumeric);
    }
  

    _cancelFrom = () => {
        this.props.cancelForm();
    }

    _submitForm = () => {
      let status = this._checkValidation();
      if(status) {
        this.props.submitForm(this.state.fields); 
      }
    }

    _checkValidation = () => {
      const { fields } = this.state;
      const formStatus = supplierValidation(fields);
      this.setState({
        errors: formStatus.errors,
        isFormValid: formStatus.formIsValid
      });
      return formStatus.status;
    }

    _addContact = () => {
      const { contactName, contactEmail, contactPhone, isPrimaryContact, fields } = this.state;
      const { contacts } = fields;
      let status = this._checkContactSupplierValidation();
      if(status) {
        const isOnTheList = contacts.some(list => list.conactPerson === contactName);
        if(isPrimaryContact) {
          fields.contacts && fields.contacts.map(contact => {
            return contact.isPrimary = false;
          });
        }
        if(!isOnTheList) {
            const contactPersonsFields = contacts.concat([ { conactPerson: contactName, contactEmail: contactEmail, phone: contactPhone, isPrimary: isPrimaryContact }]);
            fields.contacts = contactPersonsFields;
            this.setState({
                fields,
                contactName: '',
                contactEmail: '',
                contactPhone:'',
                isPrimaryContact: false,
                showPhoneLabel: false
            });
        }
    }
  }

  _checkContactSupplierValidation = () => {
    const { contactName, contactEmail, contactPhone } = this.state;
    const dataObj = {
       contactName,
       contactEmail,
       contactPhone
    };
    const formStatus = contactSupplierValidation(dataObj);
    this.setState({
      errorsContactSupplier: formStatus.errors
    });
    return formStatus.status;
  }

  _onFieldContactChange = e => {
    let { name } = e.target;
    const target = e.target;
    const value = target.type === 'radio' ? target.checked : target.value;
   this.setState({
       [name]: value,
       errorsContactSupplier: {}
    });
  }

  _onFieldContactNameChange = e => {
   let { name, value } = e.target;
   const { contactName } = this.state;
   let nameValue = contactName ? contactName : '';
   if(name === 'contactName') {
     if(value && checkAlphabets(value)) {
       nameValue = value;
     } else {
       if(!value) {
        nameValue = value;
       }
     }
  } 
  this.setState({
      [name]: nameValue,
      errorsContactSupplier: {}
   });
 }

 _onFieldContactPhoneChange = e => {
  let { value, name } = e.currentTarget;
  let { showPhoneLabel } = this.state;
  if(value) {
    showPhoneLabel = true;
    if(name === 'contactPhone') {
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
  } else {
    showPhoneLabel = false;
  }
  this.setState({
    [name]: value,
    showPhoneLabel,
    errorsContactSupplier: {}
  });
}

 _deleteContactPerson = e => {
  let { fields } = this.state;
  const { contacts } = fields;
  const { id } = e.currentTarget;
  const filteredData = contacts.filter((s, index) => parseInt(id) !== index);
  fields.contacts = filteredData;
  this.setState({
      fields
  });
}

_clearContactForm = () => {
  this.setState({
    contactName: '',
    contactEmail: '',
    contactPhone:'',
    isPrimaryContact: false,
    errorsContactSupplier: {},
    showPhoneLabel: false
  });
}

_onFieldChangeContactList = e => {
  let { value, name, type, checked } = e.currentTarget;
  let indexValue = name && name.split('-');
  let fieldName = indexValue && indexValue[0];
  let index = indexValue && indexValue[1];
  value = type === 'radio' ? checked : value;
  let { fields } = this.state;
  const { contacts } = fields;
  fields[name] = value;
  index = parseInt(index);
  contacts && contacts.map((item, i) => {
      if(i === index) {
         if(fieldName === 'phone') {
          const onlyNums = value.replace(/[^0-9]/g, '');
           if(value.length === 10) {
            const number = onlyNums.replace(
              /(\d{3})(\d{3})(\d{4})/,
              '($1) $2-$3'
              );
              value = number;
           } else {
            value = onlyNums;
           }
           item[fieldName] = value;
         } 
         item[fieldName] = value;
      } else {
        if(fieldName === 'isPrimary') {
          item['isPrimary'] = false;
        }
      }
  });  
  fields.contacts = contacts;
  this.setState({
      fields,
      errors: {}
  });
}

    render() {
      const { organizationName, supplierNo, registrationNo, taxPayerId, houseNo, street, city, country, county, state, zipCode, contacts } = this.state.fields;
      const { errorOrganizationName, errorSupplierNo, errorRegistrationNo } = this.state.errors;
      const { errorContactName, errorContactEmail, errorContactPhone } = this.state.errorsContactSupplier;
      const { contactName, contactEmail, contactPhone, isPrimaryContact, showPhoneLabel } = this.state;
      const contactPersonFields = contacts && contacts.map((item, index) => (
        <div className="main-contactdiv">
          <div className="row contact-list">
              <span className="wrapper">
                <span className="form-label">Contact Person*</span> <br />
                  <Input 
                    key={ index }
                    className="form-input" 
                    type="text" 
                    name={ `conactPerson-${ index }` }
                    value={ item.conactPerson }   
                    maxLength={ 25 }
                    textChange={ this._onFieldChangeContactList }
                  />
              </span>
              <span className="wrapper">
               <span className="form-label">Contact Email</span> <br />
                  <Input 
                    key={ index }
                    className="form-input" 
                    type="text" 
                    name={ `contactEmail-${ index }` }
                    value={ item.contactEmail } 
                    maxLength={ 25 }  
                    textChange={ this._onFieldChangeContactList }
                  />
              </span>
              <span className="wrapper">
                <span className="form-label">Contact Phone</span> <br />
                <span className="phone-constant">+1</span>
                  <Input 
                    key={ index }
                    className="form-input phone" 
                    type="text" 
                    name={ `phone-${ index }` }
                    value={ item.phone }   
                    maxLength={ 10 }
                    textChange={ this._onFieldChangeContactList }
                  />
                </span>
              <div class="delete-cols">
                <img className="delete" id={ index } src={ ICONS.DELETE } width="20" title="delete" onClick={ this._deleteContactPerson }/>
              </div>
           </div>
          <div class="row contact-radio">
           <div className="cols radio-cols"> 
               <label className="radio-label">
                  <Radio 
                    name={ `isPrimary-${ index}` } 
                    type="radio" 
                    className="select-checkbox" 
                    checked={ item.isPrimary }
                    onChange={ this._onFieldChangeContactList }
                  />
                </label>
                <span className="radio-text">Primary Contact</span> 
            </div>
          </div>
        </div>
    ));

        return (
            <div className="container">
              <div className="wrapper-section">
                <div className="row">
                   <span className="wrapper">
                      <FloatingLabel 
                        className="form-input" 
                        placeholder="Organization Name*" 
                        type="text" 
                        name="organizationName"
                        maxLength={ 50 }
                        value={ organizationName }
                        onChange={ this._onFieldChangeAlphaNumeric }
                        autoComplete="none"
                      />
                      <div className="error">{ errorOrganizationName }</div>
                  </span>
                </div>

                <div className="row">
                  <span className="wrapper">
                    <FloatingLabel 
                      className="form-input" 
                      placeholder="Supplier No*" 
                      type="text" 
                      name="supplierNo"
                      maxLength={ 30 }
                      value={ supplierNo }
                      onChange={ this._onFieldChangeAlphaNumeric }
                      autoComplete="none"
                    />
                    <div className="error">{ errorSupplierNo }</div>
                  </span>
                  <span className="wrapper">
                   <FloatingLabel 
                     className="form-input" 
                     placeholder="Registration No*" 
                     type="text" 
                     name="registrationNo"
                     maxLength={ 30 }
                     value={ registrationNo }
                     onChange={ this._onFieldChangeAlphaNumeric }
                     autoComplete="none"
                   />
                  <div className="error">{ errorRegistrationNo }</div>
                </span>
                <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="Tax Payer ID" 
                    type="text" 
                    name="taxPayerId"
                    maxLength={ 30 }
                    value={ taxPayerId }
                    onChange={ this._onFieldChangeAlphaNumeric }
                    autoComplete="none"
                  />
                  <div className="error"></div>
                </span>
               </div>

               <p className="address">Supplier Address</p>
            <div className="row">
                <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="Address 1" 
                    type="text" 
                    name="houseNo"
                    maxLength={ 100 }
                    value={ houseNo }
                    onChange={ this._onFieldChangeAlphaNumeric }
                    autoComplete="none"
                  />
                  <div className="error"></div>
                </span>
                <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="Address 2" 
                    type="text" 
                    name="street"
                    value={ street }
                    onChange={ this._onFieldChangeAlphaNumeric }
                    autoComplete="none"
                  />
                  <div className="error"></div>
                </span>
                <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="Zip Code" 
                    type="text" 
                    name="zipCode"
                    value={ zipCode }
                    maxLength={ 5 }
                    onChange={ this._onFieldChangeNumeric }
                    autoComplete="none"
                  />
                  <div className="error"></div>
                </span>
            </div>

            <div className="row">
                <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="City" 
                    type="text" 
                    name="city"
                    value={ city }
                    maxLength={ 30 }
                    onChange={ this._onFieldChangeAlphaNumeric }
                    autoComplete="none"
                  />
                  <div className="error"></div>
                </span>
                <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="County" 
                    type="text" 
                    name="county"
                    value={ county }
                    maxLength={ 30 }
                    onChange={ this._onFieldChangeAlphaNumeric }
                    autoComplete="none"
                  />
                  <div className="error"></div>
                </span>
                <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="State" 
                    type="text" 
                    name="state"
                    value={ state }
                    maxLength={ 30 }
                    onChange={ this._onFieldChangeAlphaNumeric }
                    autoComplete="none"
                  />
                  <div className="error"></div>
                </span>
            </div>

            <div className="row">
                <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="Country" 
                    type="text" 
                    name="country"
                    value={ country }
                    maxLength={ 30 }
                    onChange={ this._onFieldChangeAlphaNumeric }
                    autoComplete="none"
                  />
                  <div className="error"></div>
                </span>
            </div>

            <p className="address">Supplier Contact</p>
            <div className="main-contactdiv">
            <div className="row contact-div">
                <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="Contact Person" 
                    type="text" 
                    name="contactName"
                    maxLength={ 25 }
                    value={ contactName }
                    onChange={ this._onFieldContactNameChange }
                    autoComplete="none"
                  />
                  <div className="error">{ errorContactName }</div>
                </span>
                <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="Contact Email" 
                    type="text" 
                    name="contactEmail"
                    value={ contactEmail }
                    maxLength={ 25 }
                    onChange={ this._onFieldContactChange }
                    autoComplete="none"
                  />
                  <div className="error">{ errorContactEmail }</div>
                </span>
                <span className="wrapper">
                  {
                    showPhoneLabel ? <label for="label" className="float-label">Contact Phone*</label> : ''
                  }
                 <span className="list-phone-constant">+1</span>
                  <Input 
                    className="form-input phone" 
                    placeholder="Contact Phone" 
                    type="text" 
                    name="contactPhone"
                    value={ contactPhone }
                    maxLength={ 10 }
                    textChange={ this._onFieldContactPhoneChange }
                    autoComplete="none"
                  />
                  <div className="error">{ errorContactPhone }</div>
                </span>
            </div>
            <div className="row radio-row">
               <label className="radio-label">
                  <Radio 
                    name="isPrimaryContact" 
                    type="radio" 
                    className="select-checkbox" 
                    checked={ isPrimaryContact }
                    onChange={ this._onFieldContactChange }
                  />
                </label>
                <span className="radio-text">Primary Contact</span> 
            </div>
            <div className="contact-btn-div">
              <Button 
                name="Clear" 
                type="button" 
                className="btn-footer-cancel" 
                onClick={ this._clearContactForm }
              />
              <Button 
                name="Add Contact" 
                type="button" 
                className="btn-footer-submit" 
                onClick={ this._addContact }
              />
            </div>
            </div>
            <div className="row">
              { contactPersonFields }
            </div>


            <div className="btn-footer-group">
              <Button 
                name="Cancel" 
                type="button" 
                className="btn-footer-cancel" 
                onClick={ this._cancelFrom }
              />
              <Button 
                name="Submit" 
                type="button" 
                className="btn-footer-submit"
                onClick={ this._submitForm }
              />
             </div>

            </div>
          </div>
        );
    }
}

export default  SupplierComponent;