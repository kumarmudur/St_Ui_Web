import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NAVIGATION, SET_ALERT_STATUS, GET_COUNTRY, GET_STATES } from '../../actions';
import { GET_STATIC_DATA_PURCHASE_PLAN, POST_ADD_PURCHASE_PLAN, GET_PURCHASE_PLAN_DATA, POST_EDIT_PURCHASE_PLAN } from '../../actions/purchasePlan';
import { Breadcrumb, Modal } from '../../components/common';
import PurchasePlanComponent from '../../components/PurchasePlan/PurchasePlanComponent';
import { MESSAGE } from '../../constants';

class PurchasePlan extends Component {
    constructor(props) {
        super(props);
        this._getStaticData();
        this._getCountry();
        if(props && props.id) {
            this._getPurchasePlanData(props.id);
        }
        this.state = {
            addCode: null,
            editCode: null,
            addDuplicate: false,
            editDuplicate: false
        };
    }

    componentWillReceiveProps(nextProps) {
        let addCode = null, editCode = null, addDuplicate = false, editDuplicate = false;
        if(nextProps.id) {
          addCode = null,
          editCode = nextProps.editCode ? nextProps.editCode : null;
          addDuplicate= false;
          editDuplicate = nextProps.editDuplicate ? nextProps.editDuplicate : false;
        } else {
          addCode = nextProps.addCode ? nextProps.addCode : null,
          editCode = null;
          addDuplicate= nextProps.addDuplicate ? nextProps.addDuplicate : false;
          editDuplicate = false;
        }
        this.setState({
          addCode: addCode,
          editCode: editCode,
          addDuplicate,
          editDuplicate
        });
    }

    _getPurchasePlanData = id => {
        const { authToken } = this.props.Login;
        this.props.getPurchasePlanData({ id, authToken });
    }

    _getStaticData = () => {
        const { authToken } = this.props.Login;
        this.props.getStaticData({ authToken });
    }

    _getCountry = () => {
        this.props.getCountryData();
    }

    _getStates = data => {
        this.props.getStatesData({ 'countryName': data });
    }

    _submitForm = data => {
        const { Login } = this.props;
        const { authToken } = Login;
        const id = this.props && this.props.id ? this.props.id : null;
        if(id) {
          data.purchasePlanId = id ? parseInt(id) : null;
          data.status = 'Active';
          const dataObj = {
            authToken,
            id,
            data
          };
          this.props.submitForm(POST_EDIT_PURCHASE_PLAN, dataObj);
        } else {
          const dataObj = {
            authToken,
            data
          };
          this.props.submitForm(POST_ADD_PURCHASE_PLAN, dataObj);
        }
    }

    _closeModal = () => {
      const { addDuplicate, editDuplicate } = this.state;
      this.props.setAlertStatus({ 'visible': false });
      if(!addDuplicate && !editDuplicate) {
        this._changePage();
      }
    }

    _changePage = () => {
        this.props.navigate({ currentPage: 'MANAGE_PURCHASE_PLAN' });
    }

    _cancelForm = () => {
      this.props.setAlertStatus({ 'visible': false });
      this._changePage();
    }
   
    render() {
        const id = this.props && this.props.id ? this.props.id : null;
        const { staticData, country, states, isAlertVisible, purchasePlanData, page, addMessage, editMessage } = this.props;
        let purchasePlan = this.props && page === 'edit_mode' && purchasePlanData ? purchasePlanData : null ;
        const { addCode, editCode } = this.state;
        let modalBody = '';
        if (addCode === 200) {
          modalBody = addMessage;
        } else if(editCode === 200){
          modalBody = editMessage;
        } else if( addCode || editCode !== 200) {
          modalBody = MESSAGE.ERROR;
        }
        const buttonMeta = [
          {
              name: 'Ok',
              class: 'btn-delete',
              onclick: this._closeModal
          }
        ];
        return (
            <Fragment>
              <div className="align-breadcrumb">
                 <Breadcrumb 
                   firstTitle="Purchase Plan"
                   secondTitle="Manage Purchase Plan"
                   thirdTitle={ id ? 'Edit Purchase Plan' : 'Add Purchase Plan' }
                   changePage={ this._cancelForm }
                 />
                </div>
                 <PurchasePlanComponent 
                   id={ id }
                   staticData={ staticData }
                   submitForm={ this._submitForm }
                   cancelForm={ this._cancelForm }
                   countryList={ country } 
                   getStates={ this._getStates }
                   statesList={ states }
                   purchasePlanData={ purchasePlan }
                   page={ page }
                 />
                 <Modal
                   title="Message" 
                   isShowModal={ isAlertVisible } 
                   modalBody={ modalBody }
                   closeModal={ this._closeModal }
                   buttons={ buttonMeta }
                 />
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { Login, GetStaticDataPurchasePlan, Country, States, AlertStatus, PostAddPurchasePlan, GetPurchasePlanData, PostEditPurchasePlan } = state;
    const staticData = GetStaticDataPurchasePlan && GetStaticDataPurchasePlan.metaData;
    const country = Country;
    const states = States && States.details && States.details.regionalBlocs;
    let isAlertVisible = AlertStatus && AlertStatus.visible;
    let addCode = PostAddPurchasePlan && PostAddPurchasePlan.code;
    let addMessage = PostAddPurchasePlan && PostAddPurchasePlan.message;
    let addDuplicate = PostAddPurchasePlan && PostAddPurchasePlan.duplicate;
    let editCode = PostEditPurchasePlan && PostEditPurchasePlan.code;
    let editMessage = PostEditPurchasePlan && PostEditPurchasePlan.message;
    let editDuplicate = PostEditPurchasePlan && PostEditPurchasePlan.duplicate;
    const purchasePlanData = GetPurchasePlanData && GetPurchasePlanData.purchasePlan;
    return {
        Login,
        staticData,
        country,
        states,
        isAlertVisible,
        addCode,
        addMessage,
        addDuplicate,
        editCode,
        editMessage,
        editDuplicate,
        purchasePlanData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: data => {
            return dispatch({ type: NAVIGATION, data });
        },
        setAlertStatus: data => {
            return dispatch({ type: SET_ALERT_STATUS, data });
        },
        getStaticData: data => {
            return dispatch({ type: GET_STATIC_DATA_PURCHASE_PLAN, data });
        },
        submitForm: (type, data) => {
            return dispatch({ type, data });
        },
        getCountryData: () => {
            return dispatch({ type: GET_COUNTRY });
        },
        getStatesData: data => {
            return dispatch({ type: GET_STATES, data});
        },
        getPurchasePlanData: data => {
            return dispatch({ type: GET_PURCHASE_PLAN_DATA, data });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchasePlan);
