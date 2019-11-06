import React, { Componenet } from 'react';
import { connect } from 'react-redux';
import { POST_OTP_DATA } from '../../actions';

class OtpVerification extends Componenet {

    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = () => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        postOtpData: data => {
            return dispatch({ type: POST_OTP_DATA, data});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtpVerification);