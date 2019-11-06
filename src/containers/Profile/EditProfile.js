import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GET_USER_DATA, SET_ALERT_STATUS, NAVIGATION } from '../../actions';
import { POST_EDIT_PROFILE } from '../../actions/profile';
import EditProfileComponent  from '../../components/Profile/EditProfileComponent';
import EditAssociateProfileComponent  from '../../components/Profile/EditAssociateProfileComponent';
import Modal from '../../components/common/Modal';
import { MESSAGE } from '../../constants';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        if(props && props.Login.registerId) {
            this._getUserData( props.Login.registerId );
        }
    }

    _getUserData = id => {
        const { authToken } = this.props.Login;
        this.props.getUserData({ 
            id,
            authToken
        });
    }

    _submitForm = data => {
        const id = this.props && this.props.Login.registerId ? this.props.Login.registerId : null;
        const { authToken } = this.props.Login;
        if(id) {
            const dataObj = {
                data,
                authToken
            };
            this.props.submitForm(POST_EDIT_PROFILE, dataObj);
            this._getUserData( id );
        }
    }

    _cancelForm = () => {
        this.props.navigate({ currentPage: 'PROFILE' });
    }

    _closeModal = () => {
        const id = this.props && this.props.Login.registerId ? this.props.Login.registerId : null;
        this.props.setAlertStatus({ 'visible': false });
        this.props.navigate({ currentPage: 'PROFILE', id});

    }

    render() {
        const UserData = this.props && this.props.UserData ? this.props.UserData && this.props.UserData.user : null;
        const { userType } = this.props.Login;
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
               { userType === 'Associate' && UserData && <EditAssociateProfileComponent userData = { UserData } submitForm={ this._submitForm } cancelForm= { this._cancelForm } formSuccessMessage={ this.props.successMessage } /> }
               { userType !== 'Associate' && UserData && <EditProfileComponent userData = { UserData } submitForm={ this._submitForm } cancelForm= { this._cancelForm } formSuccessMessage={ this.props.successMessage } /> }
               { isAlertVisible && 
                <Modal 
                  title="Message" 
                  isShowModal={ isAlertVisible } 
                  modalBody={ MESSAGE.ADD }
                  closeModal={ this._closeModal }
                  buttons={ buttonMeta }
                />
               }
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { AddUser, UserData, Login, AlertStatus } = state;
    let successMessage = AddUser.message;
    return {
        UserData,
        Login,
        successMessage,
        isAlertVisible: AlertStatus.visible
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        setAlertStatus: data => {
            return dispatch({ type: SET_ALERT_STATUS, data });
        },
        getUserData: data => {
            return dispatch({ type: GET_USER_DATA, data });
        },
        submitForm: (type, data) => {
            return dispatch({ type, data});
        },
        navigate: data => {
            return dispatch({ type: NAVIGATION, data });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);