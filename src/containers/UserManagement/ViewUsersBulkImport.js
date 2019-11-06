import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GET_ADD_BULK_IMPORT, NAVIGATION } from '../../actions';
//import ViewUsersComponent from '../../components/UserManagement/ViewUsersComponent';

import { ViewUsersBulkImportTemplate } from '../../utils/ViewUsersBulkImportTemplate';
import { PAGINATION } from '../../constants';
import Grid from '../../components/common/Grid';


class ViewUsersBulkImport extends Component {

    constructor(props){
        super(props);
        this._getData(
            {
                pageNumber: 0,
                pageSize: PAGINATION.pageSize
            }
        );
      }

      componentDidMount() {
        window.scrollTo(0, 0);
      }

    _getData = data => {
        const { authToken } = this.props.Login;
        data.authToken = authToken;
        this.props.viewBulkImport(data);
      }
    
    _viewDetails = (link, id) => {
        //this.props.history.push(data);
        this.props.navigate({ currentPage: link, id  });
    }

    render() {
       const { data } = this.props;
       const gridTemplate = data && data.length>0 ? ViewUsersBulkImportTemplate(data) : { 'head': [], 'body': [] };
       const { head, body } = gridTemplate;
        return (
          <div className='container'>
              {/* <div className='wrapper-viewbulk-import'>
                  <div className='viewbulk-import-container'> */}
                    { data && gridTemplate && <Grid 
                      head={ head }
                      body={ body }
                                              />
                    }
                    {/* <ViewUsersComponent usersData={ data } viewDetailsfn={ this._viewDetails } template={ gridTemplate } getData={ this._getData }/> */}
                  {/* </div>
          </div> */}
          </div>
        );
    }
}

const mapStateToProps = state => {
    const { Login, ViewUsersBulkImport } = state;
    const data = ViewUsersBulkImport ? ViewUsersBulkImport.importedFiles: [];
    
    return {
        data,
        Login
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        viewBulkImport: (data) => {
            return dispatch({ type: GET_ADD_BULK_IMPORT, data });
        },
        navigate: data => {
            return dispatch({ type: NAVIGATION, data });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewUsersBulkImport);