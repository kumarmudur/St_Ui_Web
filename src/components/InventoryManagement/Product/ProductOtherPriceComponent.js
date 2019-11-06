import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { ICONS } from '../../../constants';
import { Input,  DropdownBox, Button } from '../../common';


const ProductOtherPriceComponent = props => {
    const { grandTotalOtherPrice, addOtherPrices, otherPrices, onChangeSelectSubCategory, onChangeSelectUnit,
      onDeleteProductOtherPrice, onChangeSelect, configurationsList, onFieldTextChangeOtherPrice } = props;
    
    const categoryList = configurationsList && configurationsList.map(category => {
      return {
        label: category.category,
        value: `${category.category}-${category.configurationId}`
      };
    });
    
    return (
        <Fragment>
            <p className="title">Other Price</p>
            <div className='btn-footer-group'>
                <Button name='Add Category' type='button' className='btn-footer-cancel' onClick={ addOtherPrices } />
            </div>
            <div className="product-grid">
                 <div className="table-heading">
                    <div className="grid-row">
                        <div className="header">Category</div>
                        <div className="header">Sub Category</div>
                        <div className="header">Unit</div>
                        <div className="header">Quantity</div>
                        <div className="header">Unit Cost $</div>
                        <div className="header">Margin %</div>
                        <div className="header">Total Cost</div>
                        <div className="header">Actions</div>
                    </div>
                  </div>
                  <div className="grid-body">
                      {
                        otherPrices && otherPrices.map((price, index) => (
                          <Fragment>
                            <div className="grid-row">
                                <div className="grid-cell other-price-cell">
                                    <div className="inline-div">
                                       <DropdownBox 
                                         placeholder="Select"
                                         name={ `category-${ index }` }
                                         options={ categoryList ? categoryList: [] }
                                         onChangeSelect= { value => onChangeSelect(value, `category-${ index }`) } // eslint-disable-line
                                         selectedValue={ price.category }
                                       />
                                      </div>
                                  </div>
                                  <div className="grid-cell other-price-cell">
                                      <div className="inline-div">
                                        <DropdownBox 
                                          placeholder="Select"
                                          name={ `subCategory-${ index }` }
                                          options={ price.subCategoryList ? price.subCategoryList : [] }
                                          onChangeSelect= { value => onChangeSelectSubCategory(value, `subCategory-${ index }`) } // eslint-disable-line
                                          selectedValue={ price.subCategory }
                                        />
                                      </div>
                                    </div>
                                    <div className="grid-cell other-price-cell">
                                      <div className="inline-div">
                                        <DropdownBox 
                                          placeholder="Select"
                                          name={ `unit-${ index }` }
                                          options={ price.unitList ? price.unitList : [] }
                                          onChangeSelect= { value => onChangeSelectUnit(value, `unit-${ index }`) } // eslint-disable-line
                                          selectedValue={ price.unit }
                                        />
                                      </div>
                                    </div>
                                    <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        placeholder="Quantity"
                                        name={ `quantity-${ index }` }
                                        value={ price.quantity } 
                                        maxLength={ 10 }  
                                        textChange={ onFieldTextChangeOtherPrice }
                                        readOnly={ price.unit ? false : true }
                                      />
                                    </div>
                                    <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        placeholder="Cost"
                                        name={ `cost-${ index }` }
                                        value={ price.cost ? `$${price.cost}` : price.cost } 
                                        readOnly={ true }
                                      />
                                    </div>
                                    <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        placeholder="Margin"
                                        name={ `margin-${ index }` }
                                        value={ price.margin }
                                        maxLength={ 5 }  
                                        textChange={ onFieldTextChangeOtherPrice }
                                        readOnly={ price.unit ? false : true }
                                      />
                                    </div>
                                    <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        placeholder="Total Cost"
                                        name={ `totalCost-${ index }` }
                                        value={ price.totalCost ? `$${price.totalCost}` : price.totalCost } 
                                        readOnly={ true }
                                      />
                                    </div>
                                    <div className="grid-cell grid-delete-cell">
                                     <span>
                                       <NavLink to="#delete_product_other_price"><img id={ index } name={ price.totalCost } className="imgIconCurosr" src={ ICONS.DELETE } alt="delete" onClick={ onDeleteProductOtherPrice }/></NavLink>
                                     </span>
                                   </div>
                            </div>
                           
                           </Fragment>
                        ))
                      }
                  </div>
                  <div className="table-heading grand-total-assembly">
                        <div className="grid-row">
                            <div className="header">Grand Total</div>
                            <div className="header no-border"></div>
                            <div className="header no-border"></div>
                            <div className="header no-border"></div>
                            <div className="header no-border"></div>
                            <div className="header no-border"></div>
                            <div className="header no-border">{ grandTotalOtherPrice ? `$${grandTotalOtherPrice}` : grandTotalOtherPrice }</div>
                            <div className="header no-border"></div>
                        </div>
                    </div>
            </div>
        </Fragment>
    );
};

export default ProductOtherPriceComponent;
