import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { GET_PURCHASE_PLAN_LIST, POST_FILTER_PURCHASE_PLAN, POST_DELETE_PURCHASE_PLAN } from '../../actions/purchasePlan';
import { NAVIGATION } from '../../actions';
import ManagePurchasePlanComponent from '../../components/PurchasePlan/ManagePurchasePlanComponent';
import { managePurchasePlanTemplate } from '../../utils/PurchasePlan/Templates/managePurchasePlan';
import { DELETE_CONFIRM_MSG, PAGE_SIZE_DEFAULT } from '../../constants';
import { Modal, Loader, NoRecordFound  } from '../../components/common';
import { loadData } from '../../utils/storage';

class ManagePurchasePlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showDeleteModal: false,
          showLoader: true,
          purchasePlanId: null,
          isFilter: false,
          checkedBoxes: [],
          pageSize: PAGE_SIZE_DEFAULT
        };
        this._getPurchasePlanListData(
            {
                pageNumber: 0,
                pageSize: PAGE_SIZE_DEFAULT
            }
         );
    }
    
    componentDidMount() {
      window.scrollTo(0, 0);
   }
    
    componentWillReceiveProps(nextProps) {
      if(nextProps && nextProps.data){
        
        const { data, recordsCount, pageNumber, dataFields, order } = nextProps;
        this.setState({
          data, recordsCount, pageNumber, dataFields, order,
          showLoader: false
        });
      }
    }

    _getPurchasePlanListData = data => {
        const { authToken } = this.props.Login;
        data.authToken = authToken;
        this.props.getPurchasePlanList(data);
      }
    
      _toggleModal = () => {
        this.setState({
            showDeleteModal: !this.state.showDeleteModal
        });
      }
    
      _editPurchasePlan = (link, id) => {
        this.props.navigate({ currentPage: link, id });
      }
    
      _filter = data => {
        const {isFilter, checkedBoxes} = data;
        this.setState({
          isFilter: isFilter,
          checkedBoxes: checkedBoxes
        });
        const { authToken } = this.props.Login;
        const dataObj = {
          authToken,
          pageNumber: 0,
          pageSize: PAGE_SIZE_DEFAULT,
          filterColumns: checkedBoxes
        };
        this.props.postFilterPurchasePlan(dataObj);
      };
    
      _getFilterData = data => {
        const { authToken } = this.props.Login;
        const dataObj = {
          authToken,
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          filterColumns: this.state.checkedBoxes
        };
        this.props.postFilterPurchasePlan(dataObj);
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
                id: purchasePlanId
            },
            authToken,
            pageSize
        };
        this.props.postDeletePurchasePlan(dataObj);
        this._toggleModal();
     }

     _viewPurchasePlan = (link, id) => {
      this.props.navigate({ currentPage: link, id });
    }

    _editPurchasePlan = (link, id) => {
      this.props.navigate({ currentPage: link, id });
    };

    render() {
        //const { data , recordsCount, pageNumber, dataFields, order } = this.props; //filterData
        const { data , recordsCount, pageNumber, dataFields, order, showLoader, showDeleteModal } = this.state; //, isFilter, checkedBoxes
        /* if(isFilter) {
          gridTemplate = filterData && filterData.length > 0 ? managePurchasePlanTemplate(filterData, checkedBoxes) : { 'head': [], 'body': [] };
        } else {
          gridTemplate = data && data.length > 0 ? managePurchasePlanTemplate(data) : { 'head': [], 'body': [] };
        } */

        let gridTemplate;
        let preSelectedFilter =  loadData('purchase-plans');
        preSelectedFilter = preSelectedFilter ? preSelectedFilter.data : [];

        if(preSelectedFilter && preSelectedFilter.length>0) {
         gridTemplate = data && data.length>0 ? managePurchasePlanTemplate(data, preSelectedFilter) : { 'head': [], 'body': [] };
        } else {
         gridTemplate = data && data.length>0 ? managePurchasePlanTemplate(data) : { 'head': [], 'body': [] };
        }


        const modalBody = DELETE_CONFIRM_MSG;
        const buttonMeta = [
              {
                  name: 'Cancel',
                  class: 'btn-cancel',
                  onclick: this._toggleModal
              },
              {
                  name: 'Ok',
                  class: 'btn-delete',
                  onclick: this._confirmDelete
              }
        ];

        let view = showLoader ? <Loader /> : <NoRecordFound />;
        if(!showLoader && data && data.length>0) {

          view =    <ManagePurchasePlanComponent
            order={ order }
            purchasePlanData={ data }
            template={ gridTemplate }
            getData={ this._getPurchasePlanListData }
            getFilterData={ this._getFilterData }
            editPurchasePlan={ this._editPurchasePlan }
            filter = { this._filter }
            deletePurchasePlan={ this._deletePurchasePlan }
            recordsCount={ recordsCount }
            pageNumber={ pageNumber }
            allColumns={ dataFields }
            viewPurchasePlan={ this._viewPurchasePlan }
                    />;
        }

        
        return (
            <Fragment>
             { view }
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
    const { Login, GetPurchasePlanList, PostFilterPurchasePlan } = state;
    const data = GetPurchasePlanList && GetPurchasePlanList.purchasePlans;
    const dataFields = GetPurchasePlanList && GetPurchasePlanList.allFields;
    const filterData = PostFilterPurchasePlan && PostFilterPurchasePlan.purchasePlan;
    const recordsCount = GetPurchasePlanList && GetPurchasePlanList.recordsCount;
    const order = GetPurchasePlanList.hasOwnProperty('order') ? GetPurchasePlanList.order : 'DESC';

    return {
      order,
      Login,
      data,
      filterData,
      recordsCount,
      dataFields
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      navigate: data => {
        return dispatch({ type: NAVIGATION, data});
      },
      getPurchasePlanList: data => {
        return dispatch({ type: GET_PURCHASE_PLAN_LIST, data});
      },
      postFilterPurchasePlan: data => {
        return dispatch({ type: POST_FILTER_PURCHASE_PLAN, data });
      },
      postDeletePurchasePlan: data => {
        return dispatch({ type: POST_DELETE_PURCHASE_PLAN, data });
      }
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(ManagePurchasePlan);
