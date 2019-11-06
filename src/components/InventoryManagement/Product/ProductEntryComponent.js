import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { ICONS } from '../../../constants';
import { Input,  DropdownBox, Checkbox, Button } from '../../common';

const ProductEntryComponent = props => {
    const { warehouseList, uomTypeList , productEntries, addProductEntry, onFieldChange, onFieldChangeNumeric, onFieldChangeAlphaNumeric,
      onChangeSelectProductEntry, onDeleteProductEntry } = props;
    return (
        <Fragment>
           <p className="title">Product Entry</p>
            <div className="row">
                <label className="checkbox-label-entry">
                    <Checkbox name="dimension" type="checkbox" className="select-checkbox" />
                </label>
                <span className="span-serial-number">Product has serial number</span>
            </div>
            <div className='btn-footer-group'>
                {/* <Button name='Download Template' type='button' className='btn-download' />
                <Button name='Import' type='button' className='btn-footer-cancel' /> */}
                <Button name='Add Item' type='button' className='btn-footer-cancel' onClick={ addProductEntry }/>
            </div>
            <div className="product-grid">
                <div className="table-heading">
                    <div className="grid-row">
                        <div className="header">Serial Number</div>
                        <div className="header">Warehouse</div>
                        <div className="header">Shelf #</div>
                        <div className="header">Bin #</div>
                        <div className="header">UOM</div>
                        <div className="header">Qty</div>
                        <div className="header">Actions</div>
                    </div>
                </div>
                <div className="grid-body">
                        {
                            productEntries && productEntries.map((entry, index) => (
                                <div className="grid-row">
                                    <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        placeholder="Serial Number"
                                        type="text" 
                                        name={ `serialNumber-${ index }` }
                                        value={ entry.serialNumber } 
                                        maxLength="20"  
                                        textChange={ onFieldChange }
                                      />
                                    </div>
                                    <div className="grid-cell warehouse-cell">
                                      <div className="inline-div">
                                        <DropdownBox 
                                          placeholder="Select"
                                          name={ `warehouse-${ index }` }
                                          options={ warehouseList ? warehouseList : [] }
                                          onChangeSelect= { value => onChangeSelectProductEntry(value, `warehouse-${ index }`) } // eslint-disable-line
                                          selectedValue={ entry.warehouse }
                                          disabled={ entry.serialNumber ? false : true  }
                                        />
                                      </div>
                                    </div>
                                    <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        placeholder="Shelf no"
                                        name={ `shelf-${ index }` }
                                        value={ entry.shelf } 
                                        maxLength="10" 
                                        textChange={ onFieldChangeAlphaNumeric }
                                        readOnly={ entry.warehouse ? false : true }
                                      />
                                    </div>
                                    <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        placeholder="Bin no"
                                        type="text" 
                                        name={ `bin-${ index }` }
                                        value={ entry.bin } 
                                        maxLength="10" 
                                        textChange={ onFieldChangeAlphaNumeric }
                                        readOnly={ entry.warehouse ? false : true }
                                      />
                                    </div>
                                    <div className="grid-cell">
                                      <div className="inline-div">
                                        <DropdownBox 
                                          placeholder="Select"
                                          name={ `uom-${ index }` }
                                          options={ uomTypeList ? uomTypeList.fieldValues : [] }
                                          onChangeSelect= { value => onChangeSelectProductEntry(value, `uom-${ index }`) } // eslint-disable-line
                                          selectedValue={ entry.uom }
                                        />
                                      </div>
                                    </div>
                                    <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        placeholder="Qty"
                                        type="text" 
                                        name={ `qty-${ index }` }
                                        value={ entry.qty } 
                                        maxLength="10" 
                                        textChange={ onFieldChangeNumeric }
                                        readOnly={ entry.uom && entry.uom === 'Box' ? false : true }
                                      />
                                    </div>
                                   <div className="grid-cell grid-delete-cell">
                                     <span>
                                       <NavLink to="#delete_product_entry"><img id={ index } className="imgIconCurosr" src={ ICONS.DELETE } alt="delete" onClick={ onDeleteProductEntry }/></NavLink>
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

export default ProductEntryComponent;
