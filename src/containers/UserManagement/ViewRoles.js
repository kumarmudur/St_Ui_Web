import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GET_VIEW_ROLES, NAVIGATION } from '../../actions';
import { viewRolesTemplate } from '../../utils/viewRolesTemplate';
import { PAGE_SIZE_DEFAULT } from '../../constants';


import ViewRoleComponent from '../../components/UserManagement/ViewRoleComponent';
class ViewRoles extends Component {
    constructor(props) {
        super(props);
        this._getData(
            {
                pageNumber: 0,
                pageSize: PAGE_SIZE_DEFAULT
            }
        );
    }

    componentDidMount() {
        window.scrollTo(0, 0);
      }
      
    _getData = data => {
        const { authToken } = this.props.Login;
        data.authToken = authToken;
        this.props.viewRoles(data);
      }
    
    _viewDetails = (link, id) => {
        this.props.navigate({ currentPage: link, id  });
    }

    _editRole = (link, id) => {
        this.props.navigate({ currentPage: link, id });
    }

    render() {
        const { data, recordsCount } = this.props;
        const gridTemplate = data && data.length > 0 ? viewRolesTemplate(data) : { 'head': [], 'body': [] };
        return (
            <div className='container'>
                <ViewRoleComponent 
                  rolesData={ data } 
                  viewDetailsfn={ this._viewDetails } 
                  template={ gridTemplate } 
                  getData={ this._getData }
                  editRole={ this._editRole }
                  recordsCount={ recordsCount }
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { ViewRoles, Login } = state;
    const data = ViewRoles.roles;
    const recordsCount = ViewRoles.recordsCount;
    return {
        data,
        Login,
        recordsCount
    };
};

const mapDispatchToProps = dispatch => {
    return {
        viewRoles: (data) => {
            return dispatch({ type: GET_VIEW_ROLES, data });
        },
        navigate: data => {
            return dispatch({ type: NAVIGATION, data });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewRoles);
