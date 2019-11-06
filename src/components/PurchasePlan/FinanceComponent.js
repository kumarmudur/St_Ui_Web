import React, { Component, Fragment } from 'react';
import { Input, Checkbox, Radio } from '../../components/common';
import {  checkNumeric } from '../../utils/utility';
import FloatingLabel from 'floating-label-react';

class FinanceComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: this._getInitialState(),
        };
        this.disabledBalloon = true;
    }

    _getInitialState = data => {
        const obj = {
            termMonth:  data && data.termMonth || '',
            minimumCost: data && data.minimumCost || '',
            escalationRate: data && data.escalationRate || '',
            planDownPayment: data && data.planDownPayment || '',
            discountAsPerPlan: data && data.discountAsPerPlan || '',
            interestRate: data && data.interestRate || '',
            depreciation: data && data.depreciation || '',
            balloonPayment1: data && data.balloonPayment1 || '',
            balloonPayment1DueMonth: data && data.balloonPayment1DueMonth || '',
            finInterestRate: data && data.finInterestRate || '',
            balloonPayment2: data && data.balloonPayment2 || '',
            includeInProposal: data && data.includeInProposal || false,
            includeInCustomerPortal: data && data.includeInCustomerPortal || false,
            optionToBuy: data && data.optionToBuy || false
        };
        return obj; 
    }

    componentWillReceiveProps(nextProps) {
      let obj = {};
      const { purchasePlanData } = nextProps;
      if(purchasePlanData && purchasePlanData.proposalType === 'Finance') {
        obj = this._getInitialState(purchasePlanData);
        purchasePlanData.balloonPayment1DueMonth ? this.disabledBalloon = false : this.disabledBalloon = true; 
      } else {
        obj = this._getInitialState(this.state.fields);
      }
      this.setState({
        fields: obj,
      });
    }

    _callSetState = () => {
      const { fields } = this.state;
      this.setState({
        fields
      });
      this.props.getChildComponentData(fields);
    } 

    _onFieldChange = e => {
        const { fields } = this.state;
        const { name, type, checked, value } = e.target;
        const data = type === 'checkbox' ? checked : value;
        if(name === 'balloonPayment1') {
          if(value === 'Yes') {
            this.disabledBalloon = false;
          } else if(value === 'No') {
            this.disabledBalloon = true;
            fields['balloonPayment1DueMonth'] = '';
          }
        }
        fields[name] = data;
        this._callSetState();
     }

     _onFieldChangeNumeric = e => {
      const { value, name } = e.currentTarget;
      const { fields } = this.state;
      if(value && checkNumeric(value)) {
        fields[name] = parseFloat(value);
      } else {
        if(!value) {
          fields[name] = value;
        } else {
          fields[name] = null;
        }
      }
      this._callSetState();
    }

    _onFieldChangeNumericInt = e => {
      const { value, name } = e.currentTarget;
      const { fields } = this.state;
      if(value && checkNumeric(value)) {
        fields[name] = parseInt(value);
      } else {
        if(!value) {
          fields[name] = value;
        }
      }
      this._callSetState();
    }

    render() {
        const { termMonth, minimumCost, escalationRate, includeInProposal, includeInCustomerPortal, optionToBuy,
        planDownPayment, discountAsPerPlan, interestRate, balloonPayment1DueMonth,
        finInterestRate, depreciation, balloonPayment1, balloonPayment2 } = this.state.fields;
        const { errorBallonPayment1DueMonth } = this.props;
        return (
            <Fragment>
                <div className="row">
                    <span className="wrapper">
                        <FloatingLabel 
                          className="form-input" 
                          placeholder="Term Month" 
                          type="text" 
                          name="termMonth"
                          value={ termMonth }
                          maxLength="10"
                          onChange={ this._onFieldChangeNumericInt }
                        />               
                    </span>
                    <span className="wrapper">
                        <FloatingLabel 
                          className="form-input" 
                          placeholder="Minimum Cost kWh" 
                          type="text" 
                          name="minimumCost"
                          value={ minimumCost }
                          maxLength="6"
                          onChange={ this._onFieldChangeNumeric }
                        />               
                    </span>
                    <span className="wrapper">
                        <FloatingLabel 
                          className="form-input" 
                          placeholder="Escalation Rate" 
                          type="text" 
                          name="escalationRate"
                          value={ escalationRate }
                          maxLength="10"
                          onChange={ this._onFieldChangeNumeric }
                        />               
                        <span className="percentage">%</span>
                    </span>
                </div>

                <div className="row">
                    <span className="wrapper">
                        <FloatingLabel 
                          className="form-input" 
                          placeholder="Plan Down Payment" 
                          type="text" 
                          name="planDownPayment"
                          value={ planDownPayment }
                          maxLength="6"
                          onChange={ this._onFieldChangeNumeric }
                        />               
                    </span>
                    <span className="wrapper">
                        <FloatingLabel 
                          className="form-input" 
                          placeholder="Discount As Per Plan" 
                          type="text" 
                          name="discountAsPerPlan"
                          value={ discountAsPerPlan }
                          maxLength="6"
                          onChange={ this._onFieldChangeNumeric }
                        />               
                    </span>
                    <span className="wrapper">
                        <FloatingLabel 
                          className="form-input" 
                          placeholder="Interest Rate" 
                          type="text" 
                          name="interestRate"
                          value={ interestRate }
                          maxLength="10"
                          onChange={ this._onFieldChangeNumeric }
                        />               
                        <span className="percentage">%</span>
                    </span>
                </div>

                <div className="row">
                    <span className="wrapper" onChange={ this._onFieldChange }>
                        <Input 
                          className="form-input radio-input" 
                          placeholder="Depreciation" 
                          type="text" 
                          name="depreciation"
                          readOnly="true"
                          maxLength="50"
                        />      
                        <span className="row-radio">
                         <label className="radio-label">
                            <Radio 
                              name="depreciation" 
                              type="radio" 
                              className="select-checkbox" 
                              checked={ depreciation === 'Yes' ? true : false }
                              value="Yes"
                            />
                        </label>
                        <span className="radio-text">Yes</span>  
                         <label className="radio-label">
                            <Radio 
                              name="depreciation" 
                              type="radio" 
                              className="select-checkbox" 
                              checked={ depreciation === 'No' ? true : false }
                              value="No"
                            />
                         </label>
                        <span className="radio-text">No</span>
                      </span>         
                    </span>
                    <span className="wrapper" onChange={ this._onFieldChange }>
                        <Input 
                          className="form-input radio-input" 
                          placeholder="Balloon Payment 1" 
                          type="text" 
                          name="balloonPayment1"
                          readOnly="true"
                        />  
                        <span className="row-radio">
                         <label className="radio-label">
                            <Radio 
                              name="balloonPayment1" 
                              type="radio" 
                              className="select-checkbox" 
                              checked={ balloonPayment1 === 'Yes' ? true : false }
                              value="Yes"
                            />
                        </label>
                        <span className="radio-text">Yes</span>  
                         <label className="radio-label">
                            <Radio 
                              name="balloonPayment1" 
                              type="radio" 
                              className="select-checkbox" 
                              checked={ balloonPayment1 === 'No' ? true : false }
                              value="No"
                            />
                         </label>
                        <span className="radio-text">No</span>
                      </span>                      
                    </span>
                    <span className="wrapper">
                        <FloatingLabel 
                          className="form-input" 
                          placeholder="Balloon Payment 1 Due Month" 
                          type="text" 
                          name="balloonPayment1DueMonth"
                          value={ balloonPayment1DueMonth }
                          onChange={ this._onFieldChangeNumericInt }
                          readOnly={ this.disabledBalloon }
                        /> 
                       <div className="error">{ errorBallonPayment1DueMonth }</div>
                    </span>
                </div>

                <div className="row">
                    <span className="wrapper">
                        <FloatingLabel 
                          className="form-input" 
                          placeholder="Fin Interest Rate" 
                          type="text" 
                          name="finInterestRate"
                          value={ finInterestRate }
                          onChange={ this._onFieldChangeNumericInt }
                        />      
                        <span className="percentage">%</span>         
                    </span>
                    <span className="wrapper" onChange={ this._onFieldChange }>
                        <Input 
                          className="form-input radio-input" 
                          placeholder="Balloon Payment 2" 
                          type="text" 
                          name="balloonPayment2"
                          readOnly="true"
                        />          
                        <span className="row-radio">
                         <label className="radio-label">
                            <Radio 
                              name="balloonPayment2" 
                              type="radio" 
                              className="select-checkbox" 
                              checked={ balloonPayment2 === 'Yes' ? true : false }
                              value="Yes"
                            />
                        </label>
                        <span className="radio-text">Yes</span>  
                         <label className="radio-label">
                            <Radio 
                              name="balloonPayment2" 
                              type="radio" 
                              className="select-checkbox" 
                              checked={ balloonPayment2 === 'No' ? true : false }
                              value="No"
                            />
                         </label>
                        <span className="radio-text">No</span>
                      </span>            
                    </span>
                </div>

                <div className="checkbox-div">
                    <div className="row-checkbox">
                        <label className="checkbox-label">
                            <Checkbox 
                              name="includeInProposal" 
                              type="checkbox" 
                              className="select-checkbox" 
                              checked={ includeInProposal }
                              onChange={ this._onFieldChange }
                            />
                        </label>
                        <span className="checkbox-text">Include in Proposal</span>  
                        <label className="checkbox-label">
                            <Checkbox 
                              name="includeInCustomerPortal" 
                              type="checkbox" 
                              className="select-checkbox" 
                              checked={ includeInCustomerPortal }
                              onChange={ this._onFieldChange }
                            />
                        </label>
                        <span className="checkbox-text">Include in Customer Portal</span>
                        <label className="checkbox-label">
                            <Checkbox 
                              name="optionToBuy" 
                              type="checkbox" 
                              className="select-checkbox" 
                              checked={ optionToBuy }
                              onChange={ this._onFieldChange }
                            />
                        </label>
                        <span className="checkbox-text">Option to Buy</span>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default FinanceComponent;