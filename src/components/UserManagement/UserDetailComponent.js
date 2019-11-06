import React, { Component } from 'react';
import '../../styles/users.scss';
import { ICONS } from '../../constants';
import { getDateTime } from '../../utils/extractDateTime';

class UserDetailComponent extends Component {
    constructor(props) {
        super(props);
    }

    _navigateTo = () => {
        this.props.navigateTo('VIEW_USERS');
    }

    render() {
        const userDetails = this.props && this.props.userDetails ? this.props.userDetails : null;
        let updatedDateTime = '';
        let registeredDate = '';
        
        if(userDetails && userDetails.updatedDateTime) {
            updatedDateTime = getDateTime('date', userDetails.updatedDateTime);
        }
        if(userDetails && userDetails.createdDateTime) {
            registeredDate = getDateTime('date', userDetails.createdDateTime);
        }
        return ( 
         <div>
            <div className="content">
                <div className="row margin-bottom">
                    <div className="row-heading border-separator tab-user-detail">
                        <div className="heading-user-details">
                            <p>User Details</p>
                        </div>
                        {/* <div class="heading-accounts">
                            <p>Accounts</p>
                        </div> */}
                        {/* <div className="back-button">
                            <a href="#" onClick={ this._navigateTo }>Back </a>
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
        </div>
        );
    }
}

export default UserDetailComponent;