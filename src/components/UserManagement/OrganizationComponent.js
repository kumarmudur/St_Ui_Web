import React, { Component, Fragment } from 'react';
import { Input } from '../common';
import OfficeComponent from './OfficeComponent';
import DepartmentComponent from './DepartmentComponent';
import ChartView from './ChartView';

class OrganizationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowChartView: false,
      organizationName: ''
    }; 
  }
  
  componentWillReceiveProps(nextProps) {
    const { organizationName } = nextProps;
    this.setState({
      organizationName: organizationName
    });
  }

  _toggleChartView = () => {
    const {isShowChartView } = this.state;
    const { toggleChartView } = this.props;
    this.setState({
      isShowChartView: !isShowChartView
    });
    toggleChartView(!isShowChartView);
    this.props.getChartViewData();
  }

  _getStates = value => {
    this.props.getStates(value);
  }

  _getCities = value => {
    this.props.getCities(value);
  }

  _submitOfficeForm = value => {
    const { organizationName } = this.state;
    const dataObj = {
      organizationName: organizationName,
      offices: value
    };
    this.props.submitOfficeForm(dataObj);
  }

  _cancelOfficeForm = () => {
    this.props.cancelOfficeForm();
  }

  _cancelDepartmentForm = () => {
    this.props.cancelDepartmentForm();
  }

  _submitDepartmentForm = value => {
    this.props.submitDepartmentForm(value);
  }

  render() {
    const { isShowChartView, organizationName } = this.state;
    const { cityList, statesList, countryList, getCountry, isShowAddDepartment, isShowOffice, getOfficeData, selectedCountry, selectedState, chartData } = this.props;
    return (
      <Fragment>
      {
        !isShowChartView ? <div className="wrapper-organization">
            <div className="wrapper-input">
              <Input 
                className="form-input organizationSideheading" 
                placeholder="Company Name" 
                type="text" 
                name="organizationName"
                value={ organizationName }
                textChange={ this._onFieldChange }
              />
              <span className="chart-view" onClick={ this._toggleChartView }>CHART VIEW</span>
            </div>
            <div className="wrapper-office">
              {
                isShowAddDepartment ? 
                  <DepartmentComponent 
                    cancelForm={ this._cancelDepartmentForm }
                    submitForm={ this._submitDepartmentForm }
                  /> :  ''
              }
              {
                isShowOffice ? 
                 <OfficeComponent 
                   getCountry={ getCountry } 
                   countryList={ countryList } 
                   getStates={ this._getStates }
                   statesList={ statesList } 
                   getCities={ this._getCities }
                   cityList = { cityList }
                   submitForm= { this._submitOfficeForm }
                   cancelForm = { this._cancelOfficeForm }
                   getOfficeData={ getOfficeData }
                   selectedCountry={ selectedCountry }
                   selectedState={ selectedState }
                 /> : ''
              }
            </div>
          </div> : 
                 <ChartView 
                   showListView={ this._toggleChartView } 
                   chartData={ chartData }
                   organizationName={ organizationName }
                 />
      }
      
      </Fragment>
    );
  }
}

export default OrganizationComponent;
