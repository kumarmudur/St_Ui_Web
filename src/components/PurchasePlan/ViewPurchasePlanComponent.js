import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ICONS } from '../../constants';
import { PROPOSALTYPE, VIEW_HANDLER, PAGE_SIZE_DEFAULT } from '../../constants';
import ViewPurchase from './ViewPurchase';
import ViewFinance from './ViewFinance';
import ViewLease from './ViewLease';

class ViewPurchasePlanComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPurchaseComponent: false,
            showFinanceComponent: false,
            showLeaseComponent: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.proposalType) {
            this._getChildComponent(nextProps.proposalType);
        }
    }

    _getChildComponent = proposalType => {
        let showFinance = false, showLease = false, showPurchase = false;
        if(proposalType === PROPOSALTYPE.FINANCE) {
          showFinance = true;
          showLease = false;
          showPurchase = false;
        } else if (proposalType === PROPOSALTYPE.PURCHASE) {
          showFinance = false;
          showLease = false;
          showPurchase = true;
        } else {
          showFinance = false;
          showLease = true;
          showPurchase = false;
        }
        this.setState({
          showFinanceComponent: showFinance,
          showLeaseComponent: showLease,
          showPurchaseComponent: showPurchase,
        });
    }

    _clickEditHandler = e => {
        const { name } = e.currentTarget;
        const { purchasePlanId } = this.props.purchasePlanData;
        if(name  === VIEW_HANDLER.DELETE) {
            this.props.deletePurchasePlan(purchasePlanId, PAGE_SIZE_DEFAULT);
        } else if(name === VIEW_HANDLER.EDIT) {
            if(purchasePlanId) {
                this.props.editPurchasePlan(e.currentTarget.name, purchasePlanId);
            }
        }
       
    };


    render() {
        const { purchasePlanData } = this.props;
        const { showFinanceComponent, showLeaseComponent, showPurchaseComponent } = this.state;
        const dynamicFields = <div className="wrapper-dynamic">
        {
          showFinanceComponent ? 
           <ViewFinance
             data={ purchasePlanData }                
           /> : null
        }
        {
          showLeaseComponent ? 
           <ViewLease 
             data={ purchasePlanData } 
           /> : null
        }
        {
          showPurchaseComponent ? 
           <ViewPurchase
             data={ purchasePlanData }
           /> : null
        }
    </div>;
        return (
            <div className="container">
                <div className="wrapper-view-purchase-plan">
                     <div className="wapper-button">
                        <span className="text-align field-padding">
                            <NavLink to="#edit_purchase_plan" name='EDIT_PURCHASE_PLAN' className="img-edit-profile" onClick= { this._clickEditHandler } ><img className="imgIconCurosr" src={ ICONS.EDIT } alt="" /></NavLink>
                        </span>
                        <span className="text-align field-padding">
                            <NavLink to="#delete_purchase_plan" name='DELETE_PURCHASE_PLAN' className="img-edit-profile" onClick= { this._clickEditHandler } ><img className="imgIconCurosr" src={ ICONS.DELETE } alt="" /></NavLink>
                        </span>
                     </div>
                     <div className="wrapper-common border-separator">
                        <div className="row">
                            <div className="cols">
                                <span className="form-label">Plan Name</span> <span className="form-label-text">{ purchasePlanData && purchasePlanData.purchasePlanName }</span>
                            </div>
                            <div className="cols">
                                <span className="form-label">Project Type</span> <span className="form-label-text">{ purchasePlanData && purchasePlanData.projectType }</span>
                            </div>
                            <div className="cols">
                                <span className="form-label">Proposal Type</span> <span className="form-label-text">{ purchasePlanData && purchasePlanData.proposalType }</span>
                            </div>
                        </div> 

                        <div className="row">
                            <div className="cols">
                                <span className="form-label">Country</span> <span className="form-label-text">{ purchasePlanData && purchasePlanData.country }</span>
                            </div>
                            <div className="cols">
                                <span className="form-label">State</span> <span className="form-label-text">{ purchasePlanData && purchasePlanData.state }</span>
                            </div>
                        </div> 
                        <div className="row">
                            <div className="cols">
                                <span className="form-label">Description</span> <span className="form-label-text">{ purchasePlanData && purchasePlanData.description }</span>
                            </div>
                        </div> 

                     </div>
                     { dynamicFields }
                </div>
            </div>
        );
    }
}

export default ViewPurchasePlanComponent;