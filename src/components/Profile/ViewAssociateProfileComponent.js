import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ICONS } from '../../constants';
import ImageUpload from './ImageUpload';

class ViewAssociateProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showLoading: false
        };
    }

    _clickEditHandler = e => {
        this.props.editProfile(e.currentTarget.name, this.props.registerId);
    }

    componentWillReceiveProps(nextProps) {
        const avatarImage = nextProps && nextProps.userDetails ? nextProps.userDetails && nextProps.userDetails.avatar : null;
        if(avatarImage) {
            this.setState({
                showLoading: false
            });
        }
    }

    handleFileUpload = imageData => {
        if(imageData) {
            this.setState({
                showLoading: true
            });
            this.props.submitImage(imageData);
        }
    }

    render() {
        const { userDetails } = this.props;
        let { showLoading } = this.state;
        const userAvatar = userDetails.avatar && userDetails.avatar ? userDetails.avatar : '';
        const uploadedDocuments = userDetails.registrationDocs && Object.keys(userDetails.registrationDocs).map( key => {
            let file = userDetails.registrationDocs[key];
            if(file && file.documentName) {
                return ( <div className="cols inlineBlock">
                    <p> { userDetails.registrationDocs[key].documentName === 'insurance' ? 'INSURANCE': null }
                        { userDetails.registrationDocs[key].documentName === 'drivingLicense' ? 'DRIVER LICENSE': null }
                        { userDetails.registrationDocs[key].documentName === 'SH4' ? 'FORM W-9': null }
                        { userDetails.registrationDocs[key].documentName === 'SSN' ? 'FEIN / SSN': null }
                    </p>
                    <span className="attachment" /><span className="form-label-text"><NavLink download to={ `${ file.path }` } target="_self">{ file.originalname }</NavLink>
                    </span>
                </div>
             );
            }
        });
        return ( 
            <div>
                <div className="content containerStyle">
                    <div>
                        <div className="row text-alignment field-padding">
                            <NavLink to="#editprofile" name='EDIT_PROFILE' className="imgEditProfile" onClick= { this._clickEditHandler } ><img className="imgIconCurosr" src={ ICONS.EDIT } alt="" /></NavLink>
                        </div>
                        <div className="row border-separator">
                            <div className="cols profileColumStyle">
                                <img src={ (userAvatar !== '' && userAvatar  || ICONS.USERPROFILE) } width="156" height="156" alt="" />
                                { showLoading && <img className="profile-loading" src={ ICONS.LOADING } width="135" height="135" alt="" /> }
                                <div className="image-upload">
                                    <ImageUpload imageUpload={ this.handleFileUpload } />
                                </div>
                            </div>
                            <div className="cols fieldColumnStyle">
                                <span className="profileName"> { userDetails.firstName } { userDetails.lastName } <br /><span className="text-user-type"> { userDetails.userType } </span></span> <br />
                                <span className="form-label">Email</span> <span className="form-label-text user-info-details">{ userDetails.email }<span className="verified">Verified</span></span>
                            </div>
                            <div className="cols fieldColumnStyle">
                                <span className="form-label user-contactinfo">Mobile</span> <span className="form-label-text user-info-details"><span className="phone-constant-readonly">+1</span>{ userDetails.phone }</span>
                            </div>
                        </div> 

                        <div className="row">
                            <div className="heading-viewProfile">
                                <p>Company Details</p>
                            </div>
                        </div>
                        <div className="row border-separator">
                            <div className="cols">
                                <span className="form-label">Company Name</span> <span className="form-label-text">{ userDetails.companyName }</span>
                            </div>
                            <div className="cols">
                                <span className="form-label">Company EIN / SSN</span> <span className="form-label-text">{ userDetails.companyEin }</span>
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
                        <div className="row row-padding">
                            <div className="cols">
                                <span className="form-label">Address 1</span> <span className="form-label-text">{ userDetails.houseBuilding }</span>
                            </div>
                            <div className="cols">
                                <span className="form-label">Address 2</span> <span className="form-label-text">{ userDetails.street }</span>
                            </div>
                            <div className="cols">
                                <span className="form-label">Zip code</span> <span className="form-label-text">{ userDetails.zipCode }</span>
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
                        { userDetails.contactPersons && userDetails.contactPersons.length > 0 && 
                        <div className="row">
                            <div className="heading-viewProfile">
                                <p>Contact Person</p>
                            </div>
                            <div className="border-separator">
                                {
                                    userDetails.contactPersons && userDetails.contactPersons.map(item => (
                                        <div>
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
                                    ))
                                }
                            </div>
                        </div>
                        }
                        { uploadedDocuments && 
                        <div className="row">
                            <div className="heading-viewProfile">
                                <p>Documents</p>
                            </div>
                            <div className="border-separator">
                                <div>
                                    { uploadedDocuments }
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewAssociateProfileComponent;
