import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NAVIGATION } from '../../../actions';
import { GET_VIEW_SUPPLIER_DATA } from '../../../actions/inventoryManagement';
import ViewSupplierComponent from '../../../components/InventoryManagement/Supplier/ViewSupplierComponent';
import { Breadcrumb } from '../../../components/common';

class ViewSupplier extends Component {
    constructor(props) {
        super(props);
        if(props && props.id) {
            this._getViewSupplierData(props.id);
        }
    }

    _getViewSupplierData = id => {
        const { authToken } = this.props.Login;
        this.props.getViewSupplierData({ id, authToken });
    }

    _editSupplier = (link, id) => {
        this.props.navigate({ currentPage: link, id });
    };

    _changePage = () => {
        this.props.navigate({ currentPage: 'MANAGE_SUPPLIER' });
    }

    render() {
        const id = this.props && this.props.id ? this.props.id : null;
        const { supplierData} = this.props;
        return (
            <Fragment>
                <div className="align-breadcrumb">
                 <Breadcrumb 
                   firstTitle="Manage Inventory"
                   secondTitle="Manage Warehouse"
                   thirdTitle="View Supplier"
                   changePage={ this._changePage }
                 />
                </div>
                <ViewSupplierComponent 
                  id={ id }
                  supplierData={ supplierData }
                  editSupplier={ this._editSupplier }
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { Login, GetViewSupplier } = state;
    const supplierData = GetViewSupplier && GetViewSupplier.supplier;
    return {
        Login,
        supplierData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getViewSupplierData: data => {
            return dispatch({ type: GET_VIEW_SUPPLIER_DATA, data });
        },
        navigate: data => {
            return dispatch({ type: NAVIGATION, data});
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ViewSupplier);