import React, { Fragment } from 'react';
import { DropdownBox } from '../../common';
import FloatingLabel from 'floating-label-react';

const ProductPriceComponent = props => {
    const { productCost, residential, commercial, nonProfit, industrial, sellingPrice, priceTypeList, 
      onFieldChange, onChangeSelectPriceType, errorProductCost, errorResidential, errorCommercial,
    errorNonProfit, errorIndustrial } = props;
    return (
        <Fragment>
            <p className="title">Product Cost</p>
              <div className="row">
                <span className="wrapper">
                    <FloatingLabel 
                      className="form-input" 
                      placeholder="Product Cost ($)*" 
                      type="text" 
                      name="productCost"
                      value={ productCost }
                      maxLength="10"
                      onChange={ onFieldChange }
                      autoComplete="none"
                    />
                    <div className="error">{ errorProductCost }</div>
                </span>
              </div>
              <div className="selling-price">
              <div className="row price-row">
              <span className="wrapper">
                  <p className="selling-price-label">Selling Price</p>
                  <div className="inline-div">
                        <DropdownBox 
                          placeholder="$"
                          options={ priceTypeList ? priceTypeList.fieldValues : [] }
                          onChangeSelect= { onChangeSelectPriceType }
                          selectedValue={ sellingPrice }
                        />
                  </div>
                </span>
              </div>
               
                <div className="row">
                  <span className="wrapper">
                    <FloatingLabel 
                      className="form-input" 
                      placeholder="Residential*" 
                      type="text" 
                      name="residential"
                      value={ residential }
                      maxLength="10"
                      onChange={ onFieldChange }
                      autoComplete="none"
                    />
                    <div className="error">{ errorResidential }</div>
                  </span>
                  <span className="wrapper">
                    <FloatingLabel 
                      className="form-input" 
                      placeholder="Commercial*" 
                      type="text" 
                      name="commercial"
                      value={ commercial }
                      maxLength="10"
                      onChange={ onFieldChange }
                      autoComplete="none"
                    />
                    <div className="error">{ errorCommercial }</div>
                  </span>
                  <span className="wrapper">
                    <FloatingLabel 
                      className="form-input" 
                      placeholder="Non Profit*" 
                      type="text" 
                      name="nonProfit"
                      value={ nonProfit }
                      maxLength="10"
                      onChange={ onFieldChange }
                      autoComplete="none"
                    />
                    <div className="error">{ errorNonProfit }</div>
                  </span>
                </div>
                <div className="row">
                  <span className="wrapper">
                    <FloatingLabel 
                      className="form-input" 
                      placeholder="Industrial*" 
                      type="text" 
                      name="industrial"
                      value={ industrial }
                      maxLength="10"
                      onChange={ onFieldChange }
                      autoComplete="none"
                    />
                    <div className="error">{ errorIndustrial }</div>
                  </span>
                </div>
              </div>
        </Fragment>
    );
};

export default ProductPriceComponent;
