/* eslint-disable react/jsx-closing-bracket-location */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { GET_WAREHOUSE_LIST, POST_FILTER_WAREHOUSE, POST_DELETE_WAREHOUSE } from '../../../actions/inventoryManagement';
import { NAVIGATION } from '../../../actions';
import ManageWarehouseComponent from '../../../components/InventoryManagement/Warehouse/ManageWarehouseComponent';
import { manageWarehouseTemplate } from '../../../utils/InventoryManagement/Templates/manageWarehouse';
import { DELETE_CONFIRM_MSG, PAGE_SIZE_DEFAULT } from '../../../constants';
import { Modal, Loader, NoRecordFound  } from '../../../components/common';
import { loadData } from '../../../utils/storage';

class ManageWarehouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false,
      showLoader: true,
      warehouseId: null,
      isFilter: false,
      checkedBoxes: [],
      pageSize: PAGE_SIZE_DEFAULT
    };
    this._getWarehouseListData(
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

  _getWarehouseListData = data => {
    const { authToken } = this.props.Login;
    data.authToken = authToken;
    this.props.getWarehouseList(data);
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
    this.props.postFilterWarehouse(dataObj);
  };

  _toggleModal = () => {
    this.setState({
        showDeleteModal: !this.state.showDeleteModal
    });
  }

  _deleteWarehouse = (id, pageSize) => {
    this._toggleModal();
    this.setState({
      warehouseId: id,
      pageSize
    });
  }

  _confirmDelete = () => {
    const { Login } = this.props;
    const { authToken } = Login;
    const { warehouseId, pageSize } = this.state;
    const dataObj = {
        data: {
            id: warehouseId
        },
        authToken,
        pageSize
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

 _getFilterData = data => {

  this.setState({
    isFilter: true,
    checkedBoxes: data.checkedBoxes
  });
 /* const { authToken } = this.props.Login;
   const dataObj = {
    authToken,
    pageNumber: data.pageNumber,
    pageSize: data.pageSize,
    filterColumns: this.state.checkedBoxes
  };
  this.props.postFilterWarehouse(dataObj); */
}

  render() {
    //const { data, recordsCount, pageNumber, dataFields, order } = this.props;
    const {  data, recordsCount, pageNumber, dataFields, order, showLoader, showDeleteModal } = this.state; //isFilter, checkedBoxes,
   /*  let gridTemplate = {};
    if(isFilter) {
      gridTemplate = data && data.length > 0 ? manageWarehouseTemplate(data, checkedBoxes) : { 'head': [], 'body': [] };
    } else {
      gridTemplate = data && data.length > 0 ? manageWarehouseTemplate(data) : { 'head': [], 'body': [] };
    } */

    let preSelectedFilter =  loadData('manage-warehouse');
       preSelectedFilter = preSelectedFilter ? preSelectedFilter.data : [];
       let gridTemplate;
       if(preSelectedFilter && preSelectedFilter.length>0) {
        gridTemplate = data && data.length>0 ? manageWarehouseTemplate(data, preSelectedFilter) : { 'head': [], 'body': [] };
       } else {
        gridTemplate = data && data.length>0 ? manageWarehouseTemplate(data) : { 'head': [], 'body': [] };
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
    view =   <ManageWarehouseComponent 
      order={ order }
      warehouseData={ data }
      template={ gridTemplate }
      filter = { this._filter }
      deleteWarehouse= { this._deleteWarehouse }
      editWarehouse={ this._editWarehouse }
      getData={ this._getWarehouseListData }
      getFilterData={ this._getFilterData }
      recordsCount={ recordsCount }
      pageNumber={ pageNumber }
      viewWarehouse={ this._viewWarehouse }
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
  const { Login, GetWarehouseList, PostFilterWarehouse } = state;
  const data = GetWarehouseList && GetWarehouseList.warehouses;
  const dataFields = GetWarehouseList && GetWarehouseList.allFields;
  const filterData = PostFilterWarehouse && PostFilterWarehouse.warehouses;
  const pageNumber = GetWarehouseList && GetWarehouseList.pageNumber === 0 ? 1 : GetWarehouseList.pageNumber;
  const recordsCount = GetWarehouseList && GetWarehouseList.recordsCount;
  const order = GetWarehouseList.hasOwnProperty('order') ? GetWarehouseList.order : 'DESC';

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
    getWarehouseList: data => {
      return dispatch({ type: GET_WAREHOUSE_LIST, data});
    },
    postFilterWarehouse: data => {
      return dispatch({ type: POST_FILTER_WAREHOUSE, data });
    },
    postDeleteWarehouse: data => {
      return dispatch({ type: POST_DELETE_WAREHOUSE, data });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageWarehouse);
