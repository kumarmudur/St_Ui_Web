import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NAVIGATION } from '../../actions';
import { GET_PURCHASE_PLAN_DATA, POST_DELETE_PURCHASE_PLAN } from '../../actions/purchasePlan';
import ViewPurchasePlanComponent from '../../components/PurchasePlan/ViewPurchasePlanComponent';
import { Breadcrumb, Modal } from '../../components/common';
import { DELETE_CONFIRM_MSG } from '../../constants';

class ViewPurchasePlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteModal: false,
            purchasePlanId: null
        };
        if(props && props.id) {
            this._getPurchasePlanData(props.id);
        }
    }

    _getPurchasePlanData = id => {
        const { authToken } = this.props.Login;
        this.props.getPurchasePlanData({ id, authToken });
    }

    _editPurchasePlan = (link, id) => {
        this.props.navigate({ currentPage: link, id });
    };

    _changePage = () => {
        this.props.navigate({ currentPage: 'MANAGE_PURCHASE_PLAN' });
    }

    _toggleModal = () => {
        this.setState({
            showDeleteModal: !this.state.showDeleteModal
        });
    }

    _deletePurchasePlan = (id, pageSize) => {
        this._toggleModal();
        this.setState({
          purchasePlanId: id,
          pageSize
        });
      }
    
    _confirmDelete = () => {
        const { Login } = this.props;
        const { authToken } = Login;
        const { purchasePlanId, pageSize } = this.state;
        const dataObj = {
            data: {
                id: purchasePlanId,
                pageSize
            },
            authToken
        };
        this.props.postDeletePurchasePlan(dataObj);
        this._toggleModal();
        this._changePage();
     }


    render() {
        const id = this.props && this.props.id ? this.props.id : null;
        const { purchasePlanData, planName, proposalType } = this.props;
        const { showDeleteModal } = this.state;
        const modalBody = DELETE_CONFIRM_MSG;
        const buttonMeta = [
              {
                  name: 'CANCEL',
                  class: 'btn-cancel',
                  onclick: this._toggleModal
              },
              {
                  name: 'OK',
                  class: 'btn-delete',
                  onclick: this._confirmDelete
              }
        ];
        return (
            <Fragment>
                <div className="align-breadcrumb">
                 <Breadcrumb 
                   firstTitle="Purchase Plan"
                   secondTitle="Manage Purchase Plan"
                   thirdTitle={ planName }
                   changePage={ this._changePage }
                 />
                 </div>
                <ViewPurchasePlanComponent 
                  id={ id }
                  purchasePlanData={ purchasePlanData }
                  editPurchasePlan={ this._editPurchasePlan }
                  proposalType={ proposalType }
                  deletePurchasePlan={ this._deletePurchasePlan }
                  editPurchasePlan={ this._editPurchasePlan }
                />
                <Modal 
                  title="Confirmation" 
                  isShowModal={ showDeleteModal }
                  closeModal={ this._toggleModal }
                  modalBody={ modalBody }   
                  buttons={ buttonMeta }
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { Login, GetPurchasePlanData } = state;
    const purchasePlanData = GetPurchasePlanData && GetPurchasePlanData.purchasePlan;
    let planName = GetPurchasePlanData && GetPurchasePlanData.purchasePlan && GetPurchasePlanData.purchasePlan.purchasePlanName;
    let proposalType = GetPurchasePlanData && GetPurchasePlanData.purchasePlan && GetPurchasePlanData.purchasePlan.proposalType;
    return {
        Login,
        purchasePlanData,
        planName,
        proposalType
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPurchasePlanData: data => {
            return dispatch({ type: GET_PURCHASE_PLAN_DATA, data });
        },
        navigate: data => {
            return dispatch({ type: NAVIGATION, data});
        },
        postDeletePurchasePlan: data => {
            return dispatch({ type: POST_DELETE_PURCHASE_PLAN, data });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPurchasePlan);
