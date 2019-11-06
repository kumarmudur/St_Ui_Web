import React, { Component } from 'react';
import { connect } from 'react-redux';
import { POST_SEARCH_USERS, NAVIGATION, DELETE_USER } from '../../actions';
import ViewUsersComponent from '../../components/UserManagement/ViewUsersComponent';
import { viewUsersTemplate } from '../../utils/viewUsersTemplate';
import { PAGINATION, DELETE_CONFIRM_MSG } from '../../constants';
import Modal from '../../components/common/Modal';
class SearchUsers extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchParams: props.searchParams,
            isShowDeleteModal: false,
            userId: null
        };
        this._getData(
            {
                pageNumber: 0,
                pageSize: PAGINATION.pageSize,
                searchParams: props.searchParams
            }
        );
      }

    componentWillReceiveProps(nextProps) {        
        if(nextProps.searchParams && nextProps.searchParams.textSearch.length > 0 && nextProps.searchParams !== this.state.searchParams) {
            this._getData(
                {
                    pageNumber: 0,
                    pageSize: PAGINATION.pageSize,
                    searchParams: nextProps.searchParams
                }
            );
            this.setState({
                searchParams: nextProps.searchParams
            });
        }
    }

    _getData = data => {
        const { authToken } = this.props.Login;
        data.authToken = authToken;
        this.props.searchUsers(data);
      }
    
    _viewDetails = (link, id) => {
        this.props.navigate({ currentPage: link, id  });
    }

    _deleteUser = (link, id) => {
        this._toggleModal();
        this.setState({
            userId: id
        });
    }

    _confirmDelete = () => {
        const { Login } = this.props;
        const { authToken } = Login;
        const { userId } = this.state;
        const dataObj = {
            data: {
                id: userId
            },
            authToken
        };
        this.props.userDelete(dataObj);
        this._toggleModal();
    }

    _toggleModal = () => {
        this.setState({
            isShowDeleteModal: !this.state.isShowDeleteModal
        });
     }

     _viewDetails = (link, id) => {
        this.props.navigate({ currentPage: link, id  });
    }

    _editUser = (link, id) => {
        this.props.navigate({ currentPage: link, id });
    }

    render() {
       const { data, recordsCount } = this.props;
       const { isShowDeleteModal } = this.state;
       const gridTemplate = data && data.length>0 ? viewUsersTemplate(data) : { 'head': [], 'body': [] };
       const modalBody = DELETE_CONFIRM_MSG;
       const buttonMeta = [
        {
            name: 'Cancel',
            class: 'btn-cancel',
            onclick: this._toggleModal
        },
        {
             name: 'Ok',
             class: 'btn-delete',
             onclick: this._confirmDelete
        }
    ];
        return (
            <div>
                <ViewUsersComponent 
                  viewDetailsfn={ this._viewDetails }
                  usersData={ data }
                  template={ gridTemplate } 
                  getData={ this._getData }
                  deleteUser={ this._deleteUser }
                  editUser={ this._editUser }
                  viewDetailsfn={ this._viewDetails }
                  recordsCount={ recordsCount }
                />
                 <Modal 
                   title="Confirmation" 
                   isShowModal={ isShowDeleteModal }
                   closeModal={ this._toggleModal }
                   modalBody={ modalBody }   
                   buttons={ buttonMeta }
                 />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { SearchUsers, Login } = state;
    const data = SearchUsers.users;
    const recordsCount = SearchUsers.recordsCount;

    return {
        data,
        Login,
        recordsCount
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        userDelete: (data) => {
            return dispatch({ type: DELETE_USER, data });
        },
        searchUsers: (data) => {
            return dispatch({ type: POST_SEARCH_USERS, data });
        },
        navigate: data => {
            return dispatch({ type: NAVIGATION, data });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsers);