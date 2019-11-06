import React, { Fragment} from 'react';
import { Checkbox} from '../../components/common';

const ViewFinance = props => {
    const { data } = props;
    return (
        <Fragment>
         <div className="wrapper-view border-separator">
            <div className="row">
                <div className="cols">
                    <span className="form-label">Term</span> <span className="form-label-text">{ data && data.termMonth }</span>
                </div>
                <div className="cols">
                    <span className="form-label">Minimum Cost kWh</span> <span className="form-label-text">{ data && data.minimumCost }</span>
                </div>
                <div className="cols">
                    <span className="form-label">Escalation Rate</span> <span className="form-label-text">{ data && data.escalationRate ? `${data.escalationRate}%` : '' } </span>
                </div>
           </div> 

           <div className="row">
                <div className="cols">
                    <span className="form-label">Plan Down Payment</span> <span className="form-label-text">{ data && data.planDownPayment }</span>
                </div>
                <div className="cols">
                    <span className="form-label">Discount As Per Plan</span> <span className="form-label-text">{ data && data.discountAsPerPlan }</span>
                </div>
                <div className="cols">
                    <span className="form-label">Interest Rate</span> <span className="form-label-text">{ data && data.interestRate ? `${data.interestRate}%` : '' }</span>
                </div>
           </div> 

           <div className="row">
                <div className="cols">
                    <span className="form-label">Depreciation</span> <span className="form-label-text">{ data && data.depreciation }</span>
                </div>
                <div className="cols">
                    <span className="form-label">Ballon Payment 1</span> <span className="form-label-text">{ data && data.balloonPayment1 }</span>
                </div>
                <div className="cols">
                    <span className="form-label">Ballon Payment 1 Due Month</span> <span className="form-label-text">{ data && data.balloonPayment1DueMonth }</span>
                </div>
           </div> 

           <div className="row">
                <div className="cols">
                    <span className="form-label">Fin Interest Rate</span> <span className="form-label-text">{ data && data.finInterestRate }</span>
                </div>
                <div className="cols">
                    <span className="form-label">Ballon  Payment 2</span> <span className="form-label-text">{ data && data.balloonPayment2 }</span>
                </div>
           </div> 
            </div>
          <div className="checkbox-div">
          <div className="row">
            <div className="cols">
                <label className="checkbox-label">
                  <Checkbox 
                    name="includeInProposal" 
                    type="checkbox" 
                    className="select-checkbox" 
                    checked={ data && data.includeInProposal }
                  />
                 <p className="checkbox-text">Include in Proposal</p>  
                </label>
            </div>
            <div className="cols">
                <label className="checkbox-label">
                  <Checkbox 
                    name="includeInCustomerPortal" 
                    type="checkbox" 
                    className="select-checkbox" 
                    checked={ data && data.includeInCustomerPortal }
                  />
                  <p className="checkbox-text">Include in Customer Portal</p>
                </label>
            </div>
            <div className="cols">
                <label className="checkbox-label">
                  <Checkbox 
                    name="includeInCustomerPortal" 
                    type="checkbox" 
                    className="select-checkbox" 
                    checked={ data && data.optionToBuy }
                  />
                  <p className="checkbox-text">Option to Buy</p> 
               </label>
            </div>
             
          </div>
         </div>
        </Fragment>
    );
};

export default ViewFinance;