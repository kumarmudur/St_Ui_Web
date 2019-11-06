import React, { Component, Fragment } from 'react';
import { Checkbox } from '../../components/common';
import {  checkNumeric } from '../../utils/utility';
import FloatingLabel from 'floating-label-react';

class PurchaseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: this._getInitialState()
    };
  }

  _getInitialState = data => {
    const obj = {
      discountAsPerPlan: data && data.discountAsPerPlan || '',
      includeInProposal: data && data.includeInProposal || false,
      includeInCustomerPortal: data && data.includeInCustomerPortal || false
    };
    return obj;
  }

  componentWillReceiveProps(nextProps) {
    let obj = {};
    const { purchasePlanData } = nextProps;
    if(purchasePlanData && purchasePlanData.proposalType ==='Purchase') {
      obj = {
        discountAsPerPlan: purchasePlanData && purchasePlanData.discountAsPerPlan || '',
        includeInProposal: purchasePlanData && purchasePlanData.includeInProposal || false,
        includeInCustomerPortal: purchasePlanData && purchasePlanData.includeInCustomerPortal || false
      };
    } else {
      obj = this._getInitialState(this.state.fields);
    }
    this.setState({
      fields: obj
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
    const { name, type, checked, value } = e.target;
    const data = type === 'checkbox' ? checked : value;
    const { fields } = this.state;
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
    }
  }
  this._callSetState();
}

  render() {
    const { discountAsPerPlan, includeInProposal, includeInCustomerPortal} = this.state.fields;
    return (
      <Fragment>
        <div className="row">
            <span className="wrapper">
              <FloatingLabel 
                className="form-input" 
                placeholder="Discount As Per Plan" 
                type="text" 
                name="discountAsPerPlan"
                value={ discountAsPerPlan }
                maxLength="50"
                onChange={ this._onFieldChangeNumeric }
              />               
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
          </div>
        </div>
      </Fragment>
    );  
  }
}

export default PurchaseComponent;