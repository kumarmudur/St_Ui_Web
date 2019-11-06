import React, { Component } from 'react';
import { connect } from 'react-redux';
import { POST_SEARCH_ROLES, NAVIGATION } from '../../actions';
import { viewRolesTemplate } from '../../utils/viewRolesTemplate';
import { PAGINATION } from '../../constants';


import ViewRoleComponent from '../../components/UserManagement/ViewRoleComponent';

class SearchRoles extends Component {
    constructor(props) {
        super(props);
        this._getData(
            {
                pageNumber: 0,
                pageSize: PAGINATION.pageSize,
                searchParams: props.searchParams || {}
            }
        );
    }

    _getData = data => {
        const { authToken } = this.props.Login;
        data.authToken = authToken;
        this.props.searchRoles(data);
      }
    
    _viewDetails = (link, id) => {
        this.props.navigate({ currentPage: link, id  });
    }

    render() {
        const { data } = this.props;
        const gridTemplate = data && data.length > 0 ? viewRolesTemplate(data) : { 'head': [], 'body': [] };
        return (
            <div>
                <ViewRoleComponent rolesData={ data } viewDetailsfn={ this._viewDetails } template={ gridTemplate } getData={ this._getData }/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { SearchRoles, Login } = state;
    const data = SearchRoles.roles;

    return {
        data: data,
        Login
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchRoles: (data) => {
            return dispatch({ type: POST_SEARCH_ROLES, data });
        },
        navigate: data => {
            return dispatch({ type: NAVIGATION, data });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchRoles);
