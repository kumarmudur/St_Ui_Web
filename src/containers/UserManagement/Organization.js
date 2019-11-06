import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrganizationComponent from '../../components/UserManagement/OrganizationComponent';
import '../../styles/index.scss';
import { GET_COUNTRY, GET_STATES, GET_CITY, POST_ADD_OFFICE, POST_ADD_DEPARTMENT, POST_EDIT_ORGANIZATION, GET_ORGANIZATION, GET_ORGANIZATIONS_CHART, GET_VIEW_ORGANIZATIONS } from '../../actions';
import  ViewOrganizations  from './ViewOrganizations';
import { PAGINATION } from '../../constants';

class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAddDepartment: false,
      isShowOffice: true,
      isShowViewOrg: true,
      isEditOffice: false,
      orgData: {},
      orgOfficeId: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      orgData: nextProps.getOfficeData
    });
  }

  _getCountry = () => {
    this.props.getCountryData();
  }

  _getStates = data => {
    this.props.getStatesData({ 'countryName': data });
  }

  _getCities = data => {
    const { countryName, stateName } = data;
    data.countryName = countryName;
    data.stateName = stateName;
    this.props.getCitiesData(data);
  }

  _getData = data => {
    const { authToken } = this.props.Login;
    const newData = {
        authToken,
        data
    };
    this.props.viewOrganizations(newData);
  }

  _submitOfficeForm = value => {
    const { Login, org_id_value } = this.props;
    const { authToken } = Login;
    const data = value;
    const dataObj = {
        authToken,
        data
    };
    const { isEditOffice, orgData } = this.state;
    const { saveOffice, editOfficeData } = this.props;
    if(!isEditOffice) {                                                                                                                                                                                                                                 
      saveOffice(dataObj);

    } else {
      const office_id = orgData.officeId;
      const data = {
          'officeName': value && value.offices && value.offices[0].officeName,
          'country': value && value.offices && value.offices[0].country,
          'state': value && value.offices && value.offices[0].state,
          'city': value && value.offices && value.offices[0].city,
          'departments': orgData.departments,
          'officeId': orgData.officeId
      };
      const dataObj = {
          authToken,
          org_id_value,
          office_id,
          data  
      };
      editOfficeData(dataObj);
      this._getData( {
      pageNumber: 0,
      pageSize: PAGINATION.pageSize
    });
    }
  }

  _submitDepartmentForm = value => {
    const { Login, org_id_value } = this.props;
    const { authToken } = Login;
    const org_id = org_id_value; 
    const { orgData, editOfficeData, isEditOffice, orgOfficeId } = this.state;
    const data = {
      'officeIds': orgOfficeId,
      'departmentName': value.departmentName,
      'subDepartments': value.subDepartments
    };  
    const newData = {
      authToken,
      org_id,
      data,
    };
    if(!isEditOffice) {
      this.props.saveDepartment(newData);
    } else {
      const data = orgData;
      data.departments = value.departments;
      const office_id = orgOfficeId;
      const newData = {
        office_id,
        org_id_value,
        authToken,
        data
      };
      editOfficeData(newData);
    }
  }

  _addDepartment = () => {
    this.setState({
      isShowAddDepartment: true,
      isShowOffice: false
    });
  }

  _addOffice = () => {
    this.setState({
      isShowAddDepartment: false,
      isShowOffice: true,
      orgData: null
    });

  }

  _editOffice = () => {
     this.setState({
        isShowAddDepartment: false,
        isShowOffice: true,
        isEditOffice: true
     });
     const { Login, org_id_value } = this.props;
     const { orgOfficeId } = this.state;
     const { authToken } = Login;
     const dataObj = {
          authToken,
          org_id: org_id_value,
          office_id: orgOfficeId && orgOfficeId[0]
     };
     this.props.getOranization(dataObj);
  }

  _cancelOfficeForm = () => {
    this.setState({
      isShowOffice: false
    });
  }

  _cancelDepartmentForm = () => {
    this.setState({
      isShowAddDepartment: false
    });
  }

  _toggleChartView = showViewOrg => {
    this.setState({
      isShowViewOrg: !showViewOrg
    });
  }

  _getChartViewData = () => {
    const { Login, org_id_value } = this.props;
    const { authToken } = Login;
    const org_id = org_id_value;    
    const dataObj = {
      authToken,
      org_id
    };
    this.props.getChartViewData(dataObj);
  }

  _getOfficeId = data => {
    this.setState({
      orgOfficeId: data
    });
  }

  render() {
    const { country, states, cities, organizationName, selectedCountry, selectedState, chartData } = this.props;
    const { isShowAddDepartment, isShowOffice, isShowViewOrg, orgData } = this.state;
    return (
      <div className="container">
        <OrganizationComponent 
          organizationName={ organizationName }
          getCountry={ this._getCountry } 
          countryList={ country } 
          getStates={ this._getStates }
          statesList={ states }
          getCities={ this._getCities }
          cityList= { cities }
          submitOfficeForm={ this._submitOfficeForm }
          isShowAddDepartment={ isShowAddDepartment }
          isShowOffice = { isShowOffice }
          cancelOfficeForm = { this._cancelOfficeForm }
          toggleChartView={ this._toggleChartView }
          cancelDepartmentForm={ this._cancelDepartmentForm }
          getOfficeData={ orgData }
          selectedCountry={ selectedCountry }
          selectedState={ selectedState }
          submitDepartmentForm={ this._submitDepartmentForm }
          getChartViewData={ this._getChartViewData }
          chartData={ chartData }
          getOffice
        />
        {
          isShowViewOrg ? 
            <ViewOrganizations 
              addDepartment={ this._addDepartment }
              addOfficeDiv={ this._addOffice }
              editOffice={ this._editOffice }
              getOfficeId={ this._getOfficeId }
              editDepartment={ this._addDepartment }
            /> : ''
        }
      </div>
    );
  }
}

const mapStateProps = state => {
  const { Login, Country, States, City, ViewOrganizations, GetOrganization, ChartView } = state;
  const country = Country;
  const states = States && States.details && States.details.regionalBlocs;
  const selectedCountry = States && States.countryName;
  const selectedState = City && City.stateName;
  const cities = City ;
  const organizationName = ViewOrganizations &&  ViewOrganizations.organization && ViewOrganizations.organization.organizationName;
  const org_id_value = ViewOrganizations && ViewOrganizations.organization && ViewOrganizations.organization.organizationId;
  const getOfficeData = GetOrganization.offices;
  const chartData = ChartView.chart;
  return {
    Login,
    country,
    states,
    cities,
    organizationName,
    getOfficeData,
    org_id_value,
    selectedCountry,
    chartData,
    selectedState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCountryData: () => {
      return dispatch({ type: GET_COUNTRY });
    },
    getStatesData: data => {
      return dispatch({ type: GET_STATES, data});
    },
    getCitiesData: data => {
      return dispatch({ type: GET_CITY, data});
    },
    saveOffice: data => {
      dispatch({ type: POST_ADD_OFFICE, data });
      // dispatch({ 
      //   type: GET_VIEW_ORGANIZATIONS, 
      //   data: {
      //     authToken: data.authToken,
      //     data: {
      //       pageNumber: 0,
      //       pageSize: 10 //PAGINATION.pageSize
      //     }
      //   }
      // });
    },
    saveDepartment: data => {
      return dispatch({ type: POST_ADD_DEPARTMENT, data });
    },
    getOranization: data => {
      return dispatch({ type: GET_ORGANIZATION, data });
    },
    editOfficeData: data => {
      return dispatch({ type: POST_EDIT_ORGANIZATION, data });
    },
    getChartViewData: data => {
      return dispatch({ type: GET_ORGANIZATIONS_CHART, data });
    },
    viewOrganizations: (data) => {
      return dispatch({ type: GET_VIEW_ORGANIZATIONS, data });
     },
  };
};

export default connect(mapStateProps, mapDispatchToProps)(Organization);
