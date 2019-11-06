import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { GET_STATIC_DATA_MANAGE_PRODUCT, GET_PRODUCT_LIST, POST_FILTER_PRODUCTS, POST_DELETE_PRODUCT } from '../../../actions/inventoryManagement';
import { NAVIGATION } from '../../../actions';
import ManageProductsComponent from '../../../components/InventoryManagement/Product/ManageProductsComponent';
import { manageProductsTemplate } from '../../../utils/InventoryManagement/Templates/manageProducts';
import { DELETE_CONFIRM_MSG, PAGE_SIZE_DEFAULT } from '../../../constants';
import { Modal, Loader, NoRecordFound  } from '../../../components/common';
import { loadData } from '../../../utils/storage';

class ManageProducts extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showLoader: true,
      showDeleteModal: false,
      productId: null,
      isFilter: false,
      checkedBoxes: [],
      pageSize: PAGE_SIZE_DEFAULT
    };
    this._getStaticData();
    this._getProductListData(
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

  _getStaticData = () => {
    const { authToken } = this.props.Login;
    this.props.getStaticData({ authToken });
  }

  _getProductListData = data => {
    const { authToken } = this.props.Login;
    data.authToken = authToken;
    this.props.getProductList(data);
  }

  _toggleModal = () => {
    this.setState({
        showDeleteModal: !this.state.showDeleteModal
    });
  }

  _editProduct = (link, id) => {
    this.props.navigate({ currentPage: link, id });
  }

  _viewProduct = (link, id) => {
    this.props.navigate({ currentPage: link, id });
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
      pageSize: PAGE_SIZE_DEFAULT,
      filterColumns: checkedBoxes
    };
    this.props.postFilterProducts(dataObj); */
  };

  _getFilterData = data => {
    const { authToken } = this.props.Login;
    const dataObj = {
      authToken,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      filterColumns: this.state.checkedBoxes
    };
    this.props.postFilterProducts(dataObj);
  }

  _deleteProduct = (id, pageSize) => {
    this._toggleModal();
    this.setState({
      productId: id,
      pageSize
    });
  }

  _confirmDelete = () => {
    const { Login } = this.props;
    const { authToken } = Login;
    const { productId, pageSize } = this.state;
    const dataObj = {
        data: {
            id: productId
        },
        authToken,
        pageSize
    };
    this.props.postDeleteProduct(dataObj);
    this._toggleModal();
 }

  render() {
    //const { data, recordsCount, pageNumber, dataFields, order } = this.props;
    const { showDeleteModal, data, recordsCount, pageNumber, dataFields, order, showLoader } = this.state; 
    //, isFilter, checkedBoxes

    // let gridTemplate = {};
    // if(isFilter) {
    //   gridTemplate = data && data.length > 0 ? manageProductsTemplate(data, checkedBoxes) : { 'head': [], 'body': [] };
    // } else {
    //   gridTemplate = data && data.length > 0 ? manageProductsTemplate(data) : { 'head': [], 'body': [] };
    // }

    let preSelectedFilter =  loadData('manage-products');
    preSelectedFilter = preSelectedFilter ? preSelectedFilter.data : [];
    let gridTemplate;
    if(preSelectedFilter && preSelectedFilter.length>0) {
     gridTemplate = data && data.length>0 ? manageProductsTemplate(data, preSelectedFilter) : { 'head': [], 'body': [] };
    } else {
     gridTemplate = data && data.length>0 ? manageProductsTemplate(data) : { 'head': [], 'body': [] };
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
      view = <ManageProductsComponent
        order={ order }
        productData={ data }
        template={ gridTemplate }
        getData={ this._getProductListData }
        getFilterData={ this._getFilterData }
        editProduct={ this._editProduct }
        filter = { this._filter }
        deleteProduct={ this._deleteProduct }
        recordsCount={ recordsCount }
        pageNumber={ pageNumber }
        allColumns={ dataFields }
        viewProduct={ this._viewProduct }
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
  const { Login, GetStaticDataManageProducts, GetProductList, PostFilterProducts } = state;
  const data = GetProductList && GetProductList.products;
  const dataFields = GetProductList && GetProductList.allFields;
  const filterData = PostFilterProducts && PostFilterProducts.products;
  const pageNumber = GetProductList && GetProductList.pageNumber === 0 ? 1 : GetProductList.pageNumber;
  const recordsCount = GetProductList && GetProductList.recordsCount;

  const order = GetProductList.hasOwnProperty('order') ? GetProductList.order : 'DESC';

  return {
    order,
    Login,
    GetStaticDataManageProducts,
    data,
    filterData,
    recordsCount,
    pageNumber,
    dataFields
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: data => {
      return dispatch({ type: NAVIGATION, data});
    },
    getStaticData: data => {
      return dispatch({ type: GET_STATIC_DATA_MANAGE_PRODUCT, data });
    },
    getProductList: data => {
      return dispatch({ type: GET_PRODUCT_LIST, data});
    },
    postFilterProducts: data => {
      return dispatch({ type: POST_FILTER_PRODUCTS, data });
    },
    postDeleteProduct: data => {
      return dispatch({ type: POST_DELETE_PRODUCT, data });
    }
  };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(ManageProducts);