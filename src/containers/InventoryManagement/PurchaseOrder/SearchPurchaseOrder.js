import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { POST_SEARCH_PURCHASE_ORDER, POST_FILTER_PURCHASE_ORDER, POST_DELETE_PURCHASE_ORDER } from '../../../actions/inventoryManagement';
import { NAVIGATION } from '../../../actions';
import ManagePurchaseOrderComponent from '../../../components/InventoryManagement/PurchaseOrder/ManagePurchaseOrderComponent';
import { managePurchaseOrderTemplate } from '../../../utils/InventoryManagement/Templates/managePurchaseOrder';
import { PAGE_SIZE_DEFAULT, DELETE_CONFIRM_MSG } from '../../../constants';
import { Modal } from '../../../components/common';

class SearchPurchaseOrder extends Component {
  constructor(props) {
      super(props);
      this.state = {
        showDeleteModal: false,
        searchParams: props.searchParams,
        purchaseOrderId: null,
        isFilter: false,
        checkedBoxes: [],
        isSearch: true
      };
      this._getPurchaseOrderListData(
          {
              pageNumber: 0,
              pageSize: PAGE_SIZE_DEFAULT,
              searchParams: props.searchParams
          }
      );
  }

    componentWillReceiveProps(nextProps) {        
        if(nextProps.searchParams && nextProps.searchParams.textSearch.length > 0 && nextProps.searchParams !== this.state.searchParams) {
            this._getPurchaseOrderListData(
                {
                    pageNumber: 0,
                    pageSize: PAGE_SIZE_DEFAULT,
                    searchParams: nextProps.searchParams
                }
            );
            this.setState({
                searchParams: nextProps.searchParams
            });
        }
     }

     _getPurchaseOrderListData = data => { 
        const { authToken } = this.props.Login;
        data.authToken = authToken;
        this.props.postSearchPurchaseOrder(data);
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

    _deletePurchaseOrder = id => {
      this._toggleModal();
      this.setState({
        purchaseOrderId: id
      });
    }
  
    _confirmDelete = () => {
      const { Login } = this.props;
      const { authToken } = Login;
      const { purchaseOrderId } = this.state;
      const dataObj = {
          data: {
              id: purchaseOrderId
          },
          authToken
      };
      this.props.postDeletePurchaseOrder(dataObj);
      this._toggleModal();
   }
  

    render() {
        const { data, filterData, recordsCount, dataFields } = this.props;
        const { isFilter, checkedBoxes, showDeleteModal, isSearch, searchParams } = this.state;
        let gridTemplate = {};
        if(isFilter) {
          gridTemplate = filterData && filterData.length > 0 ? managePurchaseOrderTemplate(filterData, checkedBoxes) : { 'head': [], 'body': [] };
        } else {
          gridTemplate = data && data.length > 0 ? managePurchaseOrderTemplate(data) : { 'head': [], 'body': [] };
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
        return (
            <Fragment>
                <ManagePurchaseOrderComponent 
                  purchaseOrderData={ data }
                  template={ gridTemplate }
                  getData={ this._getPurchaseOrderListData }
                  filter = { this._filter }
                  deletePurchaseOrder={ this._deletePurchaseOrder }
                  recordsCount={ recordsCount }
                  allColumns={ dataFields }
                  isSearch={ isSearch }
                  searchParams={ searchParams }
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
    const { Login, PostSearchPurchaseOrder, PostFilterPurchaseOrder } = state;
    const data = PostSearchPurchaseOrder && PostSearchPurchaseOrder.purchaseOrders;
    const dataFields = PostSearchPurchaseOrder && PostSearchPurchaseOrder.allFields;
    const recordsCount = PostSearchPurchaseOrder && PostSearchPurchaseOrder.recordsCount;
    const filterData = PostFilterPurchaseOrder && PostFilterPurchaseOrder.purchaseOrders;
    return {
      Login,
      data,
      filterData,
      dataFields,
      recordsCount
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      navigate: data => {
        return dispatch({ type: NAVIGATION, data});
      },
      postSearchPurchaseOrder: data => {
        return dispatch({ type: POST_SEARCH_PURCHASE_ORDER, data});
      },
      postFilterPurchaseOrder: data => {
        return dispatch({ type: POST_FILTER_PURCHASE_ORDER, data });
      },
      postDeletePurchaseOrder: data => {
        return dispatch({ type: POST_DELETE_PURCHASE_ORDER, data });
      }
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(SearchPurchaseOrder);
