import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ICONS } from '../../../constants';



class ViewSupplierComponent extends Component {

    _clickEditHandler = e => {
        const { supplierId } = this.props.supplierData;
        if(supplierId) {
            this.props.editSupplier(e.currentTarget.name, supplierId);
        }
    };

    render() {
        const { supplierData } = this.props;

        const contactDetails = supplierData && supplierData.contacts.map(contact => (
            <div className="contact-div">
            <div className="row">
               { contact.isPrimary ?  <div className="cols">
                    <span className="form-label">Primary Contact</span>
                </div> : null } 
            </div>
            <div className="row">
                <div className="cols">
                    <span className="form-label">Contact Person</span> <span className="form-label-text">{ contact.conactPerson}</span>
                </div>
                <div className="cols">
                    <span className="form-label">Email</span> <span className="form-label-text">{ contact.contactEmail }</span>
                </div>
                <div className="cols">
                    <span className="form-label">Phone</span> <span className="form-label-text"><span className="phone-constant-readonly">+1</span>{ contact.phone }</span>
                </div>
            </div>
            </div>
        ));
        return (
            <div className="container">
                <div className="wrapper-view-supplier">
                    <div className="supplier-general border-separator">
                      <p>Supplier General</p>   
                      <div className="text-align field-padding">
                         <NavLink to="#editprofile" name='EDIT_SUPPLIER' className="img-edit-profile" onClick= { this._clickEditHandler } ><img className="imgIconCurosr" src={ ICONS.EDIT } alt="" /></NavLink>
                      </div>
                      <div className="row">
                        <div className="cols">
                            <span className="form-label">Organization Name</span> <span className="form-label-text">{ supplierData && supplierData.organizationName }</span>
                        </div>
                        <div className="cols">
                            <span className="form-label">Supplier No</span> <span className="form-label-text">{ supplierData && supplierData.supplierNo }</span>
                        </div>
                        <div className="cols">
                            <span className="form-label">Registration No</span> <span className="form-label-text">{ supplierData && supplierData.registrationNo }</span>
                        </div>
                        <div className="cols">
                            <span className="form-label">Taxpayer ID</span> <span className="form-label-text">{ supplierData &&  supplierData.taxPayerId }</span>
                        </div>
                      </div> 
                      
                      <p>Supplier Address</p>  
                      <div className="row">
                        <div className="cols">
                            <span className="form-label">Address 1</span> <span className="form-label-text">{ supplierData && supplierData.houseNo }</span>
                        </div>
                        <div className="cols">
                            <span className="form-label">Address 2</span> <span className="form-label-text">{ supplierData && supplierData.street }</span>
                        </div>
                        <div className="cols">
                            <span className="form-label">Zipcode</span> <span className="form-label-text">{ supplierData && supplierData.zipCode }</span>
                        </div>
                        <div className="cols">
                            <span className="form-label">City</span> <span className="form-label-text">{ supplierData && supplierData.city }</span>
                        </div>
                      </div> 
                      
                      <div className="row">
                        <div className="cols">
                            <span className="form-label">County</span> <span className="form-label-text">{ supplierData && supplierData.county }</span>
                        </div>
                        <div className="cols">
                            <span className="form-label">State</span> <span className="form-label-text">{ supplierData && supplierData.state }</span>
                        </div>
                        <div className="cols">
                            <span className="form-label">Country</span> <span className="form-label-text">{ supplierData && supplierData.country }</span>
                        </div>
                      </div> 

                      <p>Supplier Contact</p> 
                        { contactDetails }
                   
                </div>
                </div>
            </div>
        );
    }
}

export default ViewSupplierComponent;


