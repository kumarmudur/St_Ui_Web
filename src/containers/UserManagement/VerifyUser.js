import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import VerifyUserComponent from '../../components/UserManagement/VerifyUserComponent';

class VerifyUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginFlag: false
        };
    }

    _navigateTo = () => {
        this.setState({
            loginFlag: true
        });
    }

    render() {
        const { loginFlag } = this.state;
        if(loginFlag) {
            return <Redirect to={ '/login' } />;
        }
        return (
            <div>
               <VerifyUserComponent navigateTo={ this._navigateTo } />
            </div>
        );
    }
}

export default VerifyUser;