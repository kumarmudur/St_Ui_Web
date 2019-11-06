import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import FloatingLabel from 'floating-label-react';
import {  DropdownBox, Button } from '../common';
import { countryFilter, statesFilter, cityFilter } from '../../utils/locationFilter';
import { officeValidation } from '../../utils/validations';

class OfficeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: this._getInitialState(props),
      errors: {},
      countryOptions: [],
      stateOptions: [],
      cityOptions: [],
      showCountryLabel: false,
      showStateLabel: false,
      showCityLabel: false
    };
    this.contentEdit = true;
  }

  _getInitialState = data => {
    const obj = {
      officeName: data && data.officeName || '',
      country: data && data.country || '',
      state: data && data.state || '',
      city: data && data.city || '',
      departments: data && data.departments || []
    };
    return obj;
  }

  _onFieldChange = e => {
    const { fields } = this.state;
    const { value, name } = e.target;
    fields[name] = value;
    this.setState({
      fields
    });
  }

  componentDidMount() {
    this.props.getCountry();
  }

  componentWillReceiveProps(nextProps) {
    let obj = {};
    let { showCountryLabel, showStateLabel, showCityLabel } = this.state;
    if(nextProps && nextProps.countryList) {
      this.getCountryData(nextProps.countryList);
    }
    if(nextProps && nextProps.statesList) {
      this.getStatesData(nextProps.statesList);
    }
    if(nextProps && nextProps.cityList) {
      this.getCitiesData(nextProps.cityList);
    }
    if(nextProps && nextProps.getOfficeData && this.contentEdit === true) {
      obj = this._getInitialState(nextProps.getOfficeData);
      showCountryLabel = nextProps.getOfficeData.country ? true : false;
      showStateLabel = nextProps.getOfficeData.state ? true : false;
      showCityLabel = nextProps.getOfficeData.city ? true : false;
    } else {
      const { fields } = this.state;
      obj = this._getInitialState(fields);
      showCountryLabel = fields.country ? true : false;
      showStateLabel = fields.state ? true : false;
      showCityLabel = fields.city ? true : false;
    }
    this.setState({
      fields: obj,
      showCountryLabel,
      showStateLabel,
      showCityLabel
    });
 }

  getCountryData = countryList => {
    let countryData = countryFilter(countryList);
    this.setState({
      countryOptions: countryData
    });
  }

  getStatesData = statesList => {
    let statesData = statesList && statesFilter(statesList);
    this.setState({
      stateOptions: statesData
    });
  }

  getCitiesData = cityList => {
    let cityData = cityList && cityFilter(cityList);
    this.setState({
      cityOptions: cityData
    });
  }

  _onChangeSelectCountry = value => {
    this.contentEdit = false;
    const { fields } = this.state;
    const  selectedValue = value;
    fields.country = selectedValue && selectedValue.value;
    fields.state = '';
    fields.city = '';
   this.setState({
     fields,
     showCountryLabel: true,
   });
    this.props.getStates(selectedValue.value);
  };

  _onChangeSelectState = value => {
    this.contentEdit = false;
    const { fields } = this.state;
    const selectedValue = value;
    fields.state = selectedValue && selectedValue.value;
    fields.city = '';
    this.setState({
      fields,
      showStateLabel: true,
    });
    const dataObj = {
      countryName: fields.country,
      stateName: selectedValue.value
    };
    this.props.getCities(dataObj);
  }

  _onChangeSelectCity = value => {
    this.contentEdit = false;
    const { fields } = this.state;
    const selectedValue = value;
    fields.city = selectedValue && selectedValue.value;
    this.setState({
      fields,
      showCityLabel: true
    });
  }

  _submitForm = () => {
    this.contentEdit = true;
    let status = this._checkValidation();
    if(status) {
       this.props.submitForm(_.castArray(this.state.fields));
    }   
  }

  _checkValidation = () => {
    let { fields } = this.state;
    const formStatus = officeValidation(fields);
    
    this.setState({
      errors: formStatus.errors,
      isFormValid: formStatus.formIsValid,
    });
    return formStatus.status;
  } 

  _clearForm = () => {
      this.contentEdit = true;
      const { fields } = this.state;
      fields.officeName = '';
      fields.country = '';
      fields.state = '';
      fields.city = '';
      this.setState({
        fields,
        errors: {},
        stateOptions: [],
        cityOptions: [],
        showCountryLabel: false,
        showStateLabel: false,
        showCityLabel: false
      });
  }

  _cancelForm = () => {
    this.contentEdit = true;
    this.props.cancelForm();
  }

  render() {
    const { showCountryLabel, showStateLabel, showCityLabel, countryOptions, stateOptions, cityOptions } = this.state;
    const  { officeName, country, state, city } = this.state.fields;
    const { errorOfficeName, errorCountry, errorState, errorCity } = this.state.errors;
    const { getOfficeData } = this.props; 
    return (
      <Fragment>
        <div className="header-label">
            { !getOfficeData && <p>ADD OFFICE </p>}
            { getOfficeData && <p>EDIT OFFICE </p>}
        </div>
        <div className="row">
          <span className="wrapper">
            <FloatingLabel 
              className="form-input" 
              placeholder="Office name*" 
              type="text" 
              name="officeName"
              value={ officeName }
              maxLength={ 30 }
              onChange={ this._onFieldChange  }
            />
            <div className="error">{ errorOfficeName }</div>
          </span>
          <div className="inline-div">
              {
                showCountryLabel ? <label for="label" className="float-label">Country*</label> : ''
              }
              <DropdownBox 
                placeholder="Country*"
                name="country"
                options= { countryOptions ? countryOptions : [] }
                onChangeSelect= { value => this._onChangeSelectCountry(value) } // eslint-disable-line
                selectedValue={ country }
              />
              <div className="error">{ errorCountry }</div>
          </div>
          <div className="inline-div">
              {
                showStateLabel ? <label for="label" className="float-label">State*</label> : ''
              }
              <DropdownBox 
                placeholder="State*"
                name="State"
                options={ stateOptions ? stateOptions : [] }
                onChangeSelect={ value => this._onChangeSelectState(value) } // eslint-disable-line
                selectedValue={ state }
              />
              <div className="error">{ errorState }</div>
            </div>
        </div>
       <div className="row">
         <div className="inline-div">
              {
                showCityLabel ? <label for="label" className="float-label">City*</label> : ''
              }
              <DropdownBox 
                placeholder="City*"
                name="City"
                options={ cityOptions ? cityOptions : [] }
                onChangeSelect={ value => this._onChangeSelectCity(value) } // eslint-disable-line
                selectedValue={ city }
              />
              <div className="error">{ errorCity }</div>
            </div>  
       </div>
        <div className="btn-group-footer">
          <Button name="Cancel" className="btn-footer-cancel" onClick={ this._cancelForm }/>
          <Button name="Clear" className="btn-footer-cancel" onClick={ this._clearForm }/>
          <Button name="Add Office" className="btn-footer-submit" onClick={ this._submitForm } type='submit' />
        </div>
      </Fragment>
    );
  }
}

export default OfficeComponent;