import React, { Component } from 'react';
import { Footer, LogoImage } from '../common';
import { NavLink } from 'react-router-dom';

class ActivateUserComponent extends Component {

    constructor(props) {
        super(props);
    }

    _resendEmailLink = () => {
        this.props.resendEmailLink();
    }

    render() {
        const { userEmail } = this.props;
        return (
            <div className="wrapper-main">
                <div className="container">
                <LogoImage className="login-logo"/>
                    <div className="wrap-input-item verify-user">
                        <div className="activate-user">
                            <p className="activated">Activate Your Account</p>
                        </div>
                        <div className="field-container text-center">
                            <div className="verify-status-wrapper">
                                <p className="text-content">Email verification link is sent to { userEmail } <br/>
                                    <span className="resend-email">If you have not received, <NavLink to="#" onClick={ this._resendEmailLink }>Click Here </NavLink></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default ActivateUserComponent;
