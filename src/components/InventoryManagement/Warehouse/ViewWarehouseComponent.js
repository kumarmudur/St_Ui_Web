import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ICONS } from '../../../constants';


class ViewWarehouseComponent extends Component {
    
    _clickEditHandler = e => {
        const { warehouseId } = this.props.warehouseData;
        if(warehouseId) {
            this.props.editWarehouse(e.currentTarget.name, warehouseId);
        }
    };


    render() {
        const { warehouseData } = this.props;
        return (
            <div className="container">
                <div className="wrapper-view-warehouse">
                    <div className="warehouse-general border-separator">
                      <p>Warehouse General</p>   
                      <div className="text-align field-padding">
                         <NavLink to="#editprofile" name='EDIT_WAREHOUSE' className="img-edit-profile" onClick= { this._clickEditHandler } ><img className="imgIconCurosr" src={ ICONS.EDIT } alt="" /></NavLink>
                      </div>
                      <div className="row">
                        <div className="cols">
                            <span className="form-label">Warehouse ID</span> <span className="form-label-text">{ warehouseData && warehouseData.warehouseId }</span>
                        </div>
                        <div className="cols">
                            <span className="form-label">Warehouse Name</span> <span className="form-label-text">{ warehouseData && warehouseData.warehouseName }</span>
                        </div>
                        <div className="cols">
                            <span className="form-label">Address</span> <span className="form-label-text">{ warehouseData && warehouseData.houseNumber }</span>
                        </div>
                        <div className="cols">
                            <span className="form-label">City</span> <span className="form-label-text">{ warehouseData &&  warehouseData.city }</span>
                        </div>
                      </div> 

                      <div className="row">
                        <div className="cols">
                            <span className="form-label">State</span> <span className="form-label-text">{ warehouseData && warehouseData.state }</span>
                        </div>
                        <div className="cols">
                            <span className="form-label">Country</span> <span className="form-label-text">{ warehouseData && warehouseData.country }</span>
                        </div>
                        <div className="cols">
                            <span className="form-label">Manager Name</span> <span className="form-label-text">{ warehouseData && warehouseData.managerName }</span>
                        </div>
                        <div className="cols">
                            <span className="form-label">Manager Email</span> <span className="form-label-text">{ warehouseData && warehouseData.managerEmail }</span>
                        </div>
                      </div> 
                      
                      <div className="row">
                        <div className="cols">
                            <span className="form-label">Phone</span> <span className="form-label-text"><span className="phone-constant-readonly">+1</span>{ warehouseData && warehouseData.managerPhone }</span>
                        </div>
                        <div className="cols">
                            <span className="form-label">Status</span> <span className="form-label-text">{ warehouseData && warehouseData.status }</span>
                        </div>
                      </div> 

                    </div>
                </div>
                
            </div>
        );
    }
}

export default ViewWarehouseComponent;
