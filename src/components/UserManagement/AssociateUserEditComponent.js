import React, { Component } from 'react';
import FloatingLabel from 'floating-label-react';
import { Button, LogoImage } from '../common';
import { associateFormValidation, contactPersonValidation } from '../../utils/validations';
import { NavLink } from 'react-router-dom';
import { ICONS } from '../../constants';

class AssociateUserEditComponent extends Component {
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

    _logout = () => {
        this.props.logout();
    }

    getInitialstate = (props) => {
        const obj = {
            registerId:       props.userData.registerId,
            firstName:        props.userData.firstName || '',
            lastName:         props.userData.lastName || '',
            phone:            props.userData.phone || '',
            email:            props.userData.email || '',
            companyName:      props.userData.companyName || '',
            companyEin:       props.userData.companyEin || '',
            companyRegistrationState: props.userData.companyRegistrationState || '',
            houseBuilding:    props.userData.houseBuilding || '',
            street:           props.userData.street || '',
            zipCode:          props.userData.zipCode || '',
            city:             props.userData.city || '',
            county:           props.userData.county || '',
            country:          props.userData.country || '',
            state:            props.userData.state || '',
            contactPersons:   props.userData.contactPersons || [],
            companyRequired: props.userData.companyRequired || '',
            representativeFirstName: props.userData.representativeFirstName || '',
            representativeLastName: props.userData.representativeLastName || '',
            driverLicenseNumber: props.userData.driverLicenseNumber || '',
            ssn: props.userData.ssn || ''

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
                contactPersons:   nextProps.userData.contactPersons || [],
                companyRequired: nextProps.userData.companyRequired || '',
                representativeFirstName: nextProps.userData.representativeFirstName || '',
                representativeLastName: nextProps.userData.representativeLastName || '',
                driverLicenseNumber: nextProps.userData.driverLicenseNumber || '',
                ssn: nextProps.userData.ssn || ''
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
        const formStatus = associateFormValidation(fields, 'associate');
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
        let isCompanyRequired = value === 'Company' ? true : false;

        let { fields } = this.state;
        const { contactPersons } = fields;
        if(name === 'companyRequired') {
            fields[name] = isCompanyRequired;
        }
        if(name.includes('phone-') === true || name === 'zipCode') {
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
        const { companyName, companyEin, companyRegistrationState, houseBuilding, street, zipCode, city, county, country, state, contactPersons, companyRequired, representativeFirstName, representativeLastName, driverLicenseNumber, ssn } = this.state.fields;
        let { firstName, lastName, phone, email } = this.state.fields;
        const { errorHouseBuilding, errorStreet, errorZipcode, errorCity, errorCounty, errorCountry, errorState,
            errorCompanyEin, errorCompanyName, errorDriverLicenseNumber, errorSSN, errorRepresentLastName, errorRepresentFirstName, errorRegistrationState } = this.state.errors;
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
                    <span class="phone-constant-generalInfo">+1</span>
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
            <div>
                <div className="logo-wrapper">
                    <LogoImage className="associate-user-logo"/> 
                    <div className="loggedIn-user">
                        <span><img src={ ICONS.USER_GREEN }/>{ firstName }</span>
                        <div className='topNavMenu'>
                           <NavLink className='topNavMenuLinks' to="#logout" name='LOGOUT' onClick={ this._logout }>Log Out</NavLink>
                        </div>
                    </div>
                </div>
                <div className="wrapper-user">
                    <div className="row-heading">
                        <div className="heading-generalInfo">
                            <p title='General'><i className="checkMark-green" />General Info</p>
                        </div>
                        <div className="heading-documents">
                            <p title='Documents' className="inactive-tabText"><i className="checkMark-gray" />Documents</p>
                        </div>
                        <div className="heading-agreement">
                            <p title='Agreement' className="inactive-tabText"><i className="checkMark-gray" />Agreement</p>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div className="content edit-general-info">
                        <div className="row clear">
                            <div className="text-alignment field-padding border-separator">
                                <div className="heading-tabs">General Info</div>
                            </div>
                        </div>  
                        <div className="row border-separator">
                            <div className="cols">
                                <span className="form-label">Name</span> <span className="form-label-text">{ firstName } { lastName }</span>
                            </div>
                            <div className="cols">
                                <span className="form-label">Email</span> <span className="form-label-text">{ email }</span>
                            </div>
                            <div className="cols">
                                <span className="form-label user-contactinfo">Mobile</span> <span className="form-label-text"><span className="phone-constant-readonly">+1</span>{ phone }</span>
                            </div>
                        </div>  
                        <div className="row">
                            <div className='radio-btn-group'>
                                <input type='radio' value='Company' checked={ companyRequired } name='companyRequired' onChange={ this._onFieldChange } /><span>Company</span>
                                <input type='radio' value='Vendor' checked={ !companyRequired } name='companyRequired' onChange={ this._onFieldChange } /><span>Vendor</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="heading-viewProfile heading-company">
                                <p>Company Representative</p>
                            </div>
                        </div>
                        <div className="row">  
                            <div className="cols">
                                <span className="input-wrapper">
                                    <FloatingLabel 
                                      className="form-input"
                                      placeholder = "First Name*" 
                                      type="text" 
                                      name="representativeFirstName"
                                      value={ representativeFirstName }
                                      onChange={ this._onFieldChange }
                                      maxLength="60"
                                    />
                                    <div className="error">{ errorRepresentFirstName }</div>
                                </span>
                            </div>
                            <div className="cols">
                                <span className="input-wrapper">
                                    <FloatingLabel 
                                      className="form-input"
                                      placeholder = "Last Name*" 
                                      type="text" 
                                      name="representativeLastName"
                                      value={ representativeLastName }
                                      onChange={ this._onFieldChange }
                                      maxLength="60"
                                    />
                                    <div className="error">{ errorRepresentLastName }</div>
                                </span>
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
                                      placeholder="Company FEIN*" 
                                      type="text" 
                                      name="companyEin"
                                      value={ companyEin }
                                      maxLength="9"
                                      onChange={ this._onFieldChange }
                                    />
                                    <div className="error">{ errorCompanyEin }</div>
                                </span>
                            </div>
                            <div className="cols">
                                <span className="input-wrapper">
                                    <FloatingLabel 
                                      className="form-input" 
                                      placeholder="SSN*" 
                                      type="text" 
                                      name="ssn"
                                      value={ ssn }
                                      maxLength="9"
                                      onChange={ this._onFieldChange }
                                    />
                                    <div className="error">{ errorSSN }</div>
                                </span>
                            </div>
                            <div className="cols">
                                <span className="input-wrapper">
                                    <FloatingLabel 
                                      className="form-input" 
                                      placeholder="Driver License Number*" 
                                      type="text" 
                                      name="driverLicenseNumber"
                                      value={ driverLicenseNumber }
                                      maxLength="15"
                                      onChange={ this._onFieldChange }
                                    />
                                    <div className="error">{ errorDriverLicenseNumber }</div>
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
                                      maxLength="30"
                                      onChange={ this._onFieldChange }
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
                                      placeholder="Zip Code*" 
                                      type="text" 
                                      name="zipCode"  
                                      value={ zipCode }  
                                      maxLength="5"
                                      onChange={ this._onFieldChange }
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
                                <span className="phone-constant-generalInfo">+1</span>
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
                            <Button 
                              name="Submit" 
                              type="button" 
                              className="btn-save"
                              onClick={ this._submitForm }
                            />
                            </div>
                        </div>
                    </div>
                </div>
            </div>                        
        );
    }
}

export default AssociateUserEditComponent;