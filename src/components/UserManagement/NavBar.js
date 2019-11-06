import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/index.scss';

class NavBar extends Component {
  render() {
    return ( <div className='NavBar'>
        <NavLink className='NavLink' to='/app/dashboard'>Home</NavLink>
        <NavLink className='NavLink' to='/app/viewusers'>View Users</NavLink>
        <NavLink className='NavLink' to='/app/measure'>Measure Roof</NavLink>
        <NavLink className='NavLink' to='/app/register'>Register</NavLink>
        <NavLink className='NavLink' to='/app/login'>Log In</NavLink>
        <NavLink className="NavLink" to="/app/forgotpassword">ForgotPassword</NavLink>
        <NavLink className="NavLink" to="/app/resetpassword">ResetPassword</NavLink>
        <NavLink className="NavLink" to="/app/adduser">Add User</NavLink>
        <NavLink className="NavLink" to="/app/addrole">Add Role</NavLink>
        <NavLink className="NavLink" to="/app/leftnavigation">Left Navigation</NavLink>
    </div>
    );
  }
}

export default NavBar;
