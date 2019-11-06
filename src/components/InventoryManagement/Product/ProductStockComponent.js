import React, { Fragment} from 'react';
import { DropdownBox } from '../../common';
import FloatingLabel from 'floating-label-react';


const ProductStockComponent = props => {
    const { quantity, threshold, quantityInBox, warehouseList, quantityTypeList, stockAvailabilityList, sku, onFieldChangeNumeric, onFieldChangeAlphaNumeric,
      onChangeSelectQuantityType, onChangeSelectStockAvailability, onChangeSelectWarehouse, quantityType, warehouse, stockAvailability, onFieldBlur, 
      errorQuantity, errorThreshold, errorQunatityBox, showQuantityTypeLabel, showWarehouseLabel, showAvailabilityLabel } = props;
    return (
        <Fragment>
            <p className="title">Stock</p>

            <div className="row">
              <span className="wrapper">
                <FloatingLabel 
                  className="form-input" 
                  placeholder="Quantity*" 
                  type="text" 
                  name="quantity"
                  value={ quantity }
                  maxLength="10"
                  onChange={ onFieldChangeNumeric }
                  onBlur={ onFieldBlur }
                  autoComplete="none"
                />
                 <div className="error">{ errorQuantity }</div>
              </span>
              <span className="wrapper">
                <FloatingLabel 
                  className="form-input" 
                  placeholder="Only X left Threshold (Minimum Required Qty)" 
                  type="text" 
                  name="threshold"
                  value={ threshold }
                  maxLength="10"
                  onChange={ onFieldChangeNumeric }
                  onBlur={ onFieldBlur }
                  autoComplete="none"
                />
                <div className="error">{ errorThreshold }</div>
              </span>
              <div className="inline-div">
                {
                   showQuantityTypeLabel ? <label for="label" className="float-label">Quantity Type</label> : ''
                }
                <DropdownBox 
                  placeholder="Quantity Type"
                  options={ quantityTypeList ? quantityTypeList.fieldValues : [] }
                  onChangeSelect= { onChangeSelectQuantityType }
                  selectedValue={ quantityType }
                />
              </div>
            </div>

            <div className="row">
              <span className="wrapper">
                <FloatingLabel 
                  className="form-input" 
                  placeholder="Quantity in Box" 
                  type="text" 
                  name="quantityInBox"
                  value={ quantityInBox }
                  maxLength="10"
                  onChange={ onFieldChangeNumeric }
                  readOnly={ quantityType === 'Each' }
                  autoComplete="none"
                />
                <div className="error">{ errorQunatityBox }</div>
              </span>
              <div className="inline-div">
                {
                  showWarehouseLabel ? <label for="label" className="float-label">Warehouse</label> : ''
                }
                <DropdownBox 
                  placeholder="Select Warehouse"
                  options= { warehouseList ? warehouseList : [] }
                  onChangeSelect= { onChangeSelectWarehouse }
                  selectedValue={ warehouse }
                />
              </div>
              <div className="inline-div">
                {
                  showAvailabilityLabel ? <label for="label" className="float-label">Stock Availability</label> : ''
                } 
                <DropdownBox 
                  placeholder="Stock Availability"
                  options= { stockAvailabilityList ? stockAvailabilityList.fieldValues : [] }
                  onChangeSelect= { onChangeSelectStockAvailability }
                  selectedValue={ stockAvailability }
                />
              </div>
            </div>
            <div className="row">
              <span className="wrapper">
                <FloatingLabel 
                  className="form-input" 
                  placeholder="SKU" 
                  type="text" 
                  name="sku"
                  value={ sku }
                  maxLength="10"
                  onChange={ onFieldChangeAlphaNumeric }
                  autoComplete="none"
                />
              </span>
            </div>
        </Fragment>
    );
};

export default ProductStockComponent;

