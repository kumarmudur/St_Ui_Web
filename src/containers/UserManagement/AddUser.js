import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { POST_ADD_USER, GET_USER_TYPES, GET_USER_DATA, POST_EDIT_USER, NAVIGATION, SET_ALERT_STATUS, GET_USER_TYPE_LIST, GET_ROLE_LIST, GET_OFFICE_LIST, GET_DEPARTMENT_LIST } from '../../actions';
import AddUserComponent from '../../components/UserManagement/AddUserComponent';
//import { USER_MANAGEMENT } from '../../constants';
import Modal from '../../components/common/Modal';
import { MESSAGE } from '../../constants';
import { Breadcrumb } from '../../components/common';

class AddUser extends Component {
    constructor(props) {
        super(props);
        if(props && props.id) {
            this._getUserData( props.id );
        }
        this.state = {
            addCode: null,
            editCode: null
        };
    }
    _getUserData = id => {
        const { authToken } = this.props.Login;
        this.props.getUserData({ 
            id,
            authToken
        });
    }
    state = {
        isShowModal : ''
    }

    componentDidMount() {
        const { authToken } = this.props.Login;
        const { getUserTypeList, getRoleList, getOfficeList } = this.props;

        getUserTypeList({ authToken });
        getRoleList({ authToken });
        getOfficeList({ authToken });
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

    _getSelectedOffice = id => {
        const { getDepartmentList } = this.props;
        const { authToken } = this.props.Login;
        const dataObj = {
            authToken,
            id
        };
        getDepartmentList(dataObj);
    }

    _submitForm = data => {
        const id = this.props && this.props.id ? this.props.id : null;
        const { authToken } = this.props.Login;
        if(id) {
            //Edit User
            const dataObj = {
                data,
                authToken
            };
            this.props.submitForm(POST_EDIT_USER, dataObj);
        } else {
            //New User
            this.props.submitForm(POST_ADD_USER, data);
        }
    }


    _getUserTypes = () => {
        this.props.getUserTypes();
    }

    _closeModal = () => {
        this.props.setAlertStatus({ 'visible': false });
        this._changePage();
    }

    _changePage = () => {
        this.props.navigate({ currentPage: 'VIEW_USERS' });
    }


    render() {
        const id = this.props && this.props.id ? this.props.id : null;
        const UserData = this.props && this.props.page==='edit_mode' && this.props.UserData ? this.props.UserData && this.props.UserData.user : null;
        const { userTypeList, roleList, officeList, departmentList, isAlertVisible } = this.props;
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
                <Fragment>
                    <div className="user-management-bread-crumb">
                        <Breadcrumb 
                          firstTitle="User Management"
                          secondTitle="Manage Users"
                          thirdTitle={ id ? 'Edit User' : 'Add User' }
                          changePage={ this._changePage }
                          className='user-management-bread-crumb'
                        />
                    </div>
                    <AddUserComponent 
                      id={ id } 
                      userData={ UserData } 
                      submitForm={ this._submitForm } 
                      cancelForm= { this._closeModal } 
                      getUserTypes={ this._getUserTypes } 
                      formSuccessMessage={ this.props.successMessage }
                      userTypeList={ userTypeList }
                      roleList={ roleList }
                      officeList={ officeList }
                      getSelectedOffice = { this._getSelectedOffice }
                      departmentList= { departmentList }
                      pageMode = { this.props.page }
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
    const { AddUser, UserData, Login, AlertStatus, GetUserTypeList, GetRoleList, GetOfficeList, EditUser, GetDepartmentList  } = state;
    let successMessage = AddUser.message;
    const userTypeList= GetUserTypeList && GetUserTypeList.userTypes ? GetUserTypeList.userTypes : [];
    const roleList= GetRoleList && GetRoleList.roleList ? GetRoleList.roleList : [];
    const officeList = GetOfficeList && GetOfficeList.offices ? GetOfficeList.offices : [];
    const departmentList = GetDepartmentList && GetDepartmentList.departments ? GetDepartmentList.departments : [];
    const addCode = AddUser && AddUser.code; 
    const editCode = EditUser && EditUser.code;
    return {
        UserData,
        Login,
        successMessage,
        isAlertVisible: AlertStatus.visible,
        userTypeList,
        roleList,
        officeList,
        departmentList,
        addCode,
        editCode
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
        getUserData: data => {
            return dispatch({ type: GET_USER_DATA, data });
        },
        submitForm: (type, data) => {
            return dispatch({ type, data});
        },
        getUserTypes: () => {
            return dispatch({ type: GET_USER_TYPES });
        },
        getUserTypeList: data => {
            return dispatch({ type: GET_USER_TYPE_LIST, data });
        },
        getRoleList: data => {
            return dispatch({ type: GET_ROLE_LIST, data});
        },
        getOfficeList: data => {
            return dispatch({ type: GET_OFFICE_LIST, data});
        },
        getDepartmentList: data => {
            return dispatch({ type: GET_DEPARTMENT_LIST, data });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);