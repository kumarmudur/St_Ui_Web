import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GET_VIEW_ORGANIZATIONS, NAVIGATION, DELETE_OFFICE, DELETE_DEPARTMENT } from '../../actions';
import { viewOrganizationTemplate } from '../../utils/viewOrganizationTemplate';
import { PAGINATION } from '../../constants';

import ViewOrganizationComponent from '../../components/UserManagement/VIewOrganizationsComponent';

class ViewOrganizations extends Component {
    constructor(props) {
        super(props);
        this._getData(
            {
                pageNumber: 0,
                pageSize: PAGINATION.pageSize
            }
        );
        this.state = {
            officeIds: [],
            offices: [],
            disabledEditOfficeBtn: true,
            disabledDeleteOfficeBtn: true
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     let offices = [];
    //     const dataLength = nextProps.data && nextProps.data.length;
    //     const officelength = nextProps.offices && nextProps.offices.length || [];
    //     if(dataLength >= officelength) {
    //         offices = nextProps.data;
    //     } else {
    //         offices = nextProps.offices;
    //     }
    //     this.setState({
    //         offices: offices
    //     });
    // }

    _getData = data => {
        const { authToken } = this.props.Login;
        const newData = {
            authToken,
            data
        };
        this.props.viewOrganizations(newData);
      }
    
    _viewDetails = (link, id) => {
        this.props.navigate({ currentPage: link, id  });
    }

    _addDepartment = value => {
        this.props.addDepartment(value);
    }

    _showOffice = () => {
        this.props.addOfficeDiv();
    }

    _editOffice = () => {
        this.props.editOffice();
    }

    _getOfficeIds = data => {
        this.setState({
            officeIds: data
        });
        this.props.getOfficeId(data);
        let disabledEditOffice = true, disabledDeleteOffice = true;
        if(data.length > 1) {   
            disabledEditOffice = true;
        } else {
            disabledEditOffice = false;
        }

        if(data.length < 0) {
            disabledDeleteOffice = true;
        } else {
            disabledDeleteOffice = false;
        }

        this.setState({
            disabledEditOfficeBtn: disabledEditOffice,
            disabledDeleteOfficeBtn: disabledDeleteOffice
        });
    }

    _editDepartment = () => {
        this.props.editDepartment();
    }

    _deleteOffice = async id => {
        let ids = [];
        if(id) {
            ids.push(parseInt(id));
        }
        const data = {
            'officeIds': id ? ids : this.state.officeIds
        };
        const { Login, org_id_value } = this.props;
        const { authToken } = Login;
        const org_id = org_id_value; 
        const newData = {
            authToken,
            org_id,
            data,
        };
        await this.props.deleteOffice(newData);
        
        await this._getData( {
            pageNumber: 0,
            pageSize: PAGINATION.pageSize
        });
    }

    // _deleteDepartment = value => {
    //     const { Login, org_id_value } = this.props;
    //     const { authToken } = Login;
    //     const org_id = org_id_value; 
    //     const officeId = value.id;
    //     const department = 'Admin';
    //     // const dataObj = {
    //     //     authToken,
    //     //     org_id,
    //     //     officeId,
    //     //     department
    //     // };
    //     //this.props.deleteDepartment(dataObj);
    // }

    render() {
        const { offices, disabledEditOfficeBtn, disabledDeleteOfficeBtn } = this.state;
        const { data } = this.props;
        const gridTemplate = data && data.length > 0 ? viewOrganizationTemplate(data) : { 'head': [], 'body': [] };
        return (
            <div>
                <ViewOrganizationComponent 
                  organizationsData={ offices } 
                  viewDetailsfn={ this._viewDetails } 
                  template={ gridTemplate } 
                  getData={ this._getData } 
                  addDepartment={ this._addDepartment }
                  showOffice={ this._showOffice }
                  editOffice={ this._editOffice }
                  deleteOffice={ this._deleteOffice }
                  deleteDepartment= { this._deleteDepartment }
                  getOfficeIds= { this._getOfficeIds }
                  editDepartment={ this._editDepartment }
                  disabledEditOffice={ disabledEditOfficeBtn }
                  disabledDeleteOffice={ disabledDeleteOfficeBtn }
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { ViewOrganizations, Login, Office } = state;
    const data = ViewOrganizations && 
                 ViewOrganizations.organization && 
                 ViewOrganizations.organization.offices;
    const offices = Office && Office.organizations && Office.organizations.offices;
    const org_id_value = ViewOrganizations && ViewOrganizations.organization && ViewOrganizations.organization.organizationId;

    return {
        data,
        Login,
        org_id_value,
        offices
    };
};

const mapDispatchToProps = dispatch => {
    return {
        viewOrganizations: (data) => {
            return dispatch({ type: GET_VIEW_ORGANIZATIONS, data });
        },
        navigate: data => {
            return dispatch({ type: NAVIGATION, data });
        },
        deleteOffice: data => {
            return  dispatch({ type: DELETE_OFFICE, data });
        },
        deleteDepartment: data => {
            return dispatch({ type: DELETE_DEPARTMENT, data });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrganizations);
