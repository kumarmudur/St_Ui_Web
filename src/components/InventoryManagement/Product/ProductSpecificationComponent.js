import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { ICONS } from '../../../constants';
import { Input,  DropdownBox, Checkbox } from '../../common';

const ProductSpecificationComponent = props => {
    const { checkDimension, checkWeight, checkColor, specifications,
        checkDocumentUpload, onCheckboxFieldChange, onFieldChange, 
        onDeleteProductSpecification, addSpecification, onChangeSelectProductSpecification } = props;
    return (
        <Fragment>
            <p className="title">Product Specification</p>
              <p className="select-checkbox-appicable">Select checkbox if applicable</p>
              <div className="row">
                    <label className="checkbox-label">
                        <Checkbox 
                          name="checkDimension" 
                          type="checkbox"  
                          className="select-checkbox" 
                          checked={ checkDimension }
                          onChange={ onCheckboxFieldChange }
                        />
                    </label>
                    <span>Dimension</span>  
                    <label className="checkbox-label">
                        <Checkbox 
                          name="checkWeight" 
                          type="checkbox" 
                          className="select-checkbox"
                          checked={ checkWeight }
                          onChange={ onCheckboxFieldChange }
                        />
                    </label>
                    <span>Weight</span>
                    <label className="checkbox-label">
                        <Checkbox 
                          name="checkColor" 
                          type="checkbox" 
                          className="select-checkbox" 
                          checked={ checkColor }
                          onChange={ onCheckboxFieldChange }
                        />
                    </label>
                    <span>Color</span>
                    <label className="checkbox-label">
                        <Checkbox 
                          name="checkDocumentUpload" 
                          type="checkbox"  
                          className="select-checkbox" 
                          checked={ checkDocumentUpload }
                          onChange={ onCheckboxFieldChange }                             
                        />
                    </label>
                    <span>Document Upload</span>
              </div>
              <div className="product-grid">
                {
                  specifications && specifications.length > 0 ? <div className="table-heading">
                      <div className="grid-row">
                          <div className="header">Measurement Variable</div>
                          <div className="header">Type</div>
                          <div className="header">Value</div>
                          <div className="header">Actions</div>
                      </div>
                    </div> : null
                }
                <div className="grid-body">
                        {
                          specifications && specifications.map((sp, index) => (
                                <div className="grid-row">
                                    <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        placeholder=""
                                        name={ `measurementVariable-${ index }` }
                                        value={ sp.measurementVariable } 
                                        maxLength={ 100 }  
                                        textChange={ onFieldChange }
                                      />
                                    </div>
                                    <div className="grid-cell warehouse-cell">
                                      <div className="inline-div">
                                        <DropdownBox 
                                          placeholder="Select"
                                          name={ `measurementType-${ index }` } 
                                          options={ sp.listType ? sp.listType.fieldValues : [] }
                                          onChangeSelect= { value => onChangeSelectProductSpecification(value, `measurementType-${ index }`) } // eslint-disable-line
                                          selectedValue={ sp.measurementType }
                                        />
                                      </div>
                                    </div>
                                    <div className="grid-cell">
                                    {
                                      sp.name !== 'checkDocumentUpload' ? <Input 
                                        className="form-input" 
                                        type={ sp.name === 'checkDocumentUpload' ? 'file' : 'text' }
                                        placeholder={ sp.name === 'checkDocumentUpload' ? 'Upload File' : '' }
                                        name={ `measurementValue-${ index }` }
                                        maxLength={ 25 }  
                                        textChange={ onFieldChange }
                                        value={ sp.measurementValue }
                                      /> : <div className="docupload">
                                           <div className="upload-btn-wrapper">
                                            <span className="btn-wrapper"><button className="btn"><img src={ ICONS.UPLOAD } width="15" height="18" alt="" />{ } </button> Upload</span>
                                            <input 
                                              type='file'
                                              name={ `measurementValue-${ index }` }
                                              id='addfile-0'
                                              onChange={ onFieldChange }
                                            />
                                        </div>
                                        { sp.measurementValue }
                                      </div>
                                    }
                                    </div>
                                    <div className="grid-cell">
                                     <span>
                                        <NavLink to="#add_product_specification"><img name={ sp.name } id={ index } className="imgIconCurosr" src={ ICONS.ADD } alt="add" onClick={ addSpecification }/></NavLink>
                                      </span>
                                      <span>
                                        <NavLink to="#delete_product_specification"><img id={ index } className="imgIconCurosr" src={ ICONS.DELETE } alt="delete" onClick={ onDeleteProductSpecification }/></NavLink>
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

export default ProductSpecificationComponent;
