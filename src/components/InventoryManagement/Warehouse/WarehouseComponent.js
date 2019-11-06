import React, { Component } from 'react';
import { Input, Checkbox, Button } from '../../common';
import { warehouseValidation } from '../../../utils/InventoryManagement/validations';
import { checkAlphanumeric, checkNumeric } from '../../../utils/utility';
import FloatingLabel from 'floating-label-react';

class WarehouseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: this._getInitialState(props),
      errors: {},
      showPhoneLabel: false
    };
  }

  _getInitialState = data => {
    const obj = {
      warehouseName: data && data.warehouseName ||  '',
      shelf: data && data.shelf || false,
      bin: data && data.bin || false,
      active: data && data.active || false,
      managerName: data && data.managerName || '',
      managerEmail: data && data.managerEmail || '',
      managerPhone: data && data.managerPhone || '',
      houseNumber: data && data.houseNumber || '',
      street: data && data.street || '',
      zipCode: data && data.zipCode || '',
      city: data && data.city || '',
      county: data && data.county || '',
      state: data && data.state || '',
      country: data && data.country || ''
    };
    return obj;
  }

  componentWillReceiveProps(nextProps) {
    let obj = {};
    let { showPhoneLabel } = this.state;
    if(nextProps && nextProps.id && nextProps.warehouseData) {
      obj = this._getInitialState(nextProps.warehouseData);
      showPhoneLabel = nextProps.warehouseData.managerPhone ? true : false;
    } else {
      const { fields } = this.state;
      obj = this._getInitialState(fields);
      showPhoneLabel = fields.managerPhone ? true : false;
    }
    this.setState({
      fields: obj,
      showPhoneLabel
    });
  }

  _onKeyPress = e => {
    if (e.key === 'Enter') {
      this._submitForm();
    }
  }

  _submitForm = () => {
    let status = this._checkValidation();
    if(status) {
      this.props.submitForm(this.state.fields); 
    }
  }

  _cancelFrom = () => {
    this.props.cancelForm();
  }

  _checkValidation = () => {
    let { fields } = this.state;
    const formStatus = warehouseValidation(fields);
    
    this.setState({
      errors: formStatus.errors,
      isFormValid: formStatus.formIsValid,
    });
    return formStatus.status;
  }

  _onFieldChangeEmail = e => {
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
      errors: {},
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

  _handleWarehouseFeature = e => {
    const { checked, name } = e.target;
    const { fields } = this.state;
    fields[name] = checked;
    this.setState({
      fields
    });
  }

  _onFieldPhoneChange = e => {
    let { value, name } = e.currentTarget;
    let { fields, showPhoneLabel } = this.state;
    if(value) {
      showPhoneLabel = true;
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
    } else {
      showPhoneLabel = false;
    }
    fields[name] = value;
    this.setState({
      fields,
      showPhoneLabel
    });
  }

  render() {
    const { errors, fields, showPhoneLabel } = this.state;
    const { warehouseName, shelf, bin, active, managerName, managerEmail, managerPhone, houseNumber, street,
      zipCode, city, state, county, country } = fields;
    const {errorWarehouseName, errorManagerName, errorManagerEmail, errorManagerPhone, errorHouseNumber, 
      errorWareStreet, errorZipCode, errorCity, errorCounty, errorState, errorCountry } = errors;
    return (
      <div className="container">
        <div className="wrapper-section">
            <div className="row">
                <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="Warehouse Name*" 
                    type="text" 
                    name="warehouseName"
                    value={ warehouseName }
                    maxLength={ 50 }
                    onKeyPress={ this._onKeyPress }
                    onChange={ this._onFieldChangeAlphaNumeric }
                    autoComplete="none"
                  />
                  <div className="error">{ errorWarehouseName }</div>
                </span>
            </div>

            <div className="row-checkbox">
                <label className="checkbox-label">
                    <Checkbox 
                      name="shelf" 
                      type="checkbox" 
                      className="select-checkbox" 
                      checked={ shelf }
                      onChange={ this._handleWarehouseFeature }
                    />
                </label>
                <span className="checkbox-text">Shelf</span>  
                <label className="checkbox-label">
                    <Checkbox 
                      name="bin" 
                      type="checkbox" 
                      className="select-checkbox" 
                      checked={ bin }
                      onChange={ this._handleWarehouseFeature }
                    />
                </label>
                <span className="checkbox-text">Bin</span>
                <label className="checkbox-label">
                    <Checkbox 
                      name="active" 
                      type="checkbox" 
                      className="select-checkbox" 
                      checked={ active }
                      onChange={ this._handleWarehouseFeature }
                    />
                </label>
                <span className="checkbox-text">Active</span>
            </div>

            <div className="row">
                <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="Manager Name*" 
                    type="text" 
                    name="managerName"
                    value={ managerName }
                    maxLength={ 30 }
                    onKeyPress={ this._onKeyPress }
                    onChange={ this._onFieldChangeAlphaNumeric }
                    autoComplete="none"
                  />
                  <div className="error">{ errorManagerName }</div>
                </span>
                <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="Manager Email*" 
                    type="text" 
                    name="managerEmail"
                    value={ managerEmail }
                    maxLength={ 30 }
                    onKeyPress={ this._onKeyPress }
                    onChange={ this._onFieldChangeEmail }
                    autoComplete="none"
                  />
                  <div className="error">{ errorManagerEmail }</div>
                </span>
                <span className="wrapper">
                  {
                    showPhoneLabel ? <label for="label" className="float-label">Manager Phone*</label> : ''
                  }
                  <span className="warehouse-phone-constant">+1</span>
                  <Input 
                    className="form-input phone" 
                    placeholder="Manager Phone*" 
                    type="text" 
                    name="managerPhone"
                    value={ managerPhone }
                    maxLength={ 10 }
                    onKeyPress={ this._onKeyPress }
                    textChange={ this._onFieldPhoneChange }
                    autoComplete="none"
                  />
                  <div className="error">{ errorManagerPhone }</div>
                </span>
            </div>

            <p className="address">Address</p>
            <div className="row">
                <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="Address 1*" 
                    type="text" 
                    name="houseNumber"
                    value={ houseNumber }
                    maxLength={ 5 }
                    onKeyPress={ this._onKeyPress }
                    onChange={ this._onFieldChangeAlphaNumeric }
                    autoComplete="none"
                  />
                  <div className="error">{ errorHouseNumber }</div>
                </span>
                <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="Address 2*" 
                    type="text" 
                    name="street"
                    value={ street }
                    maxLength={ 15 }
                    onKeyPress={ this._onKeyPress }
                    onChange={ this._onFieldChangeAlphaNumeric }
                    autoComplete="none"
                  />
                  <div className="error">{ errorWareStreet }</div>
                </span>
                <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="Zip Code*" 
                    type="text" 
                    name="zipCode"
                    value= { zipCode }
                    maxLength={ 5 } 
                    onKeyPress={ this._onKeyPress }
                    onChange={ this._onFieldChangeNumeric }
                    autoComplete="none"
                  />
                  <div className="error">{ errorZipCode }</div>
                </span>
            </div>

            <div className="row">
                <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="City*" 
                    type="text" 
                    name="city"
                    value={ city }
                    maxLength={ 15 }
                    onKeyPress={ this._onKeyPress }
                    onChange={ this._onFieldChangeAlphaNumeric }
                    autoComplete="none"
                  />
                  <div className="error">{ errorCity }</div>
                </span>
                <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="County*" 
                    type="text" 
                    name="county"
                    value={ county }
                    maxLength={ 15 }
                    onKeyPress={ this._onKeyPress }
                    onChange={ this._onFieldChangeAlphaNumeric }
                    autoComplete="none"
                  />
                  <div className="error">{ errorCounty }</div>
                </span>
                <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="State*" 
                    type="text" 
                    name="state"
                    value={ state }
                    maxLength={ 15 }
                    onKeyPress={ this._onKeyPress }
                    onChange={ this._onFieldChangeAlphaNumeric }
                    autoComplete="none"
                  />
                  <div className="error">{ errorState }</div>
                </span>
            </div>

            <div className="row">
                <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="Country*" 
                    type="text" 
                    name="country"
                    value={ country }
                    maxLength={ 15 }
                    onKeyPress={ this._onKeyPress }
                    onChange={ this._onFieldChangeAlphaNumeric }
                    autoComplete="none"
                  />
                  <div className="error">{ errorCountry }</div>
                </span>
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

export default WarehouseComponent;
