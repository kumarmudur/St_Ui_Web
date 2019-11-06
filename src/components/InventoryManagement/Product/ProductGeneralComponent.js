import React, { Fragment } from 'react';
import { DropdownBox, Checkbox, Calendar } from '../../common';
import ProductImageUpload from './ProductImageUpload';
import FloatingLabel from 'floating-label-react';
import { getDateTime } from '../../../utils/extractDateTime';


const ProductGeneralComponent = props => {
    const { productName, categoryList, category, manufacturerList, promotionList, manufacturer, modelNumber, promotion, warrantyType, warrantyYear, power,
      description, manufactureDate, isShowWarranty, warrantyTypeList, warrantyYearList, errorProductName, errorCategory, warrantyExpiry,
        errorManufacturer, errorModelNumber, onFieldChange, onChangeSelectCategory, onChangeSelectManufacurer, errorPower,
        onChangeSelectPromotion, handleChangeWarrent, onChangeSelectWarrantyType, onChangeSelectWarrantyYear, 
        fileChange, uploadImages, onDeleteProductImage, assemblyWatt, isAssembly, onDateChange, onFieldChangeNumeric, 
        showCategoryLabel, showManufacturerLabel, showPromotionLabel, showWarrantyLabel, showSelectYearLabel, showDateLabel } = props;
        const formattedManufactureDate = manufactureDate && getDateTime('date', manufactureDate);
        const formattedWarrantyExpiry = warrantyExpiry && getDateTime('date', warrantyExpiry);
        
        return (
        <Fragment>
            <div className="title">Product General</div>
              <div className="row">
                <span className="wrapper">
                  <FloatingLabel  
                    className="form-input" 
                    placeholder="Product Name*" 
                    type="text" 
                    name="productName"
                    value={ productName }
                    maxLength="50"
                    onChange={ onFieldChange }
                    autoComplete="none"
                  />
                 <div className="error">{ errorProductName }</div>
                </span>
               <div className="inline-div">
                  {
                    showCategoryLabel ? <label for="label" className="float-label">Category*</label> : ''
                  }
                  <DropdownBox 
                    placeholder="Category*"
                    name="category"
                    options = { categoryList ? categoryList.fieldValues : [] }
                    onChangeSelect= { onChangeSelectCategory }
                    selectedValue={ category }
                  />
                 <div className="error">{ errorCategory }</div>
               </div>
               {
                 isAssembly ? <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="Assembly Watt" 
                    type="text" 
                    name="assemblyWatt"
                    value={ assemblyWatt }
                    onChange={ onFieldChange }
                  />
                </span> : <div className="inline-div">
                  {
                    showManufacturerLabel ? <label for="label" className="float-label">Manufacturer*</label> : ''
                  }
                  <DropdownBox 
                    placeholder="Manufacturer*"
                    options= { manufacturerList ? manufacturerList.fieldValues : [] }
                    onChangeSelect= { onChangeSelectManufacurer }
                    selectedValue={ manufacturer }
                  />
                 <div className="error">{ errorManufacturer }</div>
                 </div>
               } 
              </div>

              {
                !isAssembly ? <div className="row">
                <span className="wrapper">
                  <FloatingLabel
                    className="form-input" 
                    placeholder="Model Number*" 
                    type="text" 
                    name="modelNumber"
                    value={ modelNumber }
                    maxLength="50"
                    onChange={ onFieldChange }
                    autoComplete="none"
                  />
                  <div className="error">{ errorModelNumber }</div>
                </span>
                <span className="wrapper">
                  {
                    showDateLabel ? <label for="label" className="float-label">Manufacture Date (MM/DD/YYYY)</label> : ''
                  }
                  <Calendar
                    onDateChange={ onDateChange }
                    name="manufactureDate"
                    date={ formattedManufactureDate }
                    placeholder="Manufacture Date (MM/DD/YYYY)"
                  />
                </span>
                <div className="inline-div">
                  {
                    showPromotionLabel ? <label for="label" className="float-label">Promotion</label> : ''
                  }
                  <DropdownBox 
                    placeholder="Promotion"
                    options={ promotionList ? promotionList.fieldValues : [] }
                    onChangeSelect= { onChangeSelectPromotion }
                    selectedValue={ promotion }
                  />
                </div>
              </div> : ''
            }
        
              <div className="row">
               {
                !isAssembly ? <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="Power(Watt)*" 
                    type="textbox" 
                    name="power"
                    maxLength="5"
                    value={ power }
                    onChange={ onFieldChangeNumeric }
                    autoComplete="none"
                  />
                  <div className="error">{ errorPower }</div>
                </span> : ''
               }
               
               <span className="wrapper">
                <FloatingLabel 
                  className="form-input" 
                  placeholder="Description" 
                  type="textbox" 
                  name="description"
                  maxLength="250"
                  value={ description }
                  onChange={ onFieldChange }
                  autoComplete="none"
                />
               </span>
              
              </div>
              
              <ProductImageUpload 
                fileChange={ fileChange }
                uploadImages={ uploadImages }
                onDeleteProductImage={ onDeleteProductImage }
              />

              {
                !isAssembly ?  <div className="row warrant">
                    <label className="checkbox-label">
                        <Checkbox name="checked" type="checkbox" checked={ isShowWarranty } className="warrant-checkbox" onChange={ handleChangeWarrent } />
                    </label>
                    <span>Product has warranty</span>  
                </div> : ''
              }             
              {
                isShowWarranty ? <div className="row">
                  <div className="inline-div">
                      {
                        showWarrantyLabel ? <label for="label" className="float-label">Warranty Type</label> : ''
                      }
                      <DropdownBox 
                        placeholder="Select Warranty"
                        options={ warrantyTypeList ? warrantyTypeList.fieldValues : [] }
                        onChangeSelect= { onChangeSelectWarrantyType }
                        selectedValue={ warrantyType }
                      />
                  </div>
                  <div className="inline-div">
                      {
                        showSelectYearLabel ? <label for="label" className="float-label">Warranty Period (Year)</label> : ''
                      }
                      <DropdownBox 
                        placeholder="Select Year"
                        options={ warrantyYearList ? warrantyYearList.fieldValues : [] }
                        onChangeSelect= { onChangeSelectWarrantyYear }
                        selectedValue={ warrantyYear }
                      />
                  </div>
                  <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="Warranty Expires on (MM/DD/YYYY)" 
                    type="text" 
                    name="warrantyExpires"
                    value={ formattedWarrantyExpiry }
                    readOnly={ true }
                  />
                  </span>
                </div> : ''
              }
        </Fragment>
    );
};

export default ProductGeneralComponent;
