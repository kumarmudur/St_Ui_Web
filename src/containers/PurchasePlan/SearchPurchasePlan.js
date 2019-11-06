import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { POST_SEARCH_PURCHASE_PLAN, POST_FILTER_PURCHASE_PLAN, POST_DELETE_PURCHASE_PLAN } from '../../actions/purchasePlan';
import { NAVIGATION } from '../../actions';
import ManagePurchasePlanComponentt from '../../components/PurchasePlan/ManagePurchasePlanComponent';
import { managePurchasePlanTemplate } from '../../utils/PurchasePlan/Templates/managePurchasePlan';
import { PAGINATION, DELETE_CONFIRM_MSG } from '../../constants';
import { Modal } from '../../components/common';

class SearchPurchasePlan extends Component {

    constructor(props) {
        super(props);
        this.state = {
          searchParams: props.searchParams,
          showDeleteModal: false,
          productId: null,
          checkedBoxes: [],
          isFilter: false,
          isSearch: true
        };
        this._getPurchasePlanListData(
            {
                pageNumber: 0,
                pageSize: PAGINATION.pageSize,
                searchParams: props.searchParams
            }
         );
      }
    
      componentWillReceiveProps(nextProps) {        
        if(nextProps.searchParams && nextProps.searchParams.textSearch.length > 0 && nextProps.searchParams !== this.state.searchParams) {
            this._getPurchasePlanListData(
                {
                    pageNumber: 0,
                    pageSize: PAGINATION.pageSize,
                    searchParams: nextProps.searchParams
                }
            );
            this.setState({
                searchParams: nextProps.searchParams
            });
        }
    }
    
    _getPurchasePlanListData = data => {
        const { authToken } = this.props.Login;
        data.authToken = authToken;
        this.props.postSearchPurchasePlan(data);
      }
    
      _toggleModal = () => {
        this.setState({
            showDeleteModal: !this.state.showDeleteModal
        });
      }
    
      _editPurchasePlan = (link, id) => {
        this.props.navigate({ currentPage: link, id });
      }

      _viewPurchasePlan = (link, id) => {
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
          pageSize: PAGINATION.pageSize,
          filterColumns: checkedBoxes
        };
        this.props.postFilterProducts(dataObj);
      };
    
      _deletePurchasePlan = id => {
        this._toggleModal();
        this.setState({
          productId: id
        });
      }
    
      _confirmDelete = () => {
        const { Login } = this.props;
        const { authToken } = Login;
        const { productId } = this.state;
        const dataObj = {
            data: {
                id: productId
            },
            authToken
        };
        this.props.postDeleteProduct(dataObj);
        this._toggleModal();
     }


    render() {
        const { data, filterData, recordsCount, dataFields } = this.props;
    const { showDeleteModal, isFilter, checkedBoxes, isSearch, searchParams } = this.state;
    let gridTemplate = {};
    if(isFilter) {
      gridTemplate = filterData && filterData.length > 0 ? managePurchasePlanTemplate(filterData, checkedBoxes) : { 'head': [], 'body': [] };
    } else {
      gridTemplate = data && data.length > 0 ? managePurchasePlanTemplate(data) : { 'head': [], 'body': [] };
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
          <ManagePurchasePlanComponentt 
            purchasePlanData={ data }
            template={ gridTemplate }
            getData={ this._getPurchasePlanListData }
            getFilterData={ this._getFilterData }
            editPurchasePlan={ this._editPurchasePlan }
            filter = { this._filter }
            deletePurchasePlan={ this._deletePurchasePlan }
            recordsCount={ recordsCount }
            allColumns={ dataFields }
            isSearch={ isSearch }
            searchParams={ searchParams }
            viewPurchasePlan={ this._viewPurchasePlan }
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
    const { Login,  PostSearchPurchasePlan, PostFilterPurchasePlan } = state;
    const data = PostSearchPurchasePlan && PostSearchPurchasePlan.purchasePlans;
    const dataFields = PostSearchPurchasePlan && PostSearchPurchasePlan.allFields;
    const filterData = PostFilterPurchasePlan && PostFilterPurchasePlan.purchasePlan;
    const recordsCount = PostSearchPurchasePlan && PostSearchPurchasePlan.recordsCount;
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
      postSearchPurchasePlan: data => {
        return dispatch({ type: POST_SEARCH_PURCHASE_PLAN, data});
      },
      navigate: data => {
        return dispatch({ type: NAVIGATION, data });
     },
     postFilterProducts: data => {
      return dispatch({ type: POST_FILTER_PURCHASE_PLAN, data });
     },
     postDeleteProduct: data => {
      return dispatch({ type: POST_DELETE_PURCHASE_PLAN, data });
     }
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(SearchPurchasePlan);
