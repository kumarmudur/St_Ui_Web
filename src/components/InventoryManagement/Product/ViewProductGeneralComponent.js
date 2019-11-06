import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ICONS } from '../../../constants';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

class ViewProductGeneralComponent extends Component {

    _clickEditHandler = e => {
        const { productId } = this.props.productData;
        if(productId) {
            this.props.editProduct(e.currentTarget.name, productId);
        }
    };


    render() {
        const { productData } = this.props;
        const carouselImages = productData &&  productData.uploadImages && productData.uploadImages.map(image => {
            return <div>
                <img src={ image.filePath } />
            </div>;
        });
        return (
            <div className="container">
                <div className="wrapper-view-product">
                    <div className="wrapper-general border-separator">
                        <div className="text-align field-padding">
                            <NavLink to="#editproduct" name='EDIT_PRODUCT' className="img-edit-product" onClick= { this._clickEditHandler } ><img className="imgedit" src={ ICONS.EDIT } alt="edit" /></NavLink>
                        </div>
                        <div className="row">
                            <div className="cols image-cols">
                            <Carousel autoPlay>
                                {
                                    carouselImages
                                }
                            </Carousel>
                            </div>
                            <div className="cols">
                                <div className="row">
                                    <span className="form-label">Product Name</span><br /> <span className="form-label-text">{ productData && productData.productName }</span>
                                </div>
                                <div className="row">
                                    <span className="form-label">Manufacturer</span><br /> <span className="form-label-text">{ productData && productData.manufacturer }</span>
                                </div>
                                <div className="row">
                                    <span className="form-label">Quantity Type</span><br /> <span className="form-label-text">{ productData && productData.quantityType }</span>
                                </div>
                                <div className="row">
                                    <span className="form-label">Quantity in Box</span><br /> <span className="form-label-text">{ productData && productData.quantityInBox }</span>
                                </div>
                                <div className="row">
                                    <span className="form-label">Promotion</span><br /> <span className="form-label-text">{ productData && productData.promotion }</span>
                                </div>
                            </div>
                            <div className="cols">
                            <div className="row">
                                    <span className="form-label">Description</span><br /> <span className="form-label-text">{ productData && productData.description }</span>
                                </div>
                                <div className="row">
                                    <span className="form-label">Model Number</span><br /> <span className="form-label-text">{ productData && productData.modelNumber }</span>
                                </div>
                                <div className="row">
                                    <span className="form-label">Minimum Required Quantity</span><br /> <span className="form-label-text">{ productData && productData.threshold }</span>
                                </div>
                                <div className="row">
                                    <span className="form-label">Preferred Supplier</span><br /> <span className="form-label-text">{ productData && productData.quantity }</span>
                                </div>
                                <div className="row">
                                    <span className="form-label">Status</span><br /> <span className="form-label-text">{ productData && productData.status }</span>
                                </div>
                            </div>
                            <div className="cols">
                               <div className="row">
                                    <span className="form-label">Category</span><br /> <span className="form-label-text">{ productData && productData.category }</span>
                                </div>
                                <div className="row">
                                    <span className="form-label">Quantity</span><br /> <span className="form-label-text">{ productData && productData.quantity }</span>
                                </div>
                                <div className="row">
                                    <span className="form-label">Stock Availability</span><br /> <span className="form-label-text">{ productData && productData.stockAvailability }</span>
                                </div>
                                <div className="row">
                                    <span className="form-label">Product has warranty</span><br /> <span className="form-label-text">{ productData && productData.productHasWarranty }</span>
                                </div> 
                            </div>
                        </div>
                    </div>

                    <div className="wrapper-specification border-separator">
                        <p>Product Specification</p>
                        <div className="product-grid">
                          {
                            productData && productData.specifications && productData.specifications.length > 0 ? <div className="table-heading">
                            <div className="grid-row">
                                <div className="header">Measurement Variable</div>
                                <div className="header">Measurement Type</div>
                                <div className="header">Measurement Value </div>
                            </div>
                           </div> : ''
                          }
                         
                          <div className="grid-body">
                              {
                                productData && productData.specifications && productData.specifications.map(spec => (
                                    <div className="grid-row">
                                        <div className="grid-cell">
                                            <span className="form-label-text">{ spec.measurementVariable }</span>
                                        </div>
                                        <div className="grid-cell">
                                            <span className="form-label-text">{ spec.measurementType }</span>
                                        </div>
                                        <div className="grid-cell">
                                            <span className="form-label-text">{ spec.measurementValue }</span>
                                        </div>
                                    </div>
                                ))
                              }
                          </div>
                        </div>
                    </div>

                    <div className="wrapper-price border-separator">
                        <p>Product Cost</p>
                        <div className="row">
                            <div className="cols product-cost">
                                <div className="row">
                                    <span className="form-label">Product Cost</span><br />
                                    <span className="form-label-text">{ productData && productData.productCost ? `$ ${productData.productCost }` : '' }</span>
                                </div>
                            </div>
                        </div>

                        <div className="selling-price">
                            <span className="product-cost">Selling Price</span>
                            <div className="row">
                                <div className="cols">
                                    <div className="row">
                                        <span className="form-label">Residential</span><br /> <span className="form-label-text">{ productData && productData.residential ? `$ ${productData.residential}` : '' }</span>
                                    </div>
                                </div>
                                <div className="cols">
                                    <div className="row">
                                        <span className="form-label">Commercial</span><br /> <span className="form-label-text">{ productData && productData.commercial ? `$ ${productData.commercial}` : '' }</span>
                                    </div>
                                </div>
                                <div className="cols">
                                    <div className="row">
                                        <span className="form-label">Non Profit</span><br /> <span className="form-label-text">{ productData && productData.nonProfit ? `$ ${productData.nonProfit}` : '' }</span>
                                    </div>
                                </div>
                                <div className="cols">
                                    <div className="row">
                                        <span className="form-label">Industrial</span><br /> <span className="form-label-text">{ productData && productData.industrial ? `$ ${productData.industrial}` : '' }</span>
                                    </div>
                                </div>
                           </div>
                        </div>

                        <div className="selling-price">
                            <span className="product-cost">Other Price</span>
                            <div className="row">
                                <div className="cols">
                                    <div className="row">
                                        <span className="form-label">Total Cost</span><br /> <span className="form-label-text">{ productData && productData.grandTotalOtherPrice ? `$ ${productData.grandTotalOtherPrice}` : '' }</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewProductGeneralComponent;
