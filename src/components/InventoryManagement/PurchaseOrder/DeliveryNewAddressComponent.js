import React, { Component, Fragment } from 'react';
import FloatingLabel from 'floating-label-react';
import {  checkNumeric, checkAlphanumeric } from '../../../utils/utility';

class DeliveryNewAddressComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: this._getInitialState(),
        };
    }

    _getInitialState = data => {
        const obj = {
            buildingNumber: data && data.buildingNumber || '',
            street: data && data.street || '',
            zipCode: data && data.zipCode || '',
            city: data && data.city || '',
            county:  data && data.county || '',
            state: data && data.state || '',
            country: data && data.country || '',
            phone: data && data.phone || ''
        };
        return obj;
    };

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
        const { buildingNumber, street, zipCode, city, county, state, country, phone } = this.state.fields;
        return (
            <Fragment>
                <div className="row">
                    <span className="wrapper">
                      <FloatingLabel 
                        className="form-input" 
                        placeholder="buildingNumber*" 
                        type="text" 
                        name="buildingNumber"
                        value={ buildingNumber }
                        maxLength={ 15 }
                        onKeyPress={ this._onKeyPress }
                        onChange={ this._onFieldChangeAlphaNumeric }
                        autoComplete="none"
                      />
                     {/* <div className="error">{ errorWareStreet }</div> */}
                    </span>
                    <span className="wrapper">
                      <FloatingLabel 
                        className="form-input" 
                        placeholder="Street*" 
                        type="text" 
                        name="street"
                        value={ street }
                        maxLength={ 15 }
                        onKeyPress={ this._onKeyPress }
                        onChange={ this._onFieldChangeAlphaNumeric }
                        autoComplete="none"
                      />
                      {/* <div className="error">{ errorWareStreet }</div> */}
                    </span>
                    <span className="wrapper">
                      <FloatingLabel 
                        className="form-input" 
                        placeholder="zipCode*" 
                        type="text" 
                        name="zipCode"
                        value={ zipCode }
                        maxLength={ 15 }
                        onKeyPress={ this._onKeyPress }
                        onChange={ this._onFieldChangeNumeric }
                        autoComplete="none"
                      />
                    {/* <div className="error">{ errorWareStreet }</div> */}
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
                    {/* <div className="error">{ errorWareStreet }</div> */}
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
                    {/* <div className="error">{ errorWareStreet }</div> */}
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
                    {/* <div className="error">{ errorWareStreet }</div> */}
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
                    {/* <div className="error">{ errorWareStreet }</div> */}
                    </span>
                    <span className="wrapper">
                      <FloatingLabel 
                        className="form-input" 
                        placeholder="Phone*" 
                        type="text" 
                        name="phone"
                        value={ phone }
                        maxLength={ 15 }
                        onKeyPress={ this._onKeyPress }
                        onChange={ this._onFieldPhoneChange }
                        autoComplete="none"
                      />
                    {/* <div className="error">{ errorWareStreet }</div> */}
                    </span>
                </div>
            </Fragment>
        );
    }
}

export default DeliveryNewAddressComponent;
