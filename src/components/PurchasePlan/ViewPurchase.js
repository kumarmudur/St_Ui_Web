import React, { Fragment} from 'react';
import { Checkbox} from '../../components/common';

const ViewPurchase = props => {
    const { data } = props;
   return (
    <Fragment>
      <div className="wrapper-view border-separator">
        <div className="row">
            <div className="cols">
                <span className="form-label">Discount As Per Plan</span> 
                <span className="form-label-text">{ data && data.discountAsPerPlan }</span>
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
          </div>
        </div>
    </Fragment>
   );
};

export default ViewPurchase;