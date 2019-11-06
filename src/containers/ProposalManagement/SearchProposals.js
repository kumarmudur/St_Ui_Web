import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NAVIGATION } from '../../actions';
import { DELETE_PROPOSAL, POST_SEARCH_PROPOSALS } from '../../actions/proposalManagement';
import ViewProposalsComponent from '../../components/ProposalManagement/ViewProposalsComponent';
import { viewProposalsTemplate } from '../../utils/viewProposalsTemplate';
import { PAGINATION, DELETE_CONFIRM_MSG, PAGE_SIZE_DEFAULT } from '../../constants';
import { Modal } from '../../components/common';

class SearchProposals extends Component {

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
              pageSize: PAGE_SIZE_DEFAULT,
              searchParams: props.searchParams,
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
        this.props.viewProposals(data);
      }
    
    _viewDetails = (link, id) => {
      this.props.navigate({ currentPage: link, id  });
    }

    _editProposal = (link, id) => {
        this.props.navigate({ currentPage: link, id });
    }

    _deleteProposal = (link, id) => {
        this._toggleModal();
        this.setState({
            proposalId: id
        });
    }

    _confirmDelete = () => {
        const { Login } = this.props;
        const { authToken } = Login;
        const { proposalId } = this.state;
        const dataObj = {
            data: {
                id: proposalId
            },
            authToken
        };
        this.props.proposalDelete(dataObj);
        this._toggleModal();
    }

    _toggleModal = () => {
        this.setState({
            isShowDeleteModal: !this.state.isShowDeleteModal
        });
     }

    render() {
       const { data, recordsCount, order } = this.props;
       const { isShowDeleteModal } = this.state;
       const gridTemplate = data && data.length>0 ? viewProposalsTemplate(data) : { 'head': [], 'body': [] };
       const modalBody = DELETE_CONFIRM_MSG;
       const buttonMeta = [
           {
               name: 'CANCEL',
               class: 'btn-cancel',
               onclick: this._toggleModal
           },
           {
                name: 'OKAY',
                class: 'btn-delete',
                onclick: this._confirmDelete
           }
       ];
        return (
            <div>
                <ViewProposalsComponent
                  order = { order }
                  proposalsData={ data } 
                  recordsCount={ recordsCount }
                  viewDetailsfn={ this._viewDetails } 
                  template={ gridTemplate }
                  getData={ this._getData }
                  editProposal={ this._editProposal }
                  deleteProposal={ this._deleteProposal }
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
    const { SearchProposals, Login } = state;
    const { proposal, recordsCount }  = SearchProposals;
    const order = SearchProposals.hasOwnProperty('order') ? SearchProposals.order : 'DESC';
    return {
        order,
        data: proposal,
        recordsCount: recordsCount,
        Login
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        userDelete: (data) => {
            return dispatch({ type: DELETE_PROPOSAL, data });
        },
        viewProposals: (data) => {
            return dispatch({ type: POST_SEARCH_PROPOSALS, data });
        },
        navigate: data => {
            return dispatch({ type: NAVIGATION, data });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchProposals);