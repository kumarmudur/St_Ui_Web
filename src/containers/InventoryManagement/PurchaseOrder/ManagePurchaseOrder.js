import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { GET_PURCHASE_ORDER_LIST, POST_FILTER_PURCHASE_ORDER, POST_DELETE_PURCHASE_ORDER } from '../../../actions/inventoryManagement';
import { NAVIGATION } from '../../../actions';
import ManagePurchaseOrderComponent from '../../../components/InventoryManagement/PurchaseOrder/ManagePurchaseOrderComponent';
import { managePurchaseOrderTemplate } from '../../../utils/InventoryManagement/Templates/managePurchaseOrder';
import { PAGE_SIZE_DEFAULT, DELETE_CONFIRM_MSG } from '../../../constants';
import { Modal, Loader, NoRecordFound  } from '../../../components/common';

import { loadData } from '../../../utils/storage';

class ManagePurchaseOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false,
      purchaseOrderId: null,
      isFilter: false,
      showLoader: true,
      checkedBoxes: [],
      pageSize: PAGE_SIZE_DEFAULT
    };
    this._getPurchaseOrderListData(
      {
          pageNumber: 0,
          pageSize: PAGE_SIZE_DEFAULT
      }
    );
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

  _getPurchaseOrderListData = data => {
    const { authToken } = this.props.Login;
    data.authToken = authToken;
    this.props.getPurchaseOrderList(data);
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
    this.props.postFilterPurchaseOrder(dataObj);
  };

  _toggleModal = () => {
    this.setState({
        showDeleteModal: !this.state.showDeleteModal
    });
  }

  _deletePurchaseOrder = (id, pageSize) => {
    this._toggleModal();
    this.setState({
      purchaseOrderId: id,
      pageSize
    });
  }

  _confirmDelete = () => {
    const { Login } = this.props;
    const { authToken } = Login;
    const { purchaseOrderId, pageSize } = this.state;
    const dataObj = {
        data: {
            id: purchaseOrderId
        },
        authToken,
        pageSize
    };
    this.props.postDeletePurchaseOrder(dataObj);
    this._toggleModal();
 }

 _getFilterData = data => {
  const { authToken } = this.props.Login;
  const dataObj = {
    authToken,
    pageNumber: data.pageNumber,
    pageSize: data.pageSize,
    filterColumns: this.state.checkedBoxes
  };
  this.props.postFilterPurchaseOrder(dataObj);
}


  render() {
    //const { data, recordsCount, pageNumber, dataFields, order } = this.props; //filterData
    const { data, recordsCount, pageNumber, dataFields, order, showLoader, showDeleteModal } = this.state; //isFilter, checkedBoxes,
    //let gridTemplate = {};
    /* if(isFilter) {
      gridTemplate = filterData && filterData.length > 0 ? managePurchaseOrderTemplate(filterData, checkedBoxes) : { 'head': [], 'body': [] };
    } else {
      gridTemplate = data && data.length > 0 ? managePurchaseOrderTemplate(data) : { 'head': [], 'body': [] };
    } */
    let gridTemplate;
    let preSelectedFilter =  loadData('manage-purchase-order');
     preSelectedFilter = preSelectedFilter ? preSelectedFilter.data : [];

    if(preSelectedFilter && preSelectedFilter.length>0) {
     gridTemplate = data && data.length>0 ? managePurchaseOrderTemplate(data, preSelectedFilter) : { 'head': [], 'body': [] };
    } else {
     gridTemplate = data && data.length>0 ? managePurchaseOrderTemplate(data) : { 'head': [], 'body': [] };
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
    view =  <ManagePurchaseOrderComponent 
      order={ order }
      purchaseOrderData={ data }
      template={ gridTemplate }
      filter = { this._filter }
      getData={ this._getPurchaseOrderListData }
      getFilterData={ this._getFilterData }
      deletePurchaseOrder={ this._deletePurchaseOrder }
      recordsCount={ recordsCount }
      pageNumber={ pageNumber }
      allColumns={ dataFields }
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
  const { Login, GetPurchaseOrderList, PostFilterPurchaseOrder } = state;
  const data = GetPurchaseOrderList && GetPurchaseOrderList.purchaseOrders;
  const dataFields = GetPurchaseOrderList && GetPurchaseOrderList.allFields;
  const filterData = PostFilterPurchaseOrder && PostFilterPurchaseOrder.purchaseOrder;
  const pageNumber = GetPurchaseOrderList && GetPurchaseOrderList.pageNumber === 0 ? 1 : GetPurchaseOrderList.pageNumber;
  const recordsCount = GetPurchaseOrderList && GetPurchaseOrderList.recordsCount;
  const order = GetPurchaseOrderList.hasOwnProperty('order') ? GetPurchaseOrderList.order : 'DESC';

  return {
    order,
    Login,
    data,
    dataFields,
    filterData,
    pageNumber,
    recordsCount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: data => {
      return dispatch({ type: NAVIGATION, data});
    },
    getPurchaseOrderList: data => {
      return dispatch({ type: GET_PURCHASE_ORDER_LIST, data});
    },
    postFilterPurchaseOrder: data => {
      return dispatch({ type: POST_FILTER_PURCHASE_ORDER, data });
    },
    postDeletePurchaseOrder: data => {
      return dispatch({ type: POST_DELETE_PURCHASE_ORDER, data });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePurchaseOrder);
