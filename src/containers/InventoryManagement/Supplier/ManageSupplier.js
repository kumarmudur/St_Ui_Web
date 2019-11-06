import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { GET_SUPPLIER_LIST, POST_FILTER_SUPPLIER, POST_DELETE_SUPPLIER } from '../../../actions/inventoryManagement';
import { NAVIGATION } from '../../../actions';
import ManageSupplierComponent from '../../../components/InventoryManagement/Supplier/ManageSupplierComponent';
import { manageSupplierTemplate } from '../../../utils/InventoryManagement/Templates/manageSupplier';
import { PAGE_SIZE_DEFAULT, DELETE_CONFIRM_MSG } from '../../../constants';
import { Modal, Loader, NoRecordFound  } from '../../../components/common';
import { loadData } from '../../../utils/storage';

class ManageSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false,
      showLoader: true,
      supplierId: null,
      isFilter: false,
      checkedBoxes: [],
      pageSize: PAGE_SIZE_DEFAULT
    };
    this._getSupplierListData(
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

  _getSupplierListData = data => {
    const { authToken } = this.props.Login;
    data.authToken = authToken;
    this.props.getSupplierList(data);
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

  _deleteSupplier = (id, pageSize)=> {
    this._toggleModal();
    this.setState({
      supplierId: id,
      pageSize
    });
  }

  _confirmDelete = () => {
    const { Login } = this.props;
    const { authToken } = Login;
    const { supplierId, pageSize } = this.state;
    const dataObj = {
        data: {
            id: supplierId
        },
        authToken,
        pageSize
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

 _getFilterData = data => {
  const { authToken } = this.props.Login;
  const dataObj = {
    authToken,
    pageNumber: data.pageNumber,
    pageSize: data.pageSize,
    filterColumns: this.state.checkedBoxes
  };
  this.props.postFilterSupplier(dataObj);
}


  render() {
    //const { data, recordsCount, pageNumber, dataFields, order } = this.props; // filterData,
    const { data, recordsCount, pageNumber, dataFields, order, showLoader, showDeleteModal } = this.state; //isFilter, checkedBoxes,
    /* let gridTemplate = {};
    if(isFilter) {
      gridTemplate = filterData && filterData.length > 0 ? manageSupplierTemplate(filterData, checkedBoxes) : { 'head': [], 'body': [] };
    } else {
      gridTemplate = data && data.length > 0 ? manageSupplierTemplate(data) : { 'head': [], 'body': [] };
    } */

    let gridTemplate;
    let preSelectedFilter =  loadData('manage-supplier');
    preSelectedFilter = preSelectedFilter ? preSelectedFilter.data : [];

    if(preSelectedFilter && preSelectedFilter.length>0) {
     gridTemplate = data && data.length>0 ? manageSupplierTemplate(data, preSelectedFilter) : { 'head': [], 'body': [] };
    } else {
     gridTemplate = data && data.length>0 ? manageSupplierTemplate(data) : { 'head': [], 'body': [] };
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
    view =   <ManageSupplierComponent 
      order={ order }
      supplierData={ data }
      template={ gridTemplate }
      filter = { this._filter }
      getData={ this._getSupplierListData }
      getFilterData={ this._getFilterData }
      recordsCount={ recordsCount }
      pageNumber={ pageNumber }
      deleteSupplier={ this._deleteSupplier }
      editSupplier={ this._editSupplier }
      viewSupplier={ this._viewSupplier }
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
  const { Login, GetSupplierList, PostFilterSupplier } = state;
  const data = GetSupplierList && GetSupplierList.suppliers;
  const dataFields = GetSupplierList && GetSupplierList.allFields;
  const filterData = PostFilterSupplier && PostFilterSupplier.suppliers;
  const pageNumber = GetSupplierList && GetSupplierList.pageNumber === 0 ? 1 : GetSupplierList.pageNumber;
  const recordsCount = GetSupplierList && GetSupplierList.recordsCount;
  const order = GetSupplierList.hasOwnProperty('order') ? GetSupplierList.order : 'DESC';
  
  return {
    order,
    Login,
    data,
    dataFields,
    pageNumber,
    recordsCount,
    filterData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: data => {
      return dispatch({ type: NAVIGATION, data});
    },
    getSupplierList: data => {
      return dispatch({ type: GET_SUPPLIER_LIST, data});
    },
    postFilterSupplier: data => {
      return dispatch({ type: POST_FILTER_SUPPLIER, data });
    },
    postDeleteSupplier: data => {
      return dispatch({ type: POST_DELETE_SUPPLIER, data });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSupplier);
