
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LOGOUT } from '../actions';
import { Redirect } from 'react-router-dom';
import { ICONS } from '../constants';

class LoginCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: props.fullName || null,
            authToken: props.authToken || null,
        };
    }
    _logout = () => {
        this.props.logout(this.props.authToken);
    }
    _clickHandler = e => {
        this.props.navigation(e.currentTarget.name);
    }
    render() {
        if(!this.props.authToken && this.props.hasOwnProperty('loginStatus') && this.props.loginStatus === 'LOGGED_OUT' ) {
            return <Redirect to={ '/login' } />;
        }
        return (
            <div className='loggedInUser roundedCorner'>
            <img src={ ICONS.USER } width="24" height="24" alt="" />
                { this.props.fullName.substring(0, 10) }
                <div className='topNavMenu'>
                    <NavLink className='topNavMenuLinks' to="#profile" name='PROFILE' onClick= { this._clickHandler } >Profile</NavLink>
                    <NavLink className='topNavMenuLinks' to="#change_password" name='CHANGE_PASSWORD' onClick= { this._clickHandler } >Change Password</NavLink>
                    <NavLink className='topNavMenuLinks' to="#logout" name='LOGOUT' onClick={ this._logout }>Log Out</NavLink>
                </div>
                {/* <NavLink to="#logout" name='LOGOUT' onClick={ this._logout }>Logout</NavLink> */}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { Login } = state;
        return Login;
  };

const mapDispatchToProps = (dispatch) => {
    return {
        logout: data => dispatch({ type: LOGOUT, data })
      };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginCheck);