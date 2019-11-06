import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../actions';
import MeasurementComponent from '../../components/UserManagement/MeasurementComponent';

class Measurement extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: props.items || 'no items',
      status: props.status || null,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items,
      status: nextProps.status,
    });
  }
  _getData = () => {
    this.props.getData();
  }

  render() {
    const { items, status } = this.state;
    const itemBlock = Array.isArray(items) && items.map( item => <div key={ item.id }>{ item.title }</div> ) || 'Loading';
    return (
      <MeasurementComponent
        items={ itemBlock }
        getData={ this._getData  }
        status= { status }
      />
    );
  }
}

const mapStateToProps = state => {
  const { Measurement } = state;
  return {
    items: Measurement.items,
    status: Measurement.status,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getData: () => dispatch({ type: action.GET_DATA })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Measurement);
