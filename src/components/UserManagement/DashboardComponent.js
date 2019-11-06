import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/index.scss';

class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerData: {
        username: 'Robinder',
        password: '12345'
      }
    };
  }
  _postData = () => {
    this.props.postData(this.state.registerData);
  }
  render() {
    const { items, status, getData } = this.props;
    return (
      <div>
        <button onClick= { this._postData }>POST DATA</button> <br/>
        <span className="span">{status} </span>
        <button onClick={ getData }>Get Data</button> <hr />
        {items} <br/>
      </div>
    );
  }
}
DashboardComponent.defaultProps = {
  getData: null,
  items: null,
  status: null
};

DashboardComponent.propTypes = {
  getData: PropTypes.func.isRequired,
  items: PropTypes.any,
  status: PropTypes.number
};

export default DashboardComponent;