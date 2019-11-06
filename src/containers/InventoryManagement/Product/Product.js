import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { GET_STATIC_DATA_PRODUCT, GET_PRODUCT_DATA, POST_EDIT_PRODUCT, POST_ADD_PRODUCT, SET_ALERT_STATUS, GET_WAREHOUSE_LIST, 
  POST_PRODUCT_IMAGE_UPLOAD, GET_MODULE_LIST, GET_MODULE_MAPPING_DATA, 
  GET_PRODUCT_PARTS, GET_CONFIG_FIELDS_LIST } from '../../../actions/inventoryManagement';
import { NAVIGATION } from '../../../actions';
import { MESSAGE } from '../../../constants';
import ProductComponent from '../../../components/InventoryManagement/Product/ProductComponent';
import { Breadcrumb, Modal } from '../../../components/common';
import { warehouseFilteredList } from '../../../utils/locationFilter';
import { setProductPayload } from '../../../utils/InventoryManagement/product';
class Product extends Component {
  constructor(props) {
    super(props);
    if(props && props.id) {
      this._getProductData( props.id );
    }
    this._getStaticData();
    this._getWarehouseList();
    this._getConfigData();
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
      addCode,
      editCode,
      addDuplicate,
      editDuplicate
    });
  }

  _getStaticData = () => {
    const { authToken } = this.props.Login;
    this.props.getStaticData({ authToken });
  }

  _getWarehouseList = () => {
    const { authToken } = this.props.Login;
    this.props.getWarehouseList({ authToken, allWarehouse: true });
  }

  _getProductData = id => {
    const { authToken } = this.props.Login;
    this.props.getProductData({ id, authToken });
    this._getModuleList();
    this._getProductParts();
  }

  _getConfigData = () => {
    const { authToken } = this.props.Login;
    this.props.getConfigData({ authToken });
  }

  _submitForm = data => {
   const { Login, id } = this.props;
   const { authToken } = Login;
   data = setProductPayload(data);

   if(id) {
     data.productId = parseInt(id);
     data.status = 'Active';
     const dataObj = {
       authToken,
       id,
       data,
     };
     this.props.submitForm(POST_EDIT_PRODUCT, dataObj);
   } else {
     const dataObj = {
       authToken,
       data
     };
     this.props.submitForm(POST_ADD_PRODUCT, dataObj);
   }
  }

  _productImageUpload = file => {
    const { Login} = this.props;
    const { authToken } = Login;
    const dataObj = {
      authToken,
      file
    };
    this.props.uploadImage(dataObj);
  }

  _closeModal = () => {
    const { addDuplicate, editDuplicate } = this.state;
    this.props.setAlertStatus({ 'visible': false });
    if(!addDuplicate && !editDuplicate) {
      this._changePage();
    }
  }

  _changePage = () => {
    this.props.navigate({ currentPage: 'MANAGE_PRODUCTS' });
  }

  _cancelForm = () => {
    this.props.setAlertStatus({ 'visible': false });
    this._changePage();
  }

  _getModuleList = () => {
    const { authToken } = this.props.Login;
    this.props.getModuleList({ authToken });
  }

  _getModuleMappingData = id => {
    const { authToken } = this.props.Login;
    this.props.getModuleMappingData({ id, authToken });
  }

  _getProductParts = () => {
    const { authToken } = this.props.Login;
    this.props.getProductParts({ authToken });
  }

  render() {
    const id = this.props && this.props.id ? this.props.id : null;
    const { staticData, productValue, warehouses, imageUploadResponse, 
      modules, inverters, optimizers, productParts, configurations, page, addMessage, editMessage, isAlertVisible } = this.props;
    const { addCode, editCode } = this.state;
    const warehouseList = warehouses && warehouseFilteredList(warehouses);
    let productData = this.props && page === 'edit_mode' && productValue ? productValue : null ;
    let modalBody = '';
    if (addCode == 200) {
      modalBody =  addMessage;
    } else if(editCode == 200){
      modalBody = editMessage;
    }  else if( addCode || editCode != 200) {
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
          firstTitle="Manage Inventory"
          secondTitle="Manage Products"
          thirdTitle={ id ? 'Edit Product' : 'Add Product' }
          changePage={ this._cancelForm }
        />
        </div>
        <ProductComponent 
          id={ id }
          staticData={ staticData }
          submitForm={ this._submitForm }
          cancelForm={ this._cancelForm }
          productData={ productData }
          warehouseList={ warehouseList }
          productImageUpload={ this._productImageUpload }
          imageUploadResponse={ imageUploadResponse }
          getModuleList={ this._getModuleList }
          modules={ modules }
          getModuleMappingData={ this._getModuleMappingData }
          inverters={ inverters }
          optimizers={ optimizers }
          getProductParts={ this._getProductParts }
          productPartsList={ productParts }
          configurationsList={ configurations }
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
  const { Login, GetStaticDataProduct, GetProductData, PostAddProduct,  AlertStatus, 
    GetWarehouseList, PostProductImageUpload, PostEditProduct, GetModuleList, 
    GetModuleMappingData, GetConfigFieldsList } = state;
  const staticData = GetStaticDataProduct && GetStaticDataProduct.metaData;
  let addCode = PostAddProduct && PostAddProduct.code;
  let addMessage = PostAddProduct && PostAddProduct.message;
  let addDuplicate = PostAddProduct && PostAddProduct.duplicate;
  let editCode = PostEditProduct && PostEditProduct.code;
  let editMessage = PostEditProduct && PostEditProduct.message;
  let editDuplicate = PostEditProduct && PostEditProduct.duplicate;
  const productValue = GetProductData && GetProductData.product;
  let isAlertVisible = AlertStatus && AlertStatus.visible;
  const warehouses = GetWarehouseList && GetWarehouseList.warehouses;
  const imageUploadResponse = PostProductImageUpload;
  const modules = GetModuleList && GetModuleList.products;
  const inverters = GetModuleMappingData && GetModuleMappingData.inverters;
  const optimizers = GetModuleMappingData && GetModuleMappingData.optimizers;
  const productParts = GetModuleMappingData && GetModuleMappingData.otherParts;
  const configurations = GetConfigFieldsList && GetConfigFieldsList.configurations;
  return {
    Login,
    staticData,
    productValue,
    addCode,
    editCode,
    addMessage,
    editMessage,
    addDuplicate,
    editDuplicate,
    isAlertVisible,
    warehouses,
    imageUploadResponse,
    modules,
    inverters,
    optimizers,
    productParts,
    configurations
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStaticData: data => {
      return dispatch({ type: GET_STATIC_DATA_PRODUCT, data });
    },
    navigate: data => {
      return dispatch({ type: NAVIGATION, data });
    },
    submitForm: (type, data) => {
      return dispatch({ type, data });
    },
    getProductData: data => {
      return dispatch({ type: GET_PRODUCT_DATA, data });
    },
    setAlertStatus: data => {
      return dispatch({ type: SET_ALERT_STATUS, data });
    },
    getWarehouseList: data => {
      return dispatch({ type: GET_WAREHOUSE_LIST, data});
    },
    uploadImage: data => {
      return dispatch({ type: POST_PRODUCT_IMAGE_UPLOAD, data });
    },
    getModuleList: data => {
      return dispatch({ type: GET_MODULE_LIST, data});
    },
    getModuleMappingData: data => {
      return dispatch({ type: GET_MODULE_MAPPING_DATA, data });
    },
    getProductParts: data => {
      return dispatch({ type: GET_PRODUCT_PARTS, data });
    },
    getConfigData: data => {
      return dispatch({ type: GET_CONFIG_FIELDS_LIST, data});
    }
  };
};





export default connect(mapStateToProps, mapDispatchToProps)(Product);