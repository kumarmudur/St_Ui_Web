import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GET_VIEW_USERS, NAVIGATION, DELETE_USER } from '../../actions';
import ViewUsersComponent from '../../components/UserManagement/ViewUsersComponent';
import { viewUsersTemplate } from '../../utils/viewUsersTemplate';
import { DELETE_CONFIRM_MSG, PAGE_SIZE_DEFAULT } from '../../constants';
import { Modal, Loader, NoRecordFound  } from '../../components/common';
import { loadData } from '../../utils/storage';

class ViewUsers extends Component {

    constructor(props){
        super(props);
        this.state = {
            isShowDeleteModal: false,
            showLoader: true,
            userId: null,
            data:null, recordsCount:0, order: 'DESC'
        };
        this._getData(
            {
                pageNumber: 0,
                pageSize: PAGE_SIZE_DEFAULT
            }
        );
      }
      
      componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.data){
          const {  data, recordsCount, order } = nextProps;
          this.setState({
            data, recordsCount, order,
            showLoader: false
          });
        }
      }

      componentDidMount() {
        window.scrollTo(0, 0);
      }
      
    _getData = data => {
        const { authToken } = this.props.Login;
        data.authToken = authToken;
        this.props.viewUsers(data);
      }
    
    _viewDetails = (link, id) => {
        this.props.navigate({ currentPage: link, id  });
    }

    _editUser = (link, id) => {
        this.props.navigate({ currentPage: link, id });
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

    render() {
       //const {  } = this.props;
       const { data, recordsCount, order, isShowDeleteModal, showLoader } = this.state;
       let preSelectedFilter =  loadData('view-users');
       preSelectedFilter = preSelectedFilter ? preSelectedFilter.data : [];
       let gridTemplate;
       if(preSelectedFilter && preSelectedFilter.length>0) {
        gridTemplate = data && data.length>0 ? viewUsersTemplate(data, preSelectedFilter) : { 'head': [], 'body': [] };
       } else {
        gridTemplate = data && data.length>0 ? viewUsersTemplate(data) : { 'head': [], 'body': [] };
       }
       
       

       
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


       let view = showLoader ? <Loader /> : <NoRecordFound />;
       if(!showLoader && data && data.length>0) {

       view =  <ViewUsersComponent
         order={ order }
         usersData={ data } 
         recordsCount={ recordsCount }
         viewDetailsfn={ this._viewDetails } 
         template={ gridTemplate } 
         getData={ this._getData }
         editUser={ this._editUser }
         deleteUser={ this._deleteUser }
                              />;
      }


        return (
            <div>
               { view }
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
    const { ViewUsers, Login } = state;
    const { users, recordsCount}  = ViewUsers;
    const order = ViewUsers.hasOwnProperty('order') ? ViewUsers.order : 'DESC';
    return {
        order,
        data: users,
        recordsCount: recordsCount,
        Login
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        userDelete: (data) => {
            return dispatch({ type: DELETE_USER, data });
        },
        viewUsers: (data) => {
            return dispatch({ type: GET_VIEW_USERS, data });
        },
        navigate: data => {
            return dispatch({ type: NAVIGATION, data });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewUsers);