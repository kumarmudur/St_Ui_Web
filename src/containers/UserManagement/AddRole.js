import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GET_ROLE_DATA, POST_ADD_ROLE, GET_EDIT_ROLE_DATA, POST_EDIT_ROLE, NAVIGATION, SET_ALERT_STATUS } from '../../actions';
import AddRoleComponent from '../../components/UserManagement/AddRoleComponent';
import Modal from '../../components/common/Modal';
import { MESSAGE } from '../../constants';
import { Breadcrumb } from '../../components/common';

class AddRole extends Component {
    constructor(props) {
        super(props);
        if(props && props.id) {
            this._getRoleData( props.id );
        }
        this.state = {
            formData: null,
            isShowModal: false,
            data: null,
            addCode: null,
            editCode: null
        };
    }

    componentWillReceiveProps(nextProps) {
        let addCode = null, editCode = null;
        if(nextProps.id) {
          addCode = null,
          editCode = nextProps.editCode ? nextProps.editCode : null;
        } else {
          addCode = nextProps.addCode ? nextProps.addCode : null,
          editCode = null;
        }
       
        this.setState({
          addCode: addCode,
          editCode: editCode,
        });
      }


    _getRoleData = id => {
        const { authToken } = this.props.Login;
        this.props.getEditRoleData({ id, authToken });
    }

    _getData = () => {
        const { authToken } = this.props.Login;
        this.props.getRoleData({ authToken });
    }
    
    _submitForm = data => {
        const { roleName, roleDiscription, modules } = data;
        const { Login, id, saveRole, postEditRole, role } = this.props;
        const { authToken } = Login;
        if(id) {
            const dataObj = {
                authToken,
                id,
                data: {
                    createdDateTime: role.createdDateTime,
                    manageRolesId: role.manageRolesId,
                    modules: modules,
                    roleName: roleName,
                    roleDiscription: roleDiscription,
                    status: role.status,
                    updatedDateTime: role.updatedDateTime
                }
            };
            //this.closeModal();
            this.setState({
                formData: dataObj
            });
            postEditRole(dataObj);
        } else {
            const dataObj = {
                roleName: roleName,
                roleDiscription: roleDiscription,
                modules: modules,
                authToken: authToken
            };
            saveRole(dataObj);

        }
    }

    _closeModal = () => {
        this.props.setAlertStatus({ 'visible': false });
        this._changePage();
    }

    _changePage = () => {
        this.props.navigate({ currentPage: 'MANAGE_ROLE' });
    }

    render() {
        const { roles, role, id, isAlertVisible } = this.props;
        const { addCode, editCode } = this.state;
        let modalBody = '';
        if (addCode == 200) {
            modalBody =  MESSAGE.ADD;
        } else if(editCode == 200){
            modalBody = MESSAGE.EDIT;
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
            <div className='container'>
                <div className="role-container">
                    <div className="bulk-import-Breadcrumb">
                        <Breadcrumb 
                          firstTitle="User Management"
                          secondTitle="Manage Role"
                          thirdTitle={ id ? 'Edit Role' : 'Add Role' }
                          changePage={ this._changePage }
                          className='user-management-bread-crumb'
                        />
                    </div>
                    <AddRoleComponent 
                      getRolesData={ this._getData } 
                      roles={ roles } 
                      submitForm = { this._submitForm } 
                      roleData={ role }
                      id={ id }
                      cancelForm={ this._closeModal }
                    />
                    <Modal 
                      title="Message" 
                      isShowModal={ isAlertVisible } 
                      modalBody={ modalBody }
                      closeModal={ this._closeModal }
                      buttons={ buttonMeta }
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { Login, rolesData, GetEditRoleData, PostEditRole, AddRole, AlertStatus } = state;
    const roles = rolesData;
    const role = GetEditRoleData && GetEditRoleData.role;
    const editCode = PostEditRole.code;
    const addCode = AddRole.code;

    return {
        Login,
        roles,
        role,
        editCode,
        addCode,
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
        saveRole: data => {
         return   dispatch({ type: POST_ADD_ROLE, data});
           // dispatch({ type: NAVIGATION, data: { currentPage: 'MANAGE_ROLE'} });
            //this.props.navigate({ currentPage: 'MANAGE_ROLE' });
        },
        getRoleData: data => {
            return dispatch({ type: GET_ROLE_DATA, data });
        },
        getEditRoleData: data => {
            return dispatch({ type: GET_EDIT_ROLE_DATA, data});
        },
        postEditRole: data => {
            return dispatch({ type: POST_EDIT_ROLE, data});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRole);