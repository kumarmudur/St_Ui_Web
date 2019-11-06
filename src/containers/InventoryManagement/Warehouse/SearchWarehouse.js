import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { POST_SEARCH_WAREHOUSE, POST_FILTER_WAREHOUSE, POST_DELETE_WAREHOUSE } from '../../../actions/inventoryManagement';
import { NAVIGATION } from '../../../actions';
import ManageWarehouseComponent from '../../../components/InventoryManagement/Warehouse/ManageWarehouseComponent';
import { manageWarehouseTemplate } from '../../../utils/InventoryManagement/Templates/manageWarehouse';
import { PAGINATION, DELETE_CONFIRM_MSG } from '../../../constants';
import { Modal } from '../../../components/common';
class SearchWarehouse extends Component {

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
      this._getWarehouseListData(
          {
              pageNumber: 0,
              pageSize: PAGINATION.pageSize,
              searchParams: props.searchParams
          }
       );
  }

  componentWillReceiveProps(nextProps) {        
    if(nextProps.searchParams && nextProps.searchParams.textSearch.length > 0 && nextProps.searchParams !== this.state.searchParams) {
        this._getWarehouseListData(
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

  _getWarehouseListData = data => {
    const { authToken } = this.props.Login;
    data.authToken = authToken;
    this.props.postSearchWarehouse(data);
  }

  _filter = data => {
    const {isFilter, checkedBoxes} = data;

    this.setState({
      isFilter: isFilter,
      checkedBoxes: checkedBoxes
    });
    /* const { authToken } = this.props.Login;
    const dataObj = {
      authToken,
      pageNumber: 0,
      pageSize: PAGINATION.pageSize,
      filterColumns: checkedBoxes
    };
    this.props.postFilterWarehouse(dataObj); */
  };

  _toggleModal = () => {
    this.setState({
        showDeleteModal: !this.state.showDeleteModal
    });
  }

  _deleteWarehouse = id => {
    this._toggleModal();
    this.setState({
      warehouseId: id
    });
  }

  _confirmDelete = () => {
    const { Login } = this.props;
    const { authToken } = Login;
    const { warehouseId } = this.state;
    const dataObj = {
        data: {
            id: warehouseId
        },
        authToken
    };
    this.props.postDeleteWarehouse(dataObj);
    this._toggleModal();
 }

 _editWarehouse = (link, id) => {
  this.props.navigate({ currentPage: link, id });
 }

 _viewWarehouse = (link, id) => {
   this.props.navigate({ currentPage: link, id });
 }


  render() {
    const { data, filterData, recordsCount, dataFields } = this.props;
    const { showDeleteModal, isFilter, checkedBoxes, isSearch, searchParams } = this.state;
    let gridTemplate = {};
    if(isFilter) {
      gridTemplate = filterData && filterData.length > 0 ? manageWarehouseTemplate(filterData, checkedBoxes) : { 'head': [], 'body': [] };
    } else {
      gridTemplate = data && data.length > 0 ? manageWarehouseTemplate(data) : { 'head': [], 'body': [] };
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
        <ManageWarehouseComponent 
          warehouseData={ data }
          template={ gridTemplate }
          getData={ this._getWarehouseListData }
          filter = { this._filter }
          deleteWarehouse= { this._deleteWarehouse }
          editWarehouse={ this._editWarehouse }
          viewWarehouse={ this._viewWarehouse }
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
    const { Login, PostSearchWarehouse, PostFilterWarehouse } = state;
    const data = PostSearchWarehouse && PostSearchWarehouse.warehouses;
    const dataFields = PostSearchWarehouse && PostSearchWarehouse.allFields;
    const filterData = PostFilterWarehouse && PostFilterWarehouse.warehouses;
    const recordsCount = PostSearchWarehouse && PostSearchWarehouse.recordsCount;
    return {
      Login,
      data,
      dataFields,
      filterData,
      recordsCount
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
      postSearchWarehouse: data => {
        return dispatch({ type: POST_SEARCH_WAREHOUSE, data});
      },
      navigate: data => {
        return dispatch({ type: NAVIGATION, data });
     },
     postFilterWarehouse: data => {
      return dispatch({ type: POST_FILTER_WAREHOUSE, data });
    },
    postDeleteWarehouse: data => {
      return dispatch({ type: POST_DELETE_WAREHOUSE, data });
    }
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchWarehouse);
