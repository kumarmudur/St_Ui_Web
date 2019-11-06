
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NAVIGATION } from '../../actions';
import { PATCH_UPDATE_PROPOSAL, GET_PROPOSAL_PROGRESS } from '../../actions/proposalManagement';
import { Modal, Breadcrumb } from '../../components/common';
//import AlertModal from '../../components/common/AlertModal';
import { ICONS, CANCEL_PROPOSAL_CONFIRM_MSG } from '../../constants';

import '../../styles/users.scss';
import '../../styles/proposal.scss';

class ProposalDetail extends Component {
    constructor(props) {
        super(props);
        if(props && props.id) {
            this.props.viewProposalProgress({ proposalId: props.id });
            //this._getRoleList();
        }
        this.state = {
          id: props.id,
          showDeleteModal: false,
          showActivityModal: false,
          showTimeModal: false,

          proposalData: {
            customerId: '212W48',
            proposalId: '212W48-1-1',
            users: [
              {
                id: 555,
                name: 'Junior',
                role: 'admin'
              },
              {
                id: 556,
                name: 'Heather',
                role: 'sub-admin'
              },
              {
                id: 557,
                name: 'Mark',
                role: 'sales'
              },
            ],
            proposalProgress: [
              {
                label: 'Quotation-In-progress',
                status: 'Complete',
                dateTime: 'defaultDateTimeFormatAsInAllAPIS',
                assignedUserId: 557
              },
              {
                label: 'Compare & Select Plan',
                status: 'Complete',
                dateTime: 'defaultDateTimeFormatAsInAllAPIS',
                assignedUserId: 557
              },
              {
                label: 'Generate Agreement',
                status: 'Incomplete',
                dateTime: 'defaultDateTimeFormatAsInAllAPIS',
                assignedUserId: null
              },
              {
                label: 'Quotation-In-progress',
                status: 'Complete',
                dateTime: 'defaultDateTimeFormatAsInAllAPIS',
                assignedUserId: 557
              },
              {
                label: 'Compare & Select Plan',
                status: 'Complete',
                dateTime: 'defaultDateTimeFormatAsInAllAPIS',
                assignedUserId: 557
              },
              {
                label: 'Generate Agreement',
                status: 'Incomplete',
                dateTime: 'defaultDateTimeFormatAsInAllAPIS',
                assignedUserId: null
              },
              {
                label: 'Quotation-In-progress',
                status: 'Complete',
                dateTime: 'defaultDateTimeFormatAsInAllAPIS',
                assignedUserId: 557
              },
              {
                label: 'Compare & Select Plan',
                status: 'Complete',
                dateTime: 'defaultDateTimeFormatAsInAllAPIS',
                assignedUserId: 557
              },
              {
                label: 'Generate Agreement',
                status: 'Incomplete',
                dateTime: 'defaultDateTimeFormatAsInAllAPIS',
                assignedUserId: null
              },
              {
                label: 'Quotation-In-progress',
                status: 'Complete',
                dateTime: 'defaultDateTimeFormatAsInAllAPIS',
                assignedUserId: 557
              },
              {
                label: 'Compare & Select Plan',
                status: 'Complete',
                dateTime: 'defaultDateTimeFormatAsInAllAPIS',
                assignedUserId: 557
              },
              {
                label: 'Generate Agreement',
                status: 'Incomplete',
                dateTime: 'defaultDateTimeFormatAsInAllAPIS',
                assignedUserId: null
              },
              {
                label: 'Quotation-In-progress',
                status: 'Complete',
                dateTime: 'defaultDateTimeFormatAsInAllAPIS',
                assignedUserId: 557
              },
              {
                label: 'Compare & Select Plan',
                status: 'Complete',
                dateTime: 'defaultDateTimeFormatAsInAllAPIS',
                assignedUserId: 557
              },
              {
                label: 'Generate Agreement',
                status: 'Incomplete',
                dateTime: 'defaultDateTimeFormatAsInAllAPIS',
                assignedUserId: null
              },
              {
                label: 'Quotation-In-progress',
                status: 'Complete',
                dateTime: 'defaultDateTimeFormatAsInAllAPIS',
                assignedUserId: 557
              }
            ]
          }
        };
    }

    
    // _navigateTo = (page) => {
    //     this.props.navigate({ currentPage: page });
    // }

    

    closeModal = () => {
        this.props.setAlertStatus({ 'visible': false });
        this._changePage();
    }
    _changePage = () => {
      this.props.navigate({ currentPage: 'MANAGE_CUSTOMER_PROPOSAL' });
    }

    // _printAgreement = data => {
    //     const { authToken } = this.props.Login;
    //     const dataObj = {
    //         data,
    //         authToken
    //     };
    //     this.props.printAgreement(dataObj);
    // }

    _confirmDelete = () => {
      // const { Login } = this.props;
      // const { authToken } = Login;
      // const { proposalData } = this.state;
      // const dataObj = {
      //     data: {
      //         id: proposalData.proposalId
      //     },
      //     authToken
      // };
      //this.props.postDeleteProduct(dataObj);
      this._toggleModal();
    }
    _toggleModal = () => {
      this.setState({
          showDeleteModal: !this.state.showDeleteModal
      });
    }
    _toggleActivityModal = () => {
      this.setState({
        showActivityModal: !this.state.showActivityModal
      });
    }
    _toggleTimeModal = () => {
      this.setState({
        showTimeModal: !this.state.showTimeModal
      });
    }

    _assignUser = e => {
      console.log(e.currentTarget.id);
    }

    render() {
       const { proposalData, showDeleteModal, showActivityModal, showTimeModal } = this.state;

       const usersList = proposalData.users.map( (item, j) => {
        return <option key={ j } value={ item.id }>{ item.name }</option>;
       });
       let rowClass = 'odd-row';
       const proposalProgressTemplate = proposalData.proposalProgress.map( (item, i) => {
          { rowClass = i%2 === 0 ? 'even-row' : 'odd-row'; }
          return <div className={ `row ${ rowClass }` }>
                  <div className="inline-div"> { item.label } </div>
                  <div className="inline-div"> { item.stauts } </div>
                  <div className="inline-div"> <span onClick={ this._toggleTimeModal }>{ item.dateTime }</span> </div>
                  <div className="inline-div"> 
                    <select onChange={ this._assignUser } >
                      { usersList }
                      {/* <option value={ item.assignedUserId } > { item.assignedUserId } </option> */}
                    </select>
                   </div>
                </div>;
       });

      const modalBody = CANCEL_PROPOSAL_CONFIRM_MSG;
      const buttonMeta = [
            {
                name: 'CANCEL',
                class: 'btn-cancel',
                onclick: this._toggleModal
            },
            {
                name: 'OK',
                class: 'btn-delete',
                onclick: this._confirmDelete
            }
      ];

      const buttonActivityMeta = [
        {
          name: 'OK',
          class: 'btn-cancel',
          onclick: this._toggleActivityModal
        },
      ];
      const modalActivityBody = <div>
        <div>
          <h5>March 29, 2019</h5>
          <div><label>Status 'Concept design approved' changed to 'Completed'</label></div>
          <div>Cedrick</div>
          <div><label>7.30 PM</label></div>
        </div>
      </div>;

      const buttonTimeMeta = [
        {
          name: 'OK',
          class: 'btn-cancel',
          onclick: this._toggleTimeModal
        },
      ];
      const modalTimeBody = <div>
        <div>Time</div>
        <div className="inline-div">
          <input type='text' placeholder='From' />
          <select>
            <option selected value='AM'>AM</option>
            <option value='PM'>PM</option>
          </select>
          <input type='text' placeholder='To' />
          <select>
            <option value='AM'>AM</option>
            <option selected value='PM'>PM</option>
          </select>
        </div>
      </div>;

        return (
            <div className="container">
                <div className="proposal-breadcrumb">
                  <Breadcrumb 
                    firstTitle="Proposal Management"
                    secondTitle="Manage Proposals"
                    thirdTitle="View Proposal"
                    changePage={ this._changePage }
                  />
                </div>  
                {/* <AlertModal 
                  isShowModal={ this.props.isAlertVisible } 
                  modalBody={ successMessage }
                  closeModal={ this.closeModal }
                /> */}



                <Modal 
                  title="Confirmation" 
                  isShowModal={ showDeleteModal }
                  closeModal={ this._toggleModal }
                  modalBody={ modalBody }   
                  buttons={ buttonMeta }
                />
                <Modal 
                  title="Activity Log" 
                  isShowModal={ showActivityModal }
                  closeModal={ this._toggleActivityModal }
                  modalBody={ modalActivityBody }   
                  buttons={ buttonActivityMeta }
                />
                <Modal 
                  title="Date" 
                  isShowModal={ showTimeModal }
                  closeModal={ this._toggleTimeModal }
                  modalBody={ modalTimeBody }   
                  buttons={ buttonTimeMeta }
                />

                <div className="content">
                  <div className="row margin-bottom">
                      <div className="row-heading border-separator">
                      <div className="label-content label-content30"><span className="form-label">Customer Id</span> <span className="form-label-text">{ proposalData.customerId }</span></div>
                      <div className="label-content label-content30"><span className="form-label">Proposal Id</span> <span className="form-label-text">{ proposalData.proposalId }</span></div>

                          <div className="back-button aside-wrapper">
                              <a href="#" onClick={ this._toggleModal }>Cancel Agreement </a>
                              <a href="#" onClick={ this._toggleActivityModal }>Activity Log </a>
                          </div>
                          <div className="clear"></div>
                      </div>
                      <div className="row-heading border-separator">
                        <b>Track Solar Quotation & Agreement progress </b>
                          <div className="back-button aside-wrapper">
                              <a href="#" onClick={ this._navigateTo }><img src={ ICONS.PRINT } /> </a>
                              <a href="#" onClick={ this._navigateTo }><img src={ ICONS.EDIT } /></a>
                          </div>
                          <div className="clear"></div>
                      </div>
                  </div>
                  <div className="containerStyle">
                      {/* <div className="row">
                          <div className="cols-user-detail">
                              <div className="cols-fields">
                                  
                                  <div className="label-content"><span className="form-label">Name</span> <span className="form-label-text">{ proposalData.customerId }</span></div>
                              </div>
                          </div>
                          <div className="cols-user-detail">
                              <div className="cols-fields">
                                  
                                  <div className="label-content"><span className="form-label">Email</span> <span className="form-label-text">{ proposalData.customerId }</span></div>
                              </div>
                          </div>
                          <div className="cols-user-detail">
                              <div className="cols-fields">
                                  
                                  <div className="label-content"><span className="form-label">Mobile</span> <span className="form-label-text">{ proposalData.customerId }</span></div>
                              </div>
                          </div>
                      </div> */}

                      <div className='row odd-row'>
                        <div className="inline-div"> Solar Quotation Progress </div>
                        <div className="inline-div"> Update Stauts </div>
                        <div className="inline-div"> Tentative Completion - Date & Time </div>
                        <div className="inline-div"> Assign User </div>
                      </div>
                      { proposalProgressTemplate }
                  </div>
              </div>   
            </div>
            );
    }
}
const mapStateToProps = () => {
    // const { Login, PostAdminAdditionalInfo, PostAdminRejectAssociate, AlertStatus, UserData, PrintAgreementStatus, GetRoleList, PostAdminPrintAgreement } = state;
    // const roleList= GetRoleList && GetRoleList.roleList ? GetRoleList.roleList : [];
    return {
       /*  UserData,
        Login,
        isAlertVisible: AlertStatus.visible,
        AdminRejectUser: PostAdminRejectAssociate,
        AdminPrintAgreement: PostAdminPrintAgreement,
        roleList,
        printAgreementEnabled: PrintAgreementStatus.downloadFile,
        AdminAdditionalInfo: { code : PostAdminAdditionalInfo.code, message:PostAdminAdditionalInfo.message } */
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        navigate: data => {
            return dispatch({ type: NAVIGATION, data });
        },
        updateProposal: (data) => {
          return dispatch({ type: PATCH_UPDATE_PROPOSAL, data });
        },
        viewProposalProgress: (data) => {
          return dispatch({ type: GET_PROPOSAL_PROGRESS, data });
        },

        
        // printAgreement: data => {
        //     return dispatch({ type: POST_ADMIN_PRINT_AGREEMENT, data });
        // },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProposalDetail);