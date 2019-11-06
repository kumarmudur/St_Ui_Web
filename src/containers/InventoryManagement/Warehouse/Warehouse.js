import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { NAVIGATION } from '../../../actions';
import { POST_ADD_WAREHOUSE, GET_WAREHOUSE_DATA, POST_EDIT_WAREHOUSE, SET_ALERT_STATUS } from '../../../actions/inventoryManagement';
import WarehouseComponent from '../../../components/InventoryManagement/Warehouse/WarehouseComponent';
import { MESSAGE } from '../../../constants';
import { Breadcrumb, Modal } from '../../../components/common';

class Warehouse extends Component {
  constructor(props) {
    super(props);
    if(props && props.id) {
      this._getWarehouseData(props.id);
    }
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


  _getWarehouseData = id => {
    const { authToken } = this.props.Login;
    this.props.getWarehouseData({ id, authToken });
  }

  _submitForm = data => {
    const { Login } = this.props;
    const { authToken } = Login;
    const id = this.props && this.props.id ? this.props.id : null;
    if(id) {
      data.warehouseId = id ? parseInt(id) : null;
      data.status = 'Active';
      const dataObj = {
        authToken,
        id,
        data
      };
      this.props.submitForm(POST_EDIT_WAREHOUSE, dataObj);
    } else {
      const dataObj = {
        authToken,
        data
      };
      this.props.submitForm(POST_ADD_WAREHOUSE, dataObj);
    }
  }

  _closeModal = () => {
    const { addDuplicate, editDuplicate } = this.state;
    this.props.setAlertStatus({ 'visible': false });
    if(!addDuplicate && !editDuplicate) {
      this._changePage();
    }
  }
 
  _changePage = () => {
   this.props.navigate({ currentPage: 'MANAGE_WAREHOUSE' });
 }

 _cancelForm = () => {
  this.props.setAlertStatus({ 'visible': false });
  this._changePage();
 }

  render() {
    const id = this.props && this.props.id ? this.props.id : null;
    const { addCode, editCode } = this.state;
    const { warehouseData, addMessage, editMessage, isAlertVisible } = this.props;
    let modalBody = '';
    if (addCode == 200) {
      modalBody =  addMessage;
    } else if(editCode == 200){
      modalBody = editMessage;
    } else if( addCode || editCode != 200) {
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
           secondTitle="Manage Warehouse"
           thirdTitle={ id ? 'Edit Warehouse' : 'Add Warehouse' }
           changePage={ this._cancelForm }
         />
         </div>
        <WarehouseComponent 
          id={ id }
          submitForm={ this._submitForm }
          cancelForm={ this._cancelForm }
          warehouseData={ warehouseData }
        />
         {/* <AlertModal 
           isShowModal={ isAlertVisible } 
           modalBody={ modalBody }
           closeModal={ this._closeModal }
         /> */}
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
  const { Login, PostAddWarehouse, GetWarehouseData, PostEditWarehouse, AlertStatus } = state;
  let addCode = PostAddWarehouse && PostAddWarehouse.code;
  let editCode = PostEditWarehouse && PostEditWarehouse.code;
  const warehouseData = GetWarehouseData && GetWarehouseData.warehouse;
  let isAlertVisible = AlertStatus && AlertStatus.visible;
  let addMessage = PostAddWarehouse && PostAddWarehouse.message;
  let addDuplicate = PostAddWarehouse && PostAddWarehouse.duplicate;
  let editMessage = PostEditWarehouse && PostEditWarehouse.message;
  let editDuplicate = PostEditWarehouse && PostEditWarehouse.duplicate;
  return {
    Login,
    addCode,
    warehouseData,
    editCode,
    isAlertVisible,
    addMessage,
    addDuplicate,
    editMessage,
    editDuplicate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAlertStatus: data => {
      return dispatch({ type: SET_ALERT_STATUS, data });
    },
    navigate: data => {
      return dispatch({ type: NAVIGATION, data });
    },
    submitForm: (type, data) => {
      return dispatch({ type, data });
    },
    getWarehouseData: data => {
      return dispatch({ type: GET_WAREHOUSE_DATA, data });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Warehouse);


