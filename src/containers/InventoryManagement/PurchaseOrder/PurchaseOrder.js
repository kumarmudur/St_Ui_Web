import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';import { GET_PO_SUPPLIER_LIST, GET_STATIC_DATA_PURCHASE_ORDER, GET_WAREHOUSE_LIST } from '../../../actions/inventoryManagement';

import PurchaseOrderComponent from '../../../components/InventoryManagement/PurchaseOrder/PurchaseOrderComponent';
import { Breadcrumb } from '../../../components/common';


class PurchaseOrder extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._getStaticDataPurchaseOrder();
    this._getPoSupplierList();
  }

  _getStaticDataPurchaseOrder = () => {
    const { authToken } = this.props.Login;
    this.props.getStaticData({ authToken });
  }

  _getPoSupplierList = () => {
    const { authToken } = this.props.Login;
    this.props.getPoSupplierList({ authToken });
  }

  _getWarehouseList = () => {
    const { authToken } = this.props.Login;
    this.props.getWarehouseList({ authToken, allWarehouse: true });
  }

    render() {
        const id = this.props && this.props.id ? this.props.id : null;
        const { staticData, suppliers, warehouses } = this.props;
        return (
            <Fragment>
                <div className="align-breadcrumb">
                  <Breadcrumb 
                    firstTitle="Manage Inventory"
                    secondTitle="Manage Purchase Order"
                    thirdTitle={ id ? 'Edit Purchase Order' : 'Create Purchase Order' }
                    changePage={ this._cancelForm }
                  />
                </div>
                <PurchaseOrderComponent 
                  staticData={ staticData }
                  suppliers={ suppliers }
                  getWarehouseList={ this._getWarehouseList }
                  warehouses={ warehouses }
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
  const { Login, GetStaticPurchaseOrder, GetPoSupplierList, GetWarehouseList } = state;
  const staticData = GetStaticPurchaseOrder && GetStaticPurchaseOrder.metaData;
  const suppliers = GetPoSupplierList && GetPoSupplierList.suppliers;
  const warehouses = GetWarehouseList && GetWarehouseList.warehouses;
  return {
    Login,
    staticData,
    suppliers,
    warehouses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStaticData: data => {
      return dispatch({ type: GET_STATIC_DATA_PURCHASE_ORDER, data});
    },
    getPoSupplierList: data => {
      return dispatch({ type: GET_PO_SUPPLIER_LIST, data});
    },
    getWarehouseList: data => {
      return dispatch({ type: GET_WAREHOUSE_LIST, data});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrder);
