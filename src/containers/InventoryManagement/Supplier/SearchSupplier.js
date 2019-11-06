import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { POST_SEARCH_SUPPLIER, POST_FILTER_SUPPLIER, POST_DELETE_SUPPLIER } from '../../../actions/inventoryManagement';
import { NAVIGATION } from '../../../actions';
import ManageSupplierComponent from '../../../components/InventoryManagement/Supplier/ManageSupplierComponent';
import { manageSupplierTemplate } from '../../../utils/InventoryManagement/Templates/manageSupplier';
import { PAGE_SIZE_DEFAULT, DELETE_CONFIRM_MSG } from '../../../constants';
import { Modal } from '../../../components/common';

class SearchSupplier extends Component {

  constructor(props) {
    super(props);
    this.state = {
        searchParams: props.searchParams,
        showDeleteModal: false,
        warehouseId: null,
        isFilter: false,
        checkedBoxes: [],
        isSearch: true
      };
      this._getSupplierListData(
          {
              pageNumber: 0,
              pageSize: PAGE_SIZE_DEFAULT,
              searchParams: props.searchParams
          }
       );
  }

  componentWillReceiveProps(nextProps) {        
    if(nextProps.searchParams && nextProps.searchParams.textSearch.length > 0 && nextProps.searchParams !== this.state.searchParams) {
        this._getSupplierListData(
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

 _getSupplierListData = data => {
    const { authToken } = this.props.Login;
    data.authToken = authToken;
    this.props.postSearchSupplier(data);
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
    this.props.postFilterSupplier(dataObj);
  };

  _toggleModal = () => {
    this.setState({
        showDeleteModal: !this.state.showDeleteModal
    });
  }

  _deleteSupplier = id => {
    this._toggleModal();
    this.setState({
      supplierId: id
    });
  }

  _confirmDelete = () => {
    const { Login } = this.props;
    const { authToken } = Login;
    const { supplierId } = this.state;
    const dataObj = {
        data: {
            id: supplierId
        },
        authToken
    };
    this.props.postDeleteSupplier(dataObj);
    this._toggleModal();
 }

 _editSupplier = (link, id) => {
  this.props.navigate({ currentPage: link, id });
 }

 _viewSupplier = (link, id) => {
   this.props.navigate({ currentPage: link, id });
 }


  render() {
    const { data, filterData, recordsCount, dataFields } = this.props;
    const { isFilter, checkedBoxes, showDeleteModal, isSearch, searchParams } = this.state;
    let gridTemplate = {};
    if(isFilter) {
      gridTemplate = filterData && filterData.length > 0 ? manageSupplierTemplate(filterData, checkedBoxes) : { 'head': [], 'body': [] };
    } else {
      gridTemplate = data && data.length > 0 ? manageSupplierTemplate(data) : { 'head': [], 'body': [] };
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
        <ManageSupplierComponent 
          supplierData={ data }
          template={ gridTemplate }
          filter = { this._filter }
          getData={ this._getSupplierListData }
          deleteSupplier={ this._deleteSupplier }
          editSupplier={ this._editSupplier }
          viewSupplier={ this._viewSupplier }
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
    const { Login, PostSearchSupplier, PostFilterSupplier} = state;
    const data = PostSearchSupplier && PostSearchSupplier.suppliers;
    const dataFields = PostSearchSupplier && PostSearchSupplier.allFields;
    const filterData = PostFilterSupplier && PostFilterSupplier.suppliers;
    const recordsCount = PostSearchSupplier && PostSearchSupplier.recordsCount;
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
      postSearchSupplier: data => {
        return dispatch({ type: POST_SEARCH_SUPPLIER, data});
      },
      postFilterSupplier: data => {
        return dispatch({ type: POST_FILTER_SUPPLIER, data });
      },
      postDeleteSupplier: data => {
        return dispatch({ type: POST_DELETE_SUPPLIER, data });
      }
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(SearchSupplier);
