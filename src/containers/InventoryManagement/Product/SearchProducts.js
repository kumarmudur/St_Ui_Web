import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { POST_SEARCH_PRODUCTS, POST_FILTER_PRODUCTS, POST_DELETE_PRODUCT, GET_PRODUCT_LIST } from '../../../actions/inventoryManagement';
import { NAVIGATION } from '../../../actions';
import ManageProductsComponent from '../../../components/InventoryManagement/Product/ManageProductsComponent';
import { manageProductsTemplate } from '../../../utils/InventoryManagement/Templates/manageProducts';
import { PAGINATION, DELETE_CONFIRM_MSG } from '../../../constants';
import { Modal } from '../../../components/common';


class SearchProducts extends Component {

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
    this._getProductListData(
        {
            pageNumber: 0,
            pageSize: PAGINATION.pageSize,
            searchParams: props.searchParams
        }
     );
  }

  componentWillReceiveProps(nextProps) { 
    if(nextProps.searchParams && nextProps.searchParams.textSearch.length > 0 && nextProps.searchParams !== this.state.searchParams) {
        this._getProductListData(
            {
                pageNumber: 0,
                pageSize: PAGINATION.pageSize,
                searchParams: nextProps.searchParams
            }
        );
    }
  if(nextProps.searchParams && nextProps.searchParams.textSearch.length === 0) {
    this._getProductListData(
      {
          pageNumber: 0,
          pageSize: PAGINATION.pageSize,
          searchParams: nextProps.searchParams
      }
  );

  }
  this.setState({
    searchParams: nextProps.searchParams
  });
}

_getProductList = data => {
  const { authToken } = this.props.Login;
  data.authToken = authToken;
  this.props.getProductList(data);
}

  _getProductListData = data => {
    const { authToken } = this.props.Login;
    data.authToken = authToken;
    this.props.postSearchProducts(data);
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
    const { authToken } = this.props.Login;
    const dataObj = {
      authToken,
      pageNumber: 0,
      pageSize: PAGINATION.pageSize,
      filterColumns: checkedBoxes
    };
    this.props.postFilterProducts(dataObj);
  };

  _deleteProduct = id => {
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
      gridTemplate = filterData && filterData.length > 0 ? manageProductsTemplate(filterData, checkedBoxes) : { 'head': [], 'body': [] };
    } else {
      gridTemplate = data && data.length > 0 ? manageProductsTemplate(data) : { 'head': [], 'body': [] };
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
          <ManageProductsComponent 
            productData={ data }
            getData={ this._getProductListData }
            template={ gridTemplate }
            editProduct={ this._editProduct }
            filter = { this._filter }
            deleteProduct={ this._deleteProduct }
            recordsCount={ recordsCount }
            allColumns={ dataFields }
            isSearch={ isSearch }
            searchParams={ searchParams }
            viewProduct={ this._viewProduct }
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
  const { Login, PostSearchProducts, PostFilterProducts } = state;
  const data = PostSearchProducts && PostSearchProducts.products;
  const dataFields = PostSearchProducts && PostSearchProducts.allFields;
  const filterData = PostFilterProducts && PostFilterProducts.products;
  const recordsCount = PostSearchProducts && PostSearchProducts.recordsCount;
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
    postSearchProducts: data => {
      return dispatch({ type: POST_SEARCH_PRODUCTS, data});
    },
    navigate: data => {
      return dispatch({ type: NAVIGATION, data });
    },
    postFilterProducts: data => {
      return dispatch({ type: POST_FILTER_PRODUCTS, data });
    },
    postDeleteProduct: data => {
      return dispatch({ type: POST_DELETE_PRODUCT, data });
    },
    getProductList: data => {
      return dispatch({ type: GET_PRODUCT_LIST, data});
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchProducts);
    