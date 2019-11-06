import React, { Component } from 'react';
import { connect } from 'react-redux';
import { POST_ADD_BULK_IMPORT, NAVIGATION, SET_ALERT_STATUS } from '../../actions';
import AddBulkImportComponent  from '../../components/UserManagement/AddBulkImportComponent';
import Modal from '../../components/common/Modal';
import { Breadcrumb } from '../../components/common';
import { USER_INFO } from '../../constants';

class AddBulkImport extends Component {


    _submitForm = (file, importMode) => {
        this.props.submitForm( file, importMode );
    }

    _closeModal = () => {
        this.props.setAlertStatus({ 'visible': false });
        this._changePage();
    }

    _changePage = () => {
        this.props.navigate({ currentPage: 'VIEW_BULK_IMPORT' });
    }

    render() {
    const { isAlertVisible } = this.props;
    const buttonMeta = [
        {
            name: 'Ok',
            class: 'btn-delete',
            onclick: this._closeModal
        }
    ];
    return (
        <div className="container">
           <div className="bulk-import-Breadcrumb">
            <Breadcrumb 
              firstTitle="User Management"
              secondTitle="Manage Bulk Import"
              thirdTitle="Bulk Import"
              changePage={ this._changePage }
              className='user-management-bread-crumb'
            />
          </div> 
          <AddBulkImportComponent  submitForm={ this._submitForm }/>
          <Modal 
            title="Message" 
            isShowModal={ isAlertVisible } 
            modalBody={ USER_INFO.BULK_IMPORT_MSG }
            closeModal={ this._closeModal }
            buttons={ buttonMeta }
          />
        </div>
      );
    }
}

const mapStateToProps = state => {
    const { AlertStatus } = state;
    return {
        isAlertVisible: AlertStatus.visible
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
        submitForm: ( file, importMode ) => {
            return dispatch({ type: POST_ADD_BULK_IMPORT, file, importMode });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBulkImport);