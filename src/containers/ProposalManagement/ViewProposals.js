import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NAVIGATION } from '../../actions'; //, POST_FILTERS
import { DELETE_PROPOSAL, GET_VIEW_PROPOSALS } from '../../actions/proposalManagement';
//PATCH_UPDATE_PROPOSAL
import ViewProposalsComponent from '../../components/ProposalManagement/ViewProposalsComponent';
import { viewProposalsTemplate } from '../../utils/viewProposalsTemplate';
import { DELETE_CONFIRM_MSG, PAGE_SIZE_DEFAULT } from '../../constants';
import { Modal, Loader, NoRecordFound  } from '../../components/common';
import { loadData } from '../../utils/storage';

class ViewProposals extends Component {

    constructor(props){
        super(props);

        this.state = {
            isShowDeleteModal: false,
            userId: null,
            showLoader: true
        };
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

      componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.data){
          const {  data, recordsCount, order } = nextProps;
          this.setState({
            data, recordsCount, order,
            showLoader: false
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
       //const { data, recordsCount, order } = this.props;
       const { data, recordsCount, order, isShowDeleteModal, showLoader } = this.state;
       //const gridTemplate = data && data.length>0 ? viewProposalsTemplate(data, preSelectedFilter) : { 'head': [], 'body': [] };

       let gridTemplate;
       let preSelectedFilter =  loadData('view-proposals');
        preSelectedFilter = preSelectedFilter ? preSelectedFilter.data : [];

       if(preSelectedFilter && preSelectedFilter.length>0) {
        gridTemplate = data && data.length>0 ? viewProposalsTemplate(data, preSelectedFilter) : { 'head': [], 'body': [] };
       } else {
        gridTemplate = data && data.length>0 ? viewProposalsTemplate(data) : { 'head': [], 'body': [] };
       }



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

       let view = showLoader ? <Loader /> : <NoRecordFound />;
       if(!showLoader && data && data.length>0) {
       view = <ViewProposalsComponent
         order = { order }
         proposalsData={ data } 
         recordsCount={ recordsCount }
         viewDetailsfn={ this._viewDetails } 
         template={ gridTemplate }
         getData={ this._getData }
         editProposal={ this._editProposal }
         deleteProposal={ this._deleteProposal }
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
    const { ViewProposals, Login, Filters } = state;
    const { proposal, recordsCount}  = ViewProposals; //recordsCount
    const order = ViewProposals.hasOwnProperty('order') ? ViewProposals.order : 'DESC';
    
    return {
        order,
        data: proposal,
        recordsCount: recordsCount,
        Login,
        Filters
    };
  };

const mapDispatchToProps = dispatch => {
    return {
       /*  filterDispatcher: (data) => {
          return dispatch({ type: POST_FILTERS, data });
        }, */
        userDelete: (data) => {
            return dispatch({ type: DELETE_PROPOSAL, data });
        },
        viewProposals: (data) => {
            return dispatch({ type: GET_VIEW_PROPOSALS, data });
        },
        navigate: data => {
            return dispatch({ type: NAVIGATION, data });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProposals);