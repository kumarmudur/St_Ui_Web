import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Input,  DropdownBox, Button} from '../../common';
import { ICONS } from '../../../constants';

const ProductPartsComponent = props => {
    const { productParts, productPartsList, onFieldChange, onChangeSelectParts, onDeleteProductPart, addProductParts,
      grandTotalPartsResidential, grandTotalPartsCommercial, grandTotalPartsNonProfit, grandTotalPartsIndustrial } = props;
    const partsList = productPartsList && productPartsList.map(parts => {
      return {
        label: parts.productName,
        value: `${parts.productName}-${parts.productId}`
      };
    });
    return (
        <Fragment>
            <p className="title">Parts</p>
            <div className='btn-footer-group'>
                <Button name='Add Parts' type='button' className='btn-footer-cancel' onClick={ addProductParts } />
            </div>
            <div className="product-grid">
                <div className="table-heading">
                    <div className="grid-row">
                        <div className="header">Item</div>
                        <div className="header">Watt</div>
                        <div className="header">Quantity</div>
                        <div className="header">Residential</div>
                        <div className="header">Commercial</div>
                        <div className="header">Non Profit</div>
                        <div className="header">Industrial</div>
                        <div className="header">Actions</div>
                    </div>
                </div>
                <div className="grid-body">
                    {
                        productParts && productParts.map((parts, index) => (
                            <div className="grid-row">
                                <div className="grid-cell warehouse-cell">
                                    <div className="inline-div">
                                    <DropdownBox 
                                      placeholder="Select Parts"
                                      name={ `partName-${ index }` }
                                      options={ partsList ? partsList : [] }
                                      onChangeSelect= { value => onChangeSelectParts(value, `partName-${ index }`) } // eslint-disable-line
                                      selectedValue={ parts.partName }
                                    />
                                    </div>
                                </div>
                                <div className="grid-cell">
                                    <Input 
                                      className="form-input" 
                                      type="text" 
                                      name={ `power-${ index }` }
                                      value={ parts.power } 
                                      readOnly={ true }
                                    />
                                </div>
                                <div className="grid-cell">
                                    <Input 
                                      className="form-input" 
                                      placeholder="Quantity"
                                      type="text" 
                                      name={ `quantity-${ index }` }
                                      value={ parts.quantity } 
                                      maxLength={ 25 }  
                                      textChange={ onFieldChange }
                                    />
                                </div>
                                <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        name={ `residential-${ index }` }
                                        value={ parts.residential } 
                                        readOnly={ true }
                                      />
                                    </div>
                                    <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        name={ `commercial-${ index }` }
                                        value={ parts.commercial } 
                                        readOnly={ true }
                                      />
                                    </div>
                                    <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        name={ `nonProfit-${ index }` }
                                        value={ parts.nonProfit } 
                                        readOnly={ true }
                                      />
                                    </div>
                                    <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        name={ `industrial-${ index }` }
                                        value={ parts.industrial } 
                                        readOnly={ true }
                                      />
                                    </div>
                                    <div className="grid-cell grid-delete-cell">
                                      <span>
                                        <NavLink to="#delete_product_specification"><img id={ index } className="imgIconCurosr" src={ ICONS.DELETE } alt="delete" onClick={ onDeleteProductPart }/></NavLink>
                                      </span>
                                   </div>
                            </div>
                        ))
                    }
                </div>
                <div className="table-heading grand-total-assembly">
                    <div className="grid-row">
                        <div className="header">Grand Total</div>
                        <div className="header no-border"></div>
                        <div className="header no-border"></div>
                        <div className="header">{ grandTotalPartsResidential }</div>
                        <div className="header">{ grandTotalPartsCommercial }</div>
                        <div className="header">{ grandTotalPartsNonProfit }</div>
                        <div className="header">{ grandTotalPartsIndustrial }</div>
                        <div className="header"></div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductPartsComponent;