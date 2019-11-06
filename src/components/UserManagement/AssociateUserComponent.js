import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { LogoImage, Button } from '../common';
import AssociateDocumentUpload from './AssociateDocumentUpload';
import { ADMIN_USER, ICONS } from '../../constants';
import { getDateTime } from '../../utils/extractDateTime';
import AdminCommentsHistoryComponent from '../../components/UserManagement/AdminCommentsHistoryComponent';
const path = require('path');

class AssociateUserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            documentList: [],
            fileType: null,
            documentError: '',
            tabStatus: this._getInitalState(props)
         };
         
    }

    _getInitalState = props => {
        const { status } = props && props.userDetails;
        const tabsObject = {
            showGeneralTab: true,
            showDocumentTab: false,
            showAgreementTab: false
        };
        if (status === 'DOCUMENTS_SUBMITTED' || status === 'DOCUMENTS_REQUESTED' || status === 'REJECTED' || status === 'GENERAL_INFO_SUBMITTED') {    
            tabsObject.showDocumentTab = true;
            tabsObject.showGeneralTab = false;
            tabsObject.showAgreementTab = false;
        }
        else if (status === 'AGREEMENT_SENT' || status === 'AGREEMENT_ESIGNED') {
            tabsObject.showAgreementTab = true; 
            tabsObject.showDocumentTab = false;
            tabsObject.showGeneralTab = false;
        }
        return tabsObject;
    }

    _toggleTabs = e => {
        let tabsObject = {
            showGeneralTab: true,
            showDocumentTab: false,
            showAgreementTab: false
        };

        switch(e.currentTarget.title){
            case 'General': ({...tabsObject } = { showGeneralTab: true, showDocumentTab: false, showAgreementTab: false });
            break;
            case 'Documents': ({...tabsObject } = { showGeneralTab: false, showDocumentTab: true, showAgreementTab: false });
            break;
            case 'Agreement': ({...tabsObject } = { showGeneralTab: false, showDocumentTab: false, showAgreementTab: true });
            break;
         }
        this.setState({
            tabStatus: tabsObject
        });
    };

    _logout = () => {
        this.props.logout();
    }

    handleFileUpload = (fileData, fileType) => {
        const { documentList } = this.state;
        let fileArrayList = null;
        let filterFileList = null;
        if(fileData) {
            filterFileList = documentList && documentList.filter(filelist => filelist.fileType === fileType);
            if(filterFileList.length > 0) {
                let index = documentList.findIndex(x => x.fileType === fileType);
                if(!fileData.name) { 
                    documentList.splice(index,1);
                }
                else {
                    documentList[index] = fileData;     
                }
                fileArrayList = documentList;
            }
            else {
                fileArrayList = documentList.concat([ { file: fileData, fileType }]);
            }
            this.setState({
                documentList : fileArrayList,
                documentError: ''
            });
        }
    }

    _submitFiles = () => {
        const { documentList } = this.state;
        if(documentList.length > 0) {
            this.props.submitFiles(documentList);
        }
        else {
            this.setState({
                documentError : ADMIN_USER.DOCUMENT_UPLOAD_ERROR
            });
        }
    }

    render() {
        const { userDetails } = this.props;
        const userStatus = userDetails.status;
        const userComments = userDetails.comments;
        const { documentError } = this.state;
        let { showGeneralTab, showDocumentTab, showAgreementTab } = this.state.tabStatus;
        showGeneralTab = showGeneralTab === true ? 'active' : null;
        showDocumentTab = showDocumentTab === true ? 'active' : null;
        showAgreementTab = showAgreementTab === true ? 'active' : null;

        let generalInfoStep = '';
        let documentStep = '';
        let agreementStep = '';
        if(userStatus === 'GENERAL_INFO_SUBMITTED' || userStatus === 'REJECTED' || userStatus === 'DOCUMENTS_REQUESTED') {
            generalInfoStep = 'completed'; 
        }
        if(userStatus === 'DOCUMENTS_SUBMITTED') {
            documentStep = 'completed'; 
            generalInfoStep = 'completed';
        }
        if(userStatus === 'AGREEMENT_SENT') {
            documentStep = 'completed'; 
            generalInfoStep = 'completed';
        }
        if(userStatus === 'AGREEMENT_ESIGNED') {
            documentStep = 'completed'; 
            generalInfoStep = 'completed';
            agreementStep = 'completed'; 
        }
        let generalTabClass = (!showGeneralTab && 'inactive-tabText' || showGeneralTab && 'activeTab');
        if(generalInfoStep) { 
            generalTabClass = 'processed';
        }

        let documentTabClass = (!showDocumentTab && 'inactive-tabText' || showDocumentTab && 'activeTab');
        if(documentStep) { 
            documentTabClass = 'processed';
        }

        let agreementTabClass = (!showAgreementTab && 'inactive-tabText' || showAgreementTab && 'activeTab');
        if(agreementStep) { 
            agreementTabClass = 'processed';
        }
        
        const contactPersonFields = userDetails.contactPersons && userDetails.contactPersons.map(item => (
            <div className="row border-separator">
                <div className="cols">
                    <span className="form-label">Name</span> <span className="form-label-text">{ item.name }</span>
                </div>
                <div className="cols">
                    <span className="form-label">Email</span> <span className="form-label-text">{ item.email }</span>
                </div>
                <div className="cols">
                    <span className="form-label">Phone</span> <span className="form-label-text"><span className="phone-constant-readonly">+1</span>{ item.phone }</span>
                </div>
            </div>
        ));
        
        const uploadedDocuments = userDetails.registrationDocs && Object.keys(userDetails.registrationDocs).map( key => {
            let file = userDetails.registrationDocs[key];
            if(file && file.documentName) {
                return ( <div className="cols inlineBlock">
                    <p> { userDetails.registrationDocs[key].documentName === 'insurance' ? 'INSURANCE': null }
                        { userDetails.registrationDocs[key].documentName === 'drivingLicense' ? 'DRIVER LICENSE': null }
                        { userDetails.registrationDocs[key].documentName === 'SH4' ? 'FORM W-9': null }
                        { userDetails.registrationDocs[key].documentName === 'SSN' ? 'FEIN / SSN': null }
                    </p>
                    <span className="attachment" /><span className="form-label-text">
                        <NavLink download={ file.originalname } to={ path.resolve('/files', file.fileName) } target="_self">{ file.originalname }</NavLink>
                    </span>
                </div>
             );
            }
        });

        const insuranceDocument = userDetails.registrationDocs && userDetails.registrationDocs['insurance'];
        const drivingLicenseDocument = userDetails.registrationDocs && userDetails.registrationDocs['drivingLicense'];
        const sh4Document = userDetails.registrationDocs && userDetails.registrationDocs['SH4'];
        const ssnDocument = userDetails.registrationDocs && userDetails.registrationDocs['SSN'];
        const showSubmitButton = showDocumentTab && (userStatus === 'GENERAL_INFO_SUBMITTED' || userStatus === 'DOCUMENTS_REQUESTED');
        return ( 
            <div>
                <div className="logo-wrapper">
                    <LogoImage className="associate-user-logo"/>
                    <div className="loggedIn-user">
                        <span><img src={ ICONS.USER_GREEN }/>{ userDetails.firstName }</span>
                        <div className='topNavMenu'>
                           <NavLink className='topNavMenuLinks' to="#logout" name='LOGOUT' onClick={ this._logout }>Log Out</NavLink>
                        </div>
                    </div> 
                </div>
                <div className="wrapper-user">
                    <div className="row-heading">
                        <div className="heading-generalInfo">
                            <p onClick={ this._toggleTabs } title='General' className={ generalTabClass }><i className={ (generalInfoStep && 'checkMark-green' || 'checkMark-gray') }/>General Info</p>
                        </div>
                        <div className="heading-documents">
                            <p onClick={ this._toggleTabs } title='Documents' className={ documentTabClass }><i className={ (documentStep && 'checkMark-green' || 'checkMark-gray') }/>Documents</p>
                        </div>
                        <div className="heading-agreement">
                            <p onClick={ this._toggleTabs } title='Agreement' className={ agreementTabClass }><i className={ (agreementStep && 'checkMark-green' || 'checkMark-gray') }/>Agreement</p>
                        </div>
                        <div className="user-status-message">
                            <p>
                                { userStatus === 'GENERAL_INFO_SUBMITTED' && ADMIN_USER.GENERAL_INFO_SUBMITTED_MSG }
                                { userStatus === 'DOCUMENTS_SUBMITTED' && ADMIN_USER.DOCUMENTS_SUBMITTED_MSG }
                                { userStatus === 'DOCUMENTS_REQUESTED' && ADMIN_USER.DOCUMENTS_REQUESTED_MSG }
                                { userStatus === 'REJECTED' && <span className='rejected'>{ `${ ADMIN_USER.ADMIN_REJECT_USER_MSG }` }</span> }
                            </p>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div className="content general-info-view">
                        
                        { showGeneralTab && (
                                <div>
                                    <div className="row clear">
                                    <div className="text-alignment field-padding border-separator">
                                        <div className="heading-tabs">General Info</div>
                                    </div>
                                </div>
                                <div className="row border-separator">
                                    <div className="cols">
                                        <span className="form-label">Name</span> <span className="form-label-text">{ userDetails.firstName } { userDetails.lastName }</span> <br />
                                    </div>
                                    <div className="cols">
                                        <span className="form-label">Email</span> <span className="form-label-text">{ userDetails.email }</span>
                                    </div>
                                    <div className="cols">
                                        <span className="form-label user-contactinfo">Mobile</span> <span className="form-label-text"><span className="phone-constant-readonly">+1</span>{ userDetails.phone }</span> <br />
                                    </div>
                                </div> 

                                <div className="row">
                                    <div className='radio-btn-group'>
                                        <input disabled type='radio' value='Company' checked='true' name='company' /><span>Company</span>
                                        <input disabled type='radio' value='Vendor' name='company'/><span>Vendor</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="heading-viewProfile heading-company">
                                        <p>Company Representative</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="cols">
                                        <span className="form-label">First Name</span> <span className="form-label-text">{ userDetails.representativeFirstName }</span>
                                    </div>
                                    <div className="cols">
                                        <span className="form-label">Last Name</span> <span className="form-label-text">{ userDetails.representativeLastName }</span>
                                    </div>
                                </div>            
                                <div className="row border-separator">
                                    <div className="cols">
                                        <span className="form-label">Company Name</span> <span className="form-label-text">{ userDetails.companyName }</span>
                                    </div>
                                    <div className="cols">
                                        <span className="form-label">Company FEIN</span> <span className="form-label-text">{ userDetails.companyEin }</span>
                                    </div>
                                    <div className="cols">
                                        <span className="form-label">SSN</span> <span className="form-label-text">{ userDetails.ssn }</span>
                                    </div>
                                    <div className="cols">
                                        <span className="form-label">Driver License Number</span> <span className="form-label-text">{ userDetails.driverLicenseNumber }</span>
                                    </div>
                                    <div className="cols">
                                        <span className="form-label">Company Registration State</span> <span className="form-label-text">{ userDetails.companyRegistrationState }</span>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="heading-viewProfile">
                                        <p>Address</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="cols">
                                        <span className="form-label">Address 1</span> <span className="form-label-text">{ userDetails.houseBuilding }</span>
                                    </div>
                                    <div className="cols">
                                        <span className="form-label">Address 2</span> <span className="form-label-text">{ userDetails.street }</span>
                                    </div>
                                    <div className="cols">
                                        <span className="form-label">Zip Code</span> <span className="form-label-text">{ userDetails.zipCode }</span>
                                    </div>
                                    <div className="cols">
                                        <span className="form-label">City</span> <span className="form-label-text">{ userDetails.city }</span>
                                    </div>
                                </div>
                                <div className="row border-separator">
                                    <div className="cols">
                                        <span className="form-label">County</span> <span className="form-label-text">{ userDetails.county }</span>
                                    </div>
                                    <div className="cols">
                                        <span className="form-label">State</span> <span className="form-label-text">{ userDetails.state }</span>
                                    </div>
                                    <div className="cols">
                                        <span className="form-label">Country</span> <span className="form-label-text">{ userDetails.country }</span>
                                    </div>
                                </div>
                                { userDetails.contactPersons && <div className="row">
                                    <div className="heading-viewProfile">
                                        <p>Contact Person</p>
                                    </div>
                                </div> }
                                <div>
                                    { contactPersonFields }
                                </div>
                            </div>
                        )}
                        { showDocumentTab && (
                            <div className="grid-space">
                                { userStatus === 'GENERAL_INFO_SUBMITTED' && 
                                    <div>
                                        <AssociateDocumentUpload type="ADD" docType="All" fileUpload={ this.handleFileUpload } />
                                        <div className="row"><span className="file-error">{ documentError ? documentError : ''}</span></div>
                                        <div className="row border-separator">
                                            { uploadedDocuments }
                                        </div>
                                    </div>
                                }
                                { (userStatus === 'DOCUMENTS_SUBMITTED' || userStatus === 'AGREEMENT_SENT'|| userStatus === 'AGREEMENT_ESIGNED') && 
                                    <div className="row">
                                        <div className="row text-alignment field-padding border-separator">
                                            <div className="heading-tabs">Documents</div>
                                            <div className="clear"></div>
                                        </div>
                                        <div className="row border-separator">
                                            { uploadedDocuments }
                                        </div>
                                    </div>
                                }
                                { (userStatus === 'DOCUMENTS_REQUESTED' || userStatus === 'REJECTED') &&
                                    <div className="row">
                                        <div className="row text-alignment field-padding border-separator">
                                            <div className="heading-tabs">Documents</div>
                                            <div className="clear"></div>
                                        </div>
                                        { userComments && userComments.length > 0 &&  
                                            <AdminCommentsHistoryComponent userComments={ userComments } />
                                        }
                                        <div className="document-grid">
                                            <div className="document-grid-heading">
                                                <div className="document-grid-row">
                                                    <div className="document-grid-head">Document Name</div>
                                                    <div className="document-grid-head">Attachments</div>
                                                    <div className="document-grid-head">Last Updated</div>
                                                    <div className="document-grid-head">Status</div>
                                                </div>
                                            </div>
                                            <div className="document-grid-body">
                                                <div className="document-grid-row">
                                                    <div className="document-grid-cell document-col-width">Insurance</div>
                                                    <div className="document-grid-cell attachment-col-width">
                                                        { insuranceDocument && insuranceDocument.documentName &&
                                                            <div className="float-left grid-cell-left"> 
                                                                <span className="attachment" />
                                                                <span className="form-label-text">
                                                                    <NavLink className={ insuranceDocument.status==='Re-requested' && 'invalid-upload' || insuranceDocument.status && '' } download={ insuranceDocument && insuranceDocument.originalname } to={ path.resolve('/files', insuranceDocument && insuranceDocument.fileName) } target="_self">{ insuranceDocument && insuranceDocument.originalname }</NavLink>
                                                                </span>
                                                            </div>
                                                        }
                                                        <div className="float-right grid-cell-right">
                                                            { (!insuranceDocument || (insuranceDocument && insuranceDocument.status!=='Received')) &&
                                                                <AssociateDocumentUpload type="EDIT" docType="insurance" fileUpload={ this.handleFileUpload } />
                                                            }       
                                                            </div>
                                                    </div>
                                                    <div className="document-grid-cell lastupdated-col-width">{ insuranceDocument && insuranceDocument.lastUpdated && getDateTime('date', insuranceDocument.lastUpdated) }</div>
                                                    <div className="document-grid-cell status-col-width">{ insuranceDocument && insuranceDocument.status }</div>
                                                </div>
                                                <div className="document-grid-row">
                                                    <div className="document-grid-cell">Driver License</div>
                                                    <div className="document-grid-cell">
                                                        { drivingLicenseDocument && drivingLicenseDocument.documentName && 
                                                            <div className="float-left grid-cell-left">
                                                                <span className="attachment" />
                                                                <span className="form-label-text">
                                                                    <NavLink className={ drivingLicenseDocument.status==='Re-requested' && 'invalid-upload' || drivingLicenseDocument.status && '' } download={ drivingLicenseDocument && drivingLicenseDocument.originalname } to={ path.resolve('/files', drivingLicenseDocument && drivingLicenseDocument.fileName) } target="_self">{ drivingLicenseDocument && drivingLicenseDocument.originalname }</NavLink>
                                                                </span>
                                                            </div>
                                                        }
                                                        <div className="float-right grid-cell-right">
                                                            { (!drivingLicenseDocument || (drivingLicenseDocument && drivingLicenseDocument.status!=='Received')) &&
                                                                <AssociateDocumentUpload type="EDIT" docType="drivingLicense" fileUpload={ this.handleFileUpload } />
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="document-grid-cell">{ drivingLicenseDocument && drivingLicenseDocument.lastUpdated && getDateTime('date', drivingLicenseDocument.lastUpdated) }</div>
                                                    <div className="document-grid-cell">{ drivingLicenseDocument && drivingLicenseDocument.status }</div>
                                                </div>
                                                <div className="document-grid-row">
                                                    <div className="document-grid-cell">Form W-9</div>
                                                    <div className="document-grid-cell">
                                                        { sh4Document && sh4Document.documentName && 
                                                            <div className="float-left grid-cell-left">
                                                                <span className="attachment" />
                                                                <span className="form-label-text">
                                                                    <NavLink className={ sh4Document.status==='Re-requested' && 'invalid-upload' || sh4Document.status && '' } download={ sh4Document && sh4Document.originalname } to={ path.resolve('/files', sh4Document && sh4Document.fileName) } target="_self">{ sh4Document && sh4Document.originalname }</NavLink>
                                                                </span>
                                                            </div>
                                                        }
                                                        <div className="float-right grid-cell-right">
                                                            { (!sh4Document || (sh4Document && sh4Document.status!=='Received')) &&
                                                                <AssociateDocumentUpload type="EDIT" docType="SH4" fileUpload={ this.handleFileUpload } />
                                                            }
                                                            </div>
                                                    </div>
                                                    <div className="document-grid-cell">{ sh4Document && sh4Document.lastUpdated && getDateTime('date', sh4Document.lastUpdated) }</div>
                                                    <div className="document-grid-cell">{ sh4Document && sh4Document.status }</div>
                                                </div>
                                                <div className="document-grid-row">
                                                    <div className="document-grid-cell">FEIN / SSN</div>
                                                    <div className="document-grid-cell">
                                                        { ssnDocument && ssnDocument.documentName &&
                                                            <div className="float-left grid-cell-left">
                                                                <span className="attachment" />
                                                                <span className="form-label-text">
                                                                    <NavLink className={ ssnDocument.status==='Re-requested' && 'invalid-upload' || ssnDocument.status && '' } download={ ssnDocument && ssnDocument.originalname } to={ path.resolve('/files', ssnDocument && ssnDocument.fileName) } target="_self">{ ssnDocument && ssnDocument.originalname }</NavLink>
                                                                </span>
                                                            </div>
                                                        }
                                                        <div className="float-right grid-cell-right">
                                                            { (!ssnDocument || (ssnDocument && ssnDocument.status!=='Received')) &&
                                                                <AssociateDocumentUpload type="EDIT" docType="SSN" fileUpload={ this.handleFileUpload } />
                                                            }
                                                            </div>
                                                    </div>
                                                    <div className="document-grid-cell">{ ssnDocument && ssnDocument.lastUpdated && getDateTime('date', ssnDocument.lastUpdated) }</div>
                                                    <div className="document-grid-cell">{ ssnDocument && ssnDocument.status }</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row"><span className="file-error">{ documentError ? documentError : ''}</span></div>
                                    </div>                                        
                                }
                            </div>
                        )}

                        { showAgreementTab && (
                            <div>
                                <div className="row">
                                    <div className="row text-alignment field-padding border-separator">
                                        <div className="heading-tabs">Agreement</div>
                                        <div className="clear"></div>
                                    </div>
                                </div>
                                <div className="row agreement-content-style">
                                    <p>
                                        { userStatus === 'DOCUMENTS_SUBMITTED' && ADMIN_USER.AGREEMENT_DOCUMENTS_SUBMITTED }
                                        { userStatus === 'AGREEMENT_SENT' && ADMIN_USER.AGREEMENT_SENT }
                                        { userStatus === 'AGREEMENT_ESIGNED' && ADMIN_USER.AGREEMENT_ESIGNED }
                                        { userStatus === 'ACTIVE' && ADMIN_USER.AGREEMENT_ACTIVE }
                                        { (userStatus === 'DOCUMENTS_REQUESTED' || userStatus === 'GENERAL_INFO_SUBMITTED') && ADMIN_USER.AGREEMENT_DEFAULT_CONTENT }
                                    </p>
                                </div>
                            </div>      
                        )}
                        { showSubmitButton &&
                            <div className="row">
                                <div className="btn-group-footer">
                                   <Button 
                                     name="Submit" 
                                     type="button" 
                                     className="btn-save"
                                     onClick={ this._submitFiles }
                                   />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default AssociateUserComponent;
