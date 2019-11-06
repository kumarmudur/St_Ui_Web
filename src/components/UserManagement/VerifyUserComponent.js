import React, { Component } from 'react';
import { Button, Footer, LogoImage } from '../common';

class VerifyUserComponent extends Component {

    constructor(props) {
        super(props);
    }

    _navigateTo = () => {
        this.props.navigateTo();
    }

    render() {
        return (
            <div className="wrapper-main">
                <div className="container">
                <LogoImage className="login-logo"/>
                    <div className="wrap-input-item verify-user">
                        <div className="field-container text-center">
                            <div className="verify-status-wrapper">
                                <p className="activated">Your Account is Activated</p>
                                <p className="text-content">Congratulations! Your account is activated successfully.</p>
                            </div>
                            <div className="btn-group-footer">
                                <Button name="Log In" className="btn-cancel" onClick={ this._navigateTo }/>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default VerifyUserComponent;
