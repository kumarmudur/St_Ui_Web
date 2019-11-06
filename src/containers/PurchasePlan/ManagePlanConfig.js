import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GET_STATIC_DATA_CONFIG } from '../../actions/purchasePlan';

class ManagePlanConfig extends Component {
    constructor(props) {
        super(props);
        this._getStaticData();
    }

    _getStaticData = () => {
        const { authToken } = this.props.Login;
        this.props.getStaticData({ authToken });
    }


    render() {
        return (
            <div>
                <p>ManagePlanConfig</p>      
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { Login, GetStaticDataConfig } = state;
    return {
        Login,
        GetStaticDataConfig
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getStaticData: data => {
            return dispatch({ type: GET_STATIC_DATA_CONFIG, data });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePlanConfig);
