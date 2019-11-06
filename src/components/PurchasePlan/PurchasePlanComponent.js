import React, { Component } from 'react';
import {  DropdownBox, Button } from '../../components/common';
import PurchaseComponent from './PurchaseComponent';
import FinanceComponent from './FinanceComponent';
import LeaseComponent from './LeaseComponent';
import { PROPOSALTYPE } from '../../constants';
import { countryFilter, statesFilter } from '../../utils/locationFilter';
import { purchasePlanValidation, purchasePlanData, purchasePlanFields } from '../../utils/PurchasePlan/validations';
import {  checkAlphanumeric } from '../../utils/utility';
import FloatingLabel from 'floating-label-react';

class PurchasePlanComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fields: this._getInitialState(props),
          dynamicFieldData: {},
          showPurchaseComponent: false,
          showFinanceComponent: false,
          showLeaseComponent: false,
          countryOptions: [],
          stateOptions: [],
          errors: {},
          pageType: '',
          showProjectLabel: false,
          showProposalLabel: false,
          showCuntryLabel: false,
          showStateLabel: false
        };
    }

    _getInitialState = data => {
      const obj = { 
        purchasePlanName: data && data.purchasePlanName || '',
        projectType: data && data.projectType || '',
        proposalType: data && data.proposalType || '',
        country:  data && data.country || '',
        state: data && data.state || '',
        description: data && data.description || '',
        pageType: this.state && this.state.pageType && this.state.pageType || ''
      };
      return obj;
    }

    componentWillReceiveProps(nextProps) {
      this.getCountryData(nextProps.countryList);
      this.getStatesData(nextProps.statesList);
      let obj = {};
      const { purchasePlanData, id, page } = nextProps;
      let { showProjectLabel, showProposalLabel, showCuntryLabel, showStateLabel, dynamicFieldData } = this.state;
      if(id && purchasePlanData) {
        obj = {
          purchasePlanName: purchasePlanData.purchasePlanName || '',
          projectType: purchasePlanData.projectType || '',
          proposalType: purchasePlanData.proposalType || '',
          country: this.state.fields.country ? this.state.fields.country : purchasePlanData.country,
          state: this.state.fields.country ? this.state.fields.state : purchasePlanData.state,
          description: purchasePlanData.description || '',
          pageType: page
        };
        this._changeSelectProposalType(purchasePlanData && purchasePlanData.proposalType, id, page);
        showProjectLabel = purchasePlanData.projectType ? true : false;
        showProposalLabel = purchasePlanData.proposalType ? true : false;
        showCuntryLabel = purchasePlanData.country ? true : false;
        showStateLabel = purchasePlanData.state ? true : false;
        dynamicFieldData = purchasePlanData;
      } else {
        const { fields } = this.state;
        obj = this._getInitialState(this.state.fields);
        showProjectLabel = fields.projectType ? true : false;
        showProposalLabel = fields.proposalType ? true : false;
        showCuntryLabel = fields.country ? true : false;
        showStateLabel = fields.state ? true : false;
      }
      this.setState({
        fields: obj,
        showProjectLabel,
        showProposalLabel,
        showCuntryLabel,
        showStateLabel,
        dynamicFieldData
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

    _submitForm = () => {
      let status = this._checkValidation();
      if(status) {
        let { fields, dynamicFieldData } = this.state;
        fields = purchasePlanFields(fields);
        dynamicFieldData = purchasePlanData(dynamicFieldData, this.state.fields.proposalType);
        const dataObj = {
          ...fields,
          ...dynamicFieldData
        };
        this.props.submitForm(dataObj);
      }
    }

    _checkValidation = () => {
      const { fields, dynamicFieldData } = this.state;
      const formStatus = purchasePlanValidation(fields, dynamicFieldData);
      this.setState({
        errors: formStatus.errors,
        isFormValid: formStatus.formIsValid
      });
      return formStatus.status;
    }

    _cancelForm = () => {
        this.props.cancelForm();
    }

    _getChildComponentData = data => {
      this.setState({
        dynamicFieldData: data,
        pageType: ''
      });
    };

    _changeSelectProposalType = (data, id, page) => {
      let value = '';
      if(id) {
        value = data;
      } else {
        value = data && data.value;
      }
      let showFinance = false, showLease = false, showPurchase = false;
      if(value === PROPOSALTYPE.FINANCE) {
        showFinance = true;
        showLease = false;
        showPurchase = false;
      } else if (value === PROPOSALTYPE.PURCHASE) {
        showFinance = false;
        showLease = false;
        showPurchase = true;
      } else {
        showFinance = false;
        showLease = true;
        showPurchase = false;
      }
      const { fields } = this.state;
      fields['proposalType'] = value;
      this.setState({
        showFinanceComponent: showFinance,
        showLeaseComponent: showLease,
        showPurchaseComponent: showPurchase,
        showProposalLabel: true,
        fields,
        errors: {},
        pageType: page,
        dynamicFieldData: {}
      });
    }

    _onFieldChange = e => {
      const { value, name } = e.currentTarget;
      const { fields } = this.state;
      if(value && checkAlphanumeric(value)) {
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

    _onChangeSelectCountry = value => {
      const  selectedValue = value;
      const { fields } = this.state;
      fields['country'] = selectedValue.value;
      fields['state'] = '';
      this.setState({
        fields,
        showCuntryLabel: true,
        errors: {}
      });
      this.props.getStates(selectedValue.value);
    };

    _onChangeSelectState = value => {
      const  selectedValue = value;
      const { fields } = this.state;
      fields['state'] = selectedValue.value;
      this.setState({
        fields,
        showStateLabel: true,
        errors: {}
      });
    }

    _changeSelectProjectType = value => {
      const  selectedValue = value;
      const { fields } = this.state;
      fields['projectType'] = selectedValue.value;
      this.setState({
        fields,
        showProjectLabel: true,
        errors: {}
      });
    }
    
    render() {
      const { staticData, countryList, statesList, purchasePlanData } = this.props;
      const projectTypeList = staticData && staticData.projectType;
      const proposalTypeList = staticData && staticData.proposalType;
      const countryOptions = countryList && countryFilter(countryList);
      const stateOptions = statesList && statesFilter(statesList);
      const { purchasePlanName, description, proposalType, projectType, country, state } = this.state.fields;
      const { showFinanceComponent, showLeaseComponent, showPurchaseComponent, pageType, showProjectLabel, showProposalLabel, showCuntryLabel, showStateLabel } = this.state;
      const { errorPurchasePlanName, errorProjectType, errorProposalType, errorCountry, errorState, errorDescription, errorBallonPayment1DueMonth } = this.state.errors;
      let purchasePlan = pageType && pageType === 'edit_mode' && purchasePlanData ? purchasePlanData : null ;

      const dynamicFields = <div className="wrapper-dynamic">
            {
              showFinanceComponent ? 
               <FinanceComponent
                 getChildComponentData={ this._getChildComponentData } 
                 purchasePlanData={ purchasePlan }
                 errorBallonPayment1DueMonth={ errorBallonPayment1DueMonth }
               /> : null
            }
            {
              showLeaseComponent ? 
               <LeaseComponent 
                 getChildComponentData={ this._getChildComponentData } 
                 purchasePlanData={ purchasePlan }
                 errorBallonPayment1DueMonth={ errorBallonPayment1DueMonth }
               /> : null
            }
            {
              showPurchaseComponent ? 
               <PurchaseComponent
                 getChildComponentData={ this._getChildComponentData } 
                 purchasePlanData={ purchasePlan }
               /> : null
            }
        </div>;
        return (
            <div className="container">
                <div className="wrapper-section">
                    <div className="wapper-common">
                         <div className="row">
                           <span className="wrapper">
                              <FloatingLabel 
                                className="form-input" 
                                placeholder="Purchase Plan Name*" 
                                type="text" 
                                name="purchasePlanName"
                                value={ purchasePlanName }
                                maxLength="50"
                                onChange={ this._onFieldChange }
                                autoComplete="none"
                              />
                              <div className="error">{ errorPurchasePlanName }</div>
                            </span>
                            <div className="inline-div">
                                {
                                  showProjectLabel ? <label for="label" className="float-label">Project Type*</label> : ''
                                }
                                <DropdownBox 
                                  placeholder="Select Project Type*"
                                  name="projectType"
                                  options = { projectTypeList ? projectTypeList.values : [] }
                                  onChangeSelect={ this._changeSelectProjectType }
                                  selectedValue={ projectType }
                                />
                                <div className="error">{ errorProjectType }</div>
                            </div>
                            <div className="inline-div">
                                {
                                  showProposalLabel ? <label for="label" className="float-label">Proposal Type*</label> : ''
                                }
                                <DropdownBox 
                                  placeholder="Select Proposal Type*"
                                  name="proposalType"
                                  selectedValue={ proposalType }
                                  options = { proposalTypeList ? proposalTypeList.values : [] }
                                  onChangeSelect={ this._changeSelectProposalType }
                                />
                                <div className="error">{ errorProposalType }</div>
                            </div>
                         </div>
                         <div className="row">
                            <div className="inline-div">
                                { 
                                  showCuntryLabel ? <label for="label" className="float-label">Country*</label> : ''
                                }
                                <DropdownBox 
                                  placeholder="Country*"
                                  name="country"
                                  options={ countryOptions ? countryOptions : [] }
                                  onChangeSelect= { this._onChangeSelectCountry }
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
                                  name="state"
                                  options={ stateOptions ? stateOptions : [] }
                                  onChangeSelect={ this._onChangeSelectState }
                                  selectedValue={ state }
                                />
                                <div className="error">{ errorState }</div>
                            </div>
                         </div>
                         <div className="row">
                            <span className="wrapper">
                              <FloatingLabel 
                                className="form-input" 
                                placeholder="Description*" 
                                type="textbox" 
                                name="description"
                                value={ description }
                                maxLength="250"
                                onChange={ this._onFieldChange }
                                autoComplete="none"
                              />
                              <div className="error">{ errorDescription }</div>
                            </span>
                        </div>
                    </div>
                    { dynamicFields }
                    <div className='btn-footer-group'>
                        <Button name='Cancel' type='button' className='btn-footer-cancel' onClick={ this._cancelForm }/>
                        <Button name='Submit' type='button' className='btn-footer-submit' onClick={ this._submitForm } />
                    </div>
                </div>
            </div>
        );
    }
}

export default PurchasePlanComponent;
