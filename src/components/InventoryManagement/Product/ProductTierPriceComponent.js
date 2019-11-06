import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { ICONS } from '../../../constants';
import { Input,  DropdownBox, Button } from '../../common';

const ProductTierPriceComponent = props => {
    const { tierPrices, addCustomerGroup, onFieldChange, onDeleteProductTierPrice } = props;
    return (
        <Fragment>
            <p className="title">Tier Price</p>
            <div className='btn-footer-group'>
                <Button name='Add Customer Group' type='button' className='btn-download' onClick={ addCustomerGroup } />
            </div>
            <div className="product-grid">
                <div className="table-heading">
                    <div className="grid-row">
                        <div className="header">Customer Group</div>
                        <div className="header">Sales Group</div>
                        <div className="header">Qunatity(Nos)</div>
                        <div className="header">Price $</div>
                        <div className="header">Actions</div>
                    </div>
                </div>
                <div className="grid-body">
                    {
                        tierPrices && tierPrices.map((price, index) => (
                            <div className="grid-row">
                                <div className="grid-cell other-price-cell">
                                    <div className="inline-div">
                                       <DropdownBox 
                                         placeholder="Select"
                                         name={ `customerGroup-${ index }` }
                                        // options={ warehouseList ? warehouseList : [] }
                                         //onChangeSelect= { value => onChangeSelectProductEntry(value, `customerGroup-${ index }`) }
                                         //selectedValue={ price.customerGroup }
                                       />
                                      </div>
                                  </div>
                                  <div className="grid-cell other-price-cell">
                                    <div className="inline-div">
                                       <DropdownBox 
                                         placeholder="Select"
                                         name={ `salesGroup-${ index }` }
                                        // options={ warehouseList ? warehouseList : [] }
                                         //onChangeSelect= { value => onChangeSelectProductEntry(value, `salesGroup-${ index }`) }
                                         //selectedValue={ price.salesGroup }
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
                                        textChange={ onFieldChange }
                                      />
                                    </div>
                                    <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        placeholder="Price"
                                        name={ `price-${ index }` }
                                        value={ price.price } 
                                        maxLength={ 10 }  
                                        textChange={ onFieldChange }
                                      />
                                    </div>
                                    <div className="grid-cell">
                                     <span>
                                       <NavLink to="#delete_product_tier_price"><img id={ index } className="imgIconCurosr" src={ ICONS.DELETE } alt="delete" onClick={ onDeleteProductTierPrice }/></NavLink>
                                     </span>
                                   </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default ProductTierPriceComponent;

