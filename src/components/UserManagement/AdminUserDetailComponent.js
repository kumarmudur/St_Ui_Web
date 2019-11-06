import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/users.scss';
import { ICONS, ADMIN_USER, ADOBE_ESIGN } from '../../constants';
import { Button, Modal, DropdownBox, Calendar } from '../common';
import { getDateTime } from '../../utils/extractDateTime';
import AdminCommentsHistoryComponent from '../../components/UserManagement/AdminCommentsHistoryComponent';
const path = require('path');

class AdminUserDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowModal: false,
            checkedBoxes: [],
            comments: '',
            documentError: '',
            roleError: '',
            rejectError: '',
            documentList: this.getInitialstate(props, 'documents'),
            roleListOptions: this.getInitialstate(props, 'roles'),
            selectedRole: '',
            commentsList: this.getInitialstate(props, 'comments')
        };            
    }

    getInitialstate = (props, type) => {
        let obj = {};
        if(type === 'documents') {
            obj = {
                registrationDocs: props.userDetails && props.userDetails.registrationDocs || {}
            };
        }
        else if(type === 'comments') {
            obj =  props.userDetails && props.userDetails.comments || [];
        }
        else if(type === 'roles') {
            obj =  props && props.roleList || [];
        }
        return obj;
    }

    componentWillReceiveProps(nextProps) {
        let obj = {};
        if(nextProps && nextProps.userDetails) {
            obj = {
                registrationDocs: nextProps.userDetails && nextProps.userDetails.registrationDocs || {},
                comments: nextProps.userDetails && nextProps.userDetails.comments || [],
                roleList : nextProps && nextProps.roleList || []
            };
            this.setState({
                documentList: {
                    registrationDocs: obj.registrationDocs
                },
                commentsList: obj.comments,
                roleListOptions: obj.roleList
            });
        }      
    }

    _navigateTo = () => {
        this.props.navigateTo('VIEW_USERS');
    }

    _checkboxChange = e => {
        const { id, checked } = e.currentTarget;
        let { checkedBoxes, documentList, documentError } = this.state;
        if(checked === true) { 
            checkedBoxes.indexOf(id) === -1 ? checkedBoxes.push(id) : ''; 
            documentError = '';
        }
        else if(checked === false) { 
            checkedBoxes.indexOf(id) !== -1 ? checkedBoxes.splice(id, 1) : '';
        }
        this.setState({
            checkedBoxes,
            documentList,
            documentError
        });
    }

    _onFieldChange = e => {
        let { value, name } = e.currentTarget;
        if(name === 'comments' && value) {
            value = value.replace(/(?:\r\n|\r|\n)/g, ' ');
        }
        this.setState({
            [name]: value,
            rejectError: ''
        });
    }

    _requestAdditionalDocs = () => {
        const { registerId } = this.props.userDetails;
        const { documentList, checkedBoxes, commentsList, comments } = this.state;
        let documentError = '';
        let rejectError = '';
        let commentsListFields = [];
        documentList['registerId'] = registerId;
        commentsListFields = commentsList.concat([ { commentText: comments }]);
        documentList['comments'] = commentsListFields;
        checkedBoxes.map( documentKey => {
            if(documentList.registrationDocs[documentKey]) {
                documentList.registrationDocs[documentKey].status = ADMIN_USER.DOCUMENT_REREQUEST;
            }
            else {
                documentList.registrationDocs[documentKey] = {};
                documentList.registrationDocs[documentKey].status = ADMIN_USER.DOCUMENT_REQUEST;
            }
        });
        if(checkedBoxes.length > 0 && comments) {
            this.props.requestAdditionalDocs(documentList);
        }
        else {
            if(checkedBoxes.length === 0) {
                documentError = ADMIN_USER.ADDITIONAL_INFO_MSG;
            }
            if(!comments) {
                rejectError = ADMIN_USER.ADDITIONAL_INFO_COMMENTS;
            }
            this.setState({
                documentError,
                rejectError
            });
        }
    }

    _confirmRejectUser = () => {
        const { comments } = this.state;
        let isShowModal = false;
        let rejectError = '';
        if(comments) {
            isShowModal = true; 
        }
        else {
            rejectError = ADMIN_USER.REJECT_COMMENTS;
        }
        this.setState({
            isShowModal,
            rejectError
        });
    }

    _toggleModal = () => {
        this.setState({
          isShowModal: !this.state.isShowModal
        });
    }

    _rejectUser = () => {
        const { registerId, email, phone } = this.props.userDetails;
        const { comments, commentsList} = this.state;
        let commentsListFields = [];
        commentsListFields = commentsList.concat([ { commentText: comments }]);
        if(comments) {
            const payload = {
                registerId,
                email,
                phone,
                comments: commentsListFields,
                status: ADMIN_USER.REJECT_USER
            };
            this.props.rejectUser(payload);
            this._toggleModal();
        }
    }

    _onDateFieldChange = (name, date) => {
        let { documentList } = this.state;
        let indexValue = name && name.split('-');
        let keyName = indexValue && indexValue[0];
        let fieldName = indexValue && indexValue[1];
        let dateFormat = '';
        if(date) {
            let currentDate = new Date(date);
            let mm = currentDate.getMonth() + 1;
            let dd = currentDate.getDate();
            let yyyy = currentDate.getFullYear();
            dateFormat = mm + '-' + dd + '-' + yyyy;
        }
        if(documentList.registrationDocs) {
            documentList.registrationDocs[keyName][fieldName] = dateFormat;
            this.setState({
                documentList
            });
        }
    }

    _onChangeSelectRole = value => {
        const selectedValue = value;
        this.setState({
            selectedRole: selectedValue.value,
            roleError: ''
        });
    };

    _sendAgreement = () => {
        const { registerId } = this.props.userDetails;
        const { selectedRole } = this.state;
        if(selectedRole) {
            const payload = {
                registerId,
                selectedRole
            };
            this.props.sendAgreementRegisterId(payload);
            window.open(`${ADOBE_ESIGN.OAUTH_URL}?redirect_uri=${ADOBE_ESIGN.CALLBACK_URL}&response_type=code&client_id=${ADOBE_ESIGN.CLIENT_ID}&scope=user_login:self+agreement_send:account+agreement_read:account+agreement_write:account`);
        }
        else {
            this.setState({
                roleError: ADMIN_USER.ROLE_ERROR_MSG,
                documentError: '',
                rejectError: ''
            });
        }
    }
    
    _printAgreement = () => {
        const { registerId } = this.props.userDetails;
        const { selectedRole } = this.state;
        if(selectedRole) {
            const payload = {
                registerId,
                selectedRole
            };
            this.props.printAgreement(payload);
        }
        else {
            this.setState({
                roleError: ADMIN_USER.ROLE_ERROR_MSG,
                documentError:'',
                rejectError: ''
            });
        }
    }

    render() {
        const { isShowModal, selectedRole } = this.state;
        // TODO: roleListOptions
        const modalBody = ADMIN_USER.REJECT_CONFIRM_MSG;
        const buttonMeta = [
        {
            name: 'Cancel',
            class: 'btn-cancel',
            onclick: this._toggleModal
        },
        {
            name: 'Ok',
            class: 'btn-delete',
            onclick: this._rejectUser
        }];

        const userDetails = this.props && this.props.userDetails ? this.props.userDetails : null;
        const userStatus = userDetails && userDetails.status;
        let disableRejectButton = false;
        if(userStatus === 'REJECTED') {
            disableRejectButton = true;
        }
        const agreementPath = this.props && this.props.agreementPath ? this.props.agreementPath : '';
        if(agreementPath) {
            const link = document.createElement('a');
            link.href = agreementPath;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        let updatedDateTime = '';
        let registeredDate = '';
        const { registrationDocs } = this.state.documentList;
        if(userDetails && userDetails.updatedDateTime) {
            updatedDateTime = getDateTime('date', userDetails.updatedDateTime);
        }
        if(userDetails && userDetails.createdDateTime) {
            registeredDate = getDateTime('date', userDetails.createdDateTime);
        }
        const insuranceDocument = registrationDocs && registrationDocs['insurance'];
        const drivingLicenseDocument = registrationDocs && registrationDocs['drivingLicense'];
        const sh4Document = registrationDocs && registrationDocs['SH4'];
        const ssnDocument = registrationDocs && registrationDocs['SSN'];
        const userComments = userDetails && userDetails.comments;

        const formattedInsuranceStartDate = insuranceDocument && insuranceDocument.startDate && getDateTime('date', insuranceDocument.startDate);
        const formattedInsuranceExpiryDate = insuranceDocument && insuranceDocument.expiryDate && getDateTime('date', insuranceDocument.expiryDate);

        const formattedDrivingLicenseStartDate = drivingLicenseDocument && drivingLicenseDocument.startDate && getDateTime('date', drivingLicenseDocument.startDate);
        const formattedDrivingLicenseExpiryDate = drivingLicenseDocument && drivingLicenseDocument.expiryDate && getDateTime('date', drivingLicenseDocument.expiryDate);

        const formattedSH4StartDate = sh4Document && sh4Document.startDate && getDateTime('date', sh4Document.startDate);
        const formattedSH4ExpiryDate = sh4Document && sh4Document.expiryDate && getDateTime('date', sh4Document.expiryDate);

        const formattedSSNStartDate = ssnDocument && ssnDocument.startDate && getDateTime('date', ssnDocument.startDate);
        const formattedSSNExpiryDate = ssnDocument && ssnDocument.expiryDate && getDateTime('date', ssnDocument.expiryDate);

        // TODO: const roleList = roleListOptions && roleListOptions.length > 0 && roleListOptions.map(role => {
        //     return {
        //         label: role.value,
        //         value: role.value
        //     };
        // });
        const roleList = [{
            label: 'Energy Consultant',
            value: 'Energy Consultant'
        },
        {
            label: 'Dealer',
            value: 'Dealer'
        }];

        return ( 
         <div>
            <div className="content">
                <div className="row wrapper-user-detail">
                    <div className="row-heading admin-user-detail">
                        <div className='border-separator field-padding'>
                            <div className="document-heading">Document Request</div>
                            {/* <div className="back-button">
                                <NavLink className='btn-roles roundedCorner link-style' to="#" onClick={ this._navigateTo }>Back </NavLink>
                            </div> */}
                            <div className="clear"></div>
                        </div>
                        <div className='document-list border-separator'>
                            <div className="row-file-info">
                                <label for='insurance' className={ insuranceDocument && !insuranceDocument.documentName ? 'document-name' : '' }>
                                    <input
                                      id='insurance'
                                      name='insurance'
                                      type='checkbox'
                                      onChange={ this._checkboxChange }
                                    />
                                INSURANCE
                                </label>
                                { insuranceDocument && insuranceDocument.documentName && 
                                <div className="document-info">
                                    <div className="attachment-block">
                                        <span className="attachment" /><span className="form-label-text">
                                            <NavLink download={ insuranceDocument.originalname } to={ path.resolve('/files', insuranceDocument.fileName) } target="_self">{ insuranceDocument.originalname }</NavLink>
                                        </span>
                                    </div>
                                    <span className="input-wrapper date-field-wrapper">
                                        <Calendar
                                          name="insurance-startDate"
                                          onDateChange={ this._onDateFieldChange.bind(this, 'insurance-startDate') } // eslint-disable-line
                                          date={ formattedInsuranceStartDate }
                                          placeholder="Start Date (MM/DD/YYYY)"
                                        />
                                    </span>
                                    <span className="input-wrapper date-field-wrapper">
                                        <Calendar
                                          onDateChange={ this._onDateFieldChange.bind(this, 'insurance-expiryDate') } // eslint-disable-line
                                          name="insurance-expiryDate"
                                          date={ formattedInsuranceExpiryDate }
                                          placeholder="Expiry Date (MM/DD/YYYY)"
                                        />
                                    </span>
                                </div>
                                }
                                <span className='status'>
                                    { insuranceDocument && insuranceDocument.status }
                                </span>
                            </div>
                            <div className="row-file-info">
                                <label for='drivingLicense' className={ drivingLicenseDocument && !drivingLicenseDocument.documentName ? 'document-name' : '' }>
                                    <input
                                      id='drivingLicense'
                                      name='drivingLicense'
                                      type='checkbox'
                                      onChange={ this._checkboxChange }
                                    />
                                    DRIVER LICENSE
                                </label>
                                { drivingLicenseDocument && drivingLicenseDocument.documentName && 
                                <div className="document-info">
                                    <div className="attachment-block">
                                        <span className="attachment" /><span className="form-label-text">
                                            <NavLink download={ drivingLicenseDocument.originalname } to={ path.resolve('/files', drivingLicenseDocument.fileName) } target="_self">{ drivingLicenseDocument.originalname }</NavLink>
                                        </span>
                                    </div>
                                    <span className="input-wrapper date-field-wrapper">
                                        <Calendar
                                          onDateChange={ this._onDateFieldChange.bind(this, 'drivingLicense-startDate') } // eslint-disable-line
                                          name="drivingLicense-startDate"
                                          date={ formattedDrivingLicenseStartDate }
                                          placeholder="Start Date (MM/DD/YYYY)"
                                        />
                                    </span>
                                    <span className="input-wrapper date-field-wrapper">
                                        <Calendar
                                          onDateChange={ this._onDateFieldChange.bind(this, 'drivingLicense-expiryDate') } // eslint-disable-line
                                          name="drivingLicense-expiryDate"
                                          date={ formattedDrivingLicenseExpiryDate }
                                          placeholder="Expiry Date (MM/DD/YYYY)"
                                        />
                                    </span>
                                </div> 
                                }   
                                <span className='status'>
                                    { drivingLicenseDocument && drivingLicenseDocument.status }
                                </span>
                            </div>
                            <div className="row-file-info">
                                <label for='SH4' className={ sh4Document && !sh4Document.documentName ? 'document-name' : '' }>
                                    <input
                                      id='SH4'
                                      name='SH4'
                                      type='checkbox'
                                      onChange={ this._checkboxChange }
                                    />
                                    FORM W-9
                                </label>
                                { sh4Document && sh4Document.documentName &&  
                                <div className="document-info">
                                    <div className="attachment-block">
                                        <span className="attachment" /><span className="form-label-text">
                                            <NavLink download={ sh4Document.originalname } to={ path.resolve('/files', sh4Document.fileName) } target="_self">{ sh4Document.originalname }</NavLink>
                                        </span>
                                    </div>
                                    <span className="input-wrapper date-field-wrapper">
                                        <Calendar
                                          onDateChange={ this._onDateFieldChange.bind(this, 'SH4-startDate') } // eslint-disable-line
                                          name="SH4-startDate"
                                          date={ formattedSH4StartDate }
                                          placeholder="Start Date (MM/DD/YYYY)"
                                        />
                                    </span>
                                    <span className="input-wrapper date-field-wrapper">
                                        <Calendar
                                          onDateChange={ this._onDateFieldChange.bind(this, 'SH4-expiryDate') } // eslint-disable-line
                                          name="SH4-expiryDate"
                                          date={ formattedSH4ExpiryDate }
                                          placeholder="Expiry Date (MM/DD/YYYY)"
                                        />
                                    </span>
                                </div>    
                                }
                                <span className='status'>
                                    { sh4Document && sh4Document.status }
                                </span>
                            </div>
                            <div className="row-file-info">
                                <label for='SSN' className={ ssnDocument && !ssnDocument.documentName ? 'document-name' : '' }>
                                    <input
                                      id='SSN'
                                      name='SSN'
                                      type='checkbox'
                                      onChange={ this._checkboxChange }
                                    />
                                    FEIN / SSN
                                </label>
                                { ssnDocument && ssnDocument.documentName &&  
                                <div className="document-info">
                                    <div className="attachment-block">
                                        <span className="attachment" /><span className="form-label-text">
                                            <NavLink download={ ssnDocument.originalname } to={ path.resolve('/files', ssnDocument.fileName) } target="_self">{ ssnDocument.originalname }</NavLink>
                                        </span>
                                    </div>
                                    <span className="input-wrapper date-field-wrapper">
                                        <Calendar
                                          onDateChange={ this._onDateFieldChange.bind(this, 'SSN-startDate') } // eslint-disable-line
                                          name="SSN-startDate"
                                          date={ formattedSSNStartDate }
                                          placeholder="Start Date (MM/DD/YYYY)"
                                        />
                                    </span>
                                    <span className="input-wrapper date-field-wrapper">
                                        <Calendar
                                          onDateChange={ this._onDateFieldChange.bind(this, 'SSN-expiryDate') } // eslint-disable-line
                                          name="SSN-expiryDate"
                                          date={ formattedSSNExpiryDate }
                                          placeholder="Expiry Date (MM/DD/YYYY)"
                                        />
                                    </span>
                                </div>
                                }    
                                <span className='status'>
                                    { ssnDocument && ssnDocument.status }
                                </span>
                            </div>
                            <span className="error"> {this.state.documentError ? this.state.documentError : ''} </span>
                        </div>
                        { userComments && userComments.length > 0 &&
                            <div className="row admin-comments">
                                <AdminCommentsHistoryComponent userComments={ userComments } />
                            </div> 
                        } 
                        <div class="row dropdown">
                            <div className="dropdown-role">
                                <DropdownBox 
                                  placeholder="Select Role"                           
                                  name="roleList"
                                  options = { roleList ? roleList : [] }
                                  onChangeSelect= { this._onChangeSelectRole }
                                  selectedValue={ selectedRole }
                                />
                            </div>
                            <span class="error"> { this.state.roleError ? this.state.roleError : '' } </span>
                            <div className="clear-float"></div>
                        </div>                                    
                        <div className="row admin-comments">
                            <div className="cols col-style">
                                <span className="input-wrapper">
                                    <span className="form-label">Comments</span>
                                        <textarea 
                                          placeholder='' 
                                          rows="3" cols="50" 
                                          maxLength="500"
                                          name="comments"
                                          onChange={ this._onFieldChange }
                                        >
                                        </textarea>
                                </span>
                                <span className="error"> {this.state.rejectError ? this.state.rejectError : ''} </span>
                            </div>
                        </div>
                        <div className="row border-separator">
                            <div className="footer-btn-space">
                                <Button 
                                  name="Reject"
                                  disabled={ disableRejectButton }
                                  type="button" 
                                  className="btn-additional-info"
                                  onClick={ this._confirmRejectUser }
                                />
                                <Button 
                                  name="Additional Info" 
                                  type="button" 
                                  className="btn-additional-info"
                                  onClick={ this._requestAdditionalDocs }
                                />
                            </div>    
                        </div>
                        <div className="row">
                            <div className="btn-group-footer footer-btn-space">
                                <Button 
                                  name="Print Agreement" 
                                  type="button" 
                                  className="btn-additional-info"
                                  onClick={ this._printAgreement }
                                />
                                <Button 
                                  name="Send Agreement" 
                                  type="button" 
                                  className="btn-additional-info"
                                  onClick={ this._sendAgreement }
                                />
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="row margin-bottom">
                    <div className="row-heading border-separator tab-user-detail">
                        <div className="heading-user-details">
                            <p>User Details</p>
                        </div>
                        {/* <div class="heading-accounts">
                            <p>Accounts</p>
                        </div> */}
                        <div className="clear"></div>
                    </div>
                </div>
                <div className="containerStyle">
                    <div className="row">
                        <div className="cols-user-detail">
                            <div className="cols-fields">
                                <div className="image-label"><img src={ ICONS.USERINPUT } width="18" height="20" alt="" /></div>
                                <div className="label-content"><span className="form-label">Name</span> <span className="form-label-text">{ userDetails.firstName } { userDetails.lastName }</span></div>
                            </div>
                        </div>
                        <div className="cols-user-detail">
                            <div className="cols-fields">
                                <div className="image-label"><img src={ ICONS.MAIL } width="18" height="20" alt="" /></div>
                                <div className="label-content"><span className="form-label">Email</span> <span className="form-label-text">{ userDetails.email }</span></div>
                            </div>
                        </div>
                        <div className="cols-user-detail">
                            <div className="cols-fields">
                                <div className="image-label"><img src={ ICONS.PHONE } width="18" height="20" alt="" /></div>
                                <div className="label-content"><span className="form-label">Mobile</span> <span className="form-label-text"><span className="phone-constant-readonly">+1</span>{ userDetails.phone }</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="cols-user-detail">
                            <div className="cols-fields">
                                <div className="image-label"><img src={ ICONS.USERINPUT } width="18" height="20" alt="" /></div>
                                <div className="label-content"><span className="form-label">User Type</span> <span className="form-label-text">{ userDetails.userType }</span></div>
                            </div>
                        </div>
                        <div className="cols-user-detail">
                            <div className="cols-fields">
                                <div className="image-label"><img src={ ICONS.USERGROUP } width="18" height="20" alt="" /></div>
                                <div className="label-content"><span className="form-label">User Group</span> <span className="form-label-text">{ userDetails.userGroup }</span></div>
                            </div>
                        </div>
                        <div className="cols-user-detail">
                            <div className="cols-fields">
                                <div className="image-label"><img src={ ICONS.ROLE } width="18" height="20" alt="" /></div>
                                <div className="label-content"><span className="form-label">Role</span> <span className="form-label-text">{ userDetails.role }</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="cols-user-detail">
                            <div className="cols-fields">
                                <div className="image-label"><img src={ ICONS.STATUS } width="18" height="20" alt="" /></div>
                                <div className="label-content"><span className="form-label">Status</span> <span className="form-label-text">{ userDetails.status }</span></div>
                            </div>
                        </div>
                        <div className="cols-user-detail">
                            <div className="cols-fields">
                                <div className="image-label"><img src={ ICONS.LIST } width="18" height="20" alt="" /></div>
                                <div className="label-content"><span className="form-label">Registered By</span> <span className="form-label-text">{ userDetails.firstName }</span></div>
                            </div>
                        </div>
                        <div className="cols-user-detail">
                            <div className="cols-fields">
                                <div className="image-label"><img src={ ICONS.CALENDAR } width="18" height="20" alt="" /></div>
                                <div className="label-content"><span className="form-label">Registration Date (MM/DD/YYYY)</span> <span className="form-label-text">{ registeredDate }</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="row border-separator">
                        <div className="cols-user-detail">
                            <div className="cols-fields">
                                <div className="image-label"><img src={ ICONS.CALENDAR } width="18" height="20" alt="" /></div>
                                <div className="label-content"><span className="form-label">Last Updated (MM/DD/YYYY)</span> <span className="form-label-text">{ updatedDateTime }</span></div>
                            </div>
                        </div>
                        <div className="cols-user-detail">
                            <div className="cols-fields">
                                <div className="image-label"><img src={ ICONS.CALENDAR } width="18" height="20" alt="" /></div>
                                <div className="label-content"><span className="form-label">Last Log In (MM/DD/YYYY)</span> <span className="form-label-text">{ updatedDateTime }</span></div>
                            </div>
                        </div>
                    </div>
                    <p className="section-row-heading"><img src={ ICONS.ADDRESS } width="20" height="20" alt="" /> ADDRESS</p>
                    <div className="row">
                        <div className="cols-user-detail">
                            <div className="cols-fields">
                                <div className="image-label"><img src={ ICONS.NUMBER } width="18" height="20" alt="" /></div>
                                <div className="label-content"><span className="form-label">Address 1</span> <span className="form-label-text">{ userDetails.houseBuilding }</span></div>
                            </div>
                        </div>
                        <div className="cols-user-detail">
                            <div className="cols-fields">
                                <div className="image-label"><img src={ ICONS.STREET } width="18" height="20" alt="" /></div>
                                <div className="label-content"><span className="form-label">Address 2</span> <span className="form-label-text">{ userDetails.street }</span></div>
                            </div>
                        </div>
                        <div className="cols-user-detail">
                            <div className="cols-fields">
                                <div className="image-label"><img src={ ICONS.ZIP } width="18" height="20" alt="" /></div>
                                <div className="label-content"><span className="form-label">Zip Code</span> <span className="form-label-text">{ userDetails.zipCode }</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="cols-user-detail">
                            <div className="cols-fields">
                                <div className="image-label"><img src={ ICONS.CITY } width="18" height="20" alt="" /></div>
                                <div className="label-content"><span className="form-label">City</span> <span className="form-label-text">{ userDetails.city }</span></div>
                            </div>
                        </div>
                        <div className="cols-user-detail">
                            <div className="cols-fields">
                                <div className="image-label"><img src={ ICONS.COUNTY } width="18" height="20" alt="" /></div>
                                <div className="label-content"><span className="form-label">County</span> <span className="form-label-text">{ userDetails.county }</span></div>
                            </div>
                        </div>
                        <div className="cols-user-detail">
                            <div className="cols-fields">
                                <div className="image-label"><img src={ ICONS.STATE } width="18" height="20" alt="" /></div>
                                <div className="label-content"><span className="form-label">State</span> <span className="form-label-text">{ userDetails.state }</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="row border-separator">
                        <div className="cols-user-detail">
                            <div className="cols-fields">
                                <div className="image-label"><img src={ ICONS.COUNTRY } width="18" height="20" alt="" /></div>
                                <div className="label-content"><span className="form-label">Country</span> <span className="form-label-text">{ userDetails.country }</span></div>
                            </div>
                        </div>
                    </div>
                    <p className="section-row-heading"><img className="image-margin" src={ ICONS.PIN } width="20" height="20" alt="" /> OFFICE & DEPARTMENT</p>
                    <div className="row">
                        <div className="cols-user-detail">
                            <div className="cols-fields">
                                <div className="image-label"><img src={ ICONS.OFFICE } width="18" height="20" alt="" /></div>
                                <div className="label-content"><span className="form-label">Office</span> <span className="form-label-text">{ userDetails.office }</span></div>
                            </div>
                        </div>
                        <div className="cols-user-detail">
                            <div className="cols-fields">
                                <div className="image-label"><img src={ ICONS.DEPARTMENT } width="18" height="20" alt="" /></div>
                                <div className="label-content"><span className="form-label">Department</span> <span className="form-label-text">{ userDetails.department }</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal 
              title="Confirmation" 
              isShowModal={ isShowModal }
              modalBody={ modalBody }   
              closeModal={ this._toggleModal }
              buttons={ buttonMeta }
            />
        </div>
        );
    }
}

export default AdminUserDetailComponent;