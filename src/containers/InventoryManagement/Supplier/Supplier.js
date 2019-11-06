import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NAVIGATION } from '../../../actions';
import { SET_ALERT_STATUS, POST_ADD_SUPPLIER, POST_EDIT_SUPPLIER, GET_SUPPLIER_DATA } from '../../../actions/inventoryManagement';
import SupplierComponent from '../../../components/InventoryManagement/Supplier/SupplierComponent';
import { MESSAGE } from '../../../constants';
import { Breadcrumb, Modal } from '../../../components/common';

class Supplier extends Component {
    constructor(props) {
        super(props);
        if(props && props.id) {
          this._getSupplierData(props.id);
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

    _getSupplierData = id => {
      const { authToken } = this.props.Login;
      this.props.getSupplierData({ id, authToken });
    }

    _submitForm = data => {
      const { Login, id } = this.props;
      const { authToken } = Login;
      if(id) {
        data.supplierId = parseInt(id);
        data.status = 'Active';
        const dataObj = {
          authToken,
          id,
          data,
        };
        this.props.submitForm(POST_EDIT_SUPPLIER, dataObj);
      } else {
        const dataObj = {
          authToken,
          data
        };
        this.props.submitForm(POST_ADD_SUPPLIER, dataObj);
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
     this.props.navigate({ currentPage: 'MANAGE_SUPPLIER' });
   }

   _cancelForm = () => {
    this.props.setAlertStatus({ 'visible': false });
    this._changePage();
   }

    render() {
        const id = this.props && this.props.id ? this.props.id : null;
        const { addCode, editCode } = this.state;
        const { supplierData, addMessage, editMessage, isAlertVisible } = this.props;
        let modalBody = '';
        if (addCode === 200) {
          modalBody =  addMessage;
        } else if(editCode === 200){
          modalBody = editMessage;
        } else if( addCode || editCode !== 200) {
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
                   secondTitle="Manage Supplier"
                   thirdTitle={ id ? 'Edit Supplier' : 'Add Supplier' }
                   changePage={ this._cancelForm }
                 />
              </div>
                <SupplierComponent 
                  id={ id }
                  submitForm={ this._submitForm }
                  cancelForm={ this._cancelForm }
                  supplierData={ supplierData }
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
    const { Login, PostAddSupplier, AlertStatus, GetSupplierData, PostEditSupplier } = state;
    let addCode = PostAddSupplier && PostAddSupplier.code;
    let addMessage = PostAddSupplier && PostAddSupplier.message;
    let addDuplicate = PostAddSupplier && PostAddSupplier.duplicate;
    let editCode = PostEditSupplier && PostEditSupplier.code;
    let editMessage = PostEditSupplier && PostEditSupplier.message;
    let editDuplicate = PostEditSupplier && PostEditSupplier.duplicate;
    let isAlertVisible = AlertStatus && AlertStatus.visible;
    const supplierData = GetSupplierData && GetSupplierData.supplier;
    return {
      Login,
      addCode,
      addMessage,
      addDuplicate,
      editCode,
      editMessage,
      editDuplicate,
      isAlertVisible,
      supplierData
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
      getSupplierData: data => {
        return dispatch({ type: GET_SUPPLIER_DATA, data });
      }
    };
};
  

export default connect(mapStateToProps, mapDispatchToProps)(Supplier);
