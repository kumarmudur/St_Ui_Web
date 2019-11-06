
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GET_USER_DATA, NAVIGATION } from '../../actions';
import { POST_PROFILE_IMAGE_UPLOAD } from '../../actions/profile';
import ViewProfileComponent from '../../components/Profile/ViewProfileComponent';
import ViewAssociateProfileComponent from '../../components/Profile/ViewAssociateProfileComponent';

class ViewProfile extends Component {
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

    _editProfile = (link, id) => {
        this.props.navigate({ currentPage: link, id });
    }

    _submitImage = file => {
        const { authToken, registerId } = this.props.Login;
        if(file) {
            this.props.submitImage( file, authToken, registerId );
            this._getUserData( registerId );
        }
    }

    render() {
        const UserData = this.props && this.props.UserData ? this.props.UserData && this.props.UserData.user : null;
        const { userType } = this.props.Login;
        return (
            <div className="container">
               { userType === 'Associate' && UserData && <ViewAssociateProfileComponent userDetails = { UserData } editProfile = { this._editProfile } submitImage={ this._submitImage } /> }
               { userType !== 'Associate' && UserData && <ViewProfileComponent userDetails = { UserData } editProfile = { this._editProfile } submitImage={ this._submitImage } /> }
            </div>
        );
    }
}
const mapStateToProps = state => {
    const { UserData, Login } = state;
    return {
        UserData,
        Login
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        getUserData: data => {
           return dispatch({ type: GET_USER_DATA, data });
        },
        navigate: data => {
           return dispatch({ type: NAVIGATION, data });
        },
        submitImage: ( file, authToken, registerId ) => {
           return dispatch({ type: POST_PROFILE_IMAGE_UPLOAD, file, authToken, registerId });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);