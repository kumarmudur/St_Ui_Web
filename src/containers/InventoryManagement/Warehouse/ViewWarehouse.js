import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NAVIGATION } from '../../../actions';
import { GET_VIEW_WAREHOUSE_DATA } from '../../../actions/inventoryManagement';
import ViewWarehouseComponent from '../../../components/InventoryManagement/Warehouse/ViewWarehouseComponent';
import { Breadcrumb } from '../../../components/common';

class ViewWarehouse extends Component {
    constructor(props) {
        super(props);
        if(props && props.id) {
            this._getViewWarehouseData(props.id);
        }
    }

    _getViewWarehouseData = id => {
        const { authToken } = this.props.Login;
        this.props.getViewWarehouseData({ id, authToken });
    }

    _editWarehouse = (link, id) => {
        this.props.navigate({ currentPage: link, id });
    };

    _changePage = () => {
        this.props.navigate({ currentPage: 'MANAGE_WAREHOUSE' });
    }

    render() {
        const id = this.props && this.props.id ? this.props.id : null;
        const { warehouseData } = this.props;
        return (
            <Fragment>
                <div className="align-breadcrumb">
                 <Breadcrumb 
                   firstTitle="Manage Inventory"
                   secondTitle="Manage Warehouse"
                   thirdTitle="View Warehouse"
                   changePage={ this._changePage }
                 />
                </div>
                <ViewWarehouseComponent 
                  id={ id }
                  warehouseData={ warehouseData }
                  editWarehouse={ this._editWarehouse }
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { Login, GetViewWarehouse } = state;
    const warehouseData = GetViewWarehouse && GetViewWarehouse.warehouse;
    return {
        Login,
        warehouseData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getViewWarehouseData: data => {
            return dispatch({ type: GET_VIEW_WAREHOUSE_DATA, data });
        },
        navigate: data => {
            return dispatch({ type: NAVIGATION, data});
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewWarehouse);
