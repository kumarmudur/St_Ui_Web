import React, { Component } from 'react';
import { Button } from '../../common';
import { NavLink } from 'react-router-dom';
import { ICONS } from '../../../constants';
import FloatingLabel from 'floating-label-react';

class OtherPriceComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otherPrice: {
                category: '',
                subCategories: [
                    {
                        subCategory: '',
                        cost: [],
                        unit: '',
                        unitCost: ''
                    }
                     
                ]
            },
            errors : { },
            showOtherPriceDiv: true
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.otherPriceData) {
            this.setState({
                otherPrice: nextProps.otherPriceData
            });
        }
    }

    _callSetState = () => {
        const { otherPrice } = this.state;
        this.setState({
            otherPrice
        });
    }

    _addSubCategory = () => {
        const { otherPrice } = this.state;
        const { subCategories } = otherPrice;
        subCategories.push({ 
            subCategory: '',
            unit: '',
            unitCost: '',
            cost: []
        });
       this._callSetState();
    }

    _deleteSubCategory = indexValue => {

        const { otherPrice } = this.state;
        const { subCategories } = otherPrice;
        const filteredData =  subCategories.filter((subCat, index) => index !== parseInt(indexValue));
        otherPrice.subCategories = filteredData;
        this._callSetState();
    }

    _addUnits = indexValue => {
        const { otherPrice } = this.state;
        const { subCategories } = otherPrice;
        subCategories && subCategories.map((subCat, index) => {
            if(index === parseInt(indexValue)) {
                if(subCat.unit && subCat.unitCost) {
                    subCat.cost.push({
                        unitCost: subCat.unitCost,
                        unit: subCat.unit
                    });
                    subCat.unit = '';
                    subCat.unitCost = '';
                }
            }
        });
        this._callSetState();
    }

    _onDeleteCost = e => {
        const { id, name } = e.currentTarget;
        const { otherPrice } = this.state;
        const { subCategories } = otherPrice;
        const filteredData = subCategories && subCategories.map((subCat, index) => {
            if(index === parseInt(name)) {
                const { cost } = subCat;
                const filteredCost = cost && cost.filter((cost, idx) => {
                    return idx !== parseInt(id);
                });
                subCat.cost = filteredCost;
            }
            return subCat;
        });
        otherPrice.subCategories = filteredData;
        this._callSetState();
    } 

    _onFieldChange = e => {
        const { name, value } = e.currentTarget;
        const { otherPrice } = this.state;
        otherPrice[name] = value;
        this._callSetState();
    }

    _onFieldChangeSubCategory = e => {
        const { name, value } = e.currentTarget;
        const {  otherPrice } = this.state;
        const { subCategories } = otherPrice;
        let indexValue = name && name.split('-');
        let id = indexValue && indexValue[1];
        let namevalue = indexValue && indexValue[0];
        subCategories.map((subCat, index) => {
            if(index === parseInt(id)) {
                subCat[namevalue] = value;
            }
        });
        this._callSetState();
    }

    _onFieldChangeListCost = e => {
        const { name, value } = e.currentTarget;
        const { otherPrice } = this.state;
        const { subCategories } = otherPrice;
        let indexValue = name && name.split('-');
        let subCatIndex = indexValue && indexValue[1];
        let costIndex = indexValue && indexValue[2];
        let nameValue = indexValue && indexValue[0];
        subCategories.map((subCat, index) => {
            if(index === parseInt(subCatIndex)) {
                const { cost } = subCat;
                cost.map((cost, index) => {
                    if(index === parseInt(costIndex)) {
                        cost[nameValue] = value;
                    }
                });
            }
        });
        this._callSetState();
    }

    _submitForm = () => {
        let { otherPrice } = this.state;
        let { subCategories } = otherPrice;
        const status = this._checkValidation(otherPrice);
        if(status) {
            subCategories = subCategories.map(item => {
                return {
                    subCategory: item.subCategory,
                    cost: item.cost                
                };
            });
            const dataObj = {
                category: otherPrice.category,
                subCategories
            };
            this.props.submitOtherPriceForm(dataObj);
        }
    }

    _checkValidation = data => {
        const { otherPrice } = this.state;
        const { category, subCategories } = data;
        
        let formIsValid = true;
        const errors = {};
        subCategories && subCategories.map((subCat) => {
            if(!subCat.subCategory) {
                formIsValid = false;
                subCat.errorSubCategory = 'Sub category is required';
            } else {
                subCat.errorSubCategory = '';
            }
            return subCat;
        });
        otherPrice.subCategories = subCategories;
        if(!category) {
            formIsValid = false;
            errors.errorCategory = 'Category is required';
        }
        this.setState({
            otherPrice,
            errors
        });
        return formIsValid;
    }

    _onClickShowOtherPriceDiv = () => {
        this.setState({
            showOtherPriceDiv: !this.state.showOtherPriceDiv
        });
    }

    _cancelForm = () => {
        this.props.cancelForm(true);
    }

    render() {
        const { otherPrice, errors, showOtherPriceDiv } = this.state;
        const { category, subCategories } = otherPrice;
        const { errorCategory } = errors;
        const { id } = this.props;
        return (
            <div className="wrapper-other-price">
                <a href="#" className="sub" tabindex="2" onClick={ this._onClickShowOtherPriceDiv } ><i className={ (showOtherPriceDiv && 'price-arrow-down' || ! showOtherPriceDiv && 'price-arrow-right') } /></a>
                {
                    id ? <p className="other-price-title">Edit Other Price</p> : <p className="other-price-title">Add Other Price</p>
                }
                {
                    showOtherPriceDiv ? 
                <div className="wrapper-price">
                    <div className="row row-category">
                      <span className="wrapper">
                        <FloatingLabel 
                          className="form-input" 
                          placeholder="Category" 
                          type="text" 
                          name="category"
                          value={ category }
                          maxLength="25"
                          onChange={ this._onFieldChange }
                          autoComplete="none"
                        />
                      <div className="error">{ errorCategory }</div>
                      </span>
                    </div>
                    {
                        subCategories && subCategories.map((subCategory, index) => (
                        <div className="wrapper-subcategory">
                        <div className="row row-subcategory">
                            <span className="wrapper">
                               <FloatingLabel 
                                 className="form-input" 
                                 placeholder="Sub Category" 
                                 type="text" 
                                 name={ `subCategory-${index}` }
                                 value={ subCategory.subCategory }
                                 maxLength="25"
                                 onChange={ this._onFieldChangeSubCategory }
                                 autoComplete="none"
                               />
                             <div className="error">{ subCategory.errorSubCategory }</div>
                            </span>
                            <span className="wrapper">
                              <Button 
                                name="Delete" 
                                type='button' 
                                className='btn-footer-cancel delete-subcategory' 
                                onClick={ () => this._deleteSubCategory(index) } // eslint-disable-line
                              />
                            </span>
                        </div>
                        <div className="row">
                            <span className="wrapper">
                               <FloatingLabel 
                                 className="form-input" 
                                 placeholder="Unit" 
                                 type="text" 
                                 name={ `unit-${index}` }
                                 value={ subCategory.unit }
                                 maxLength="8"
                                 onChange={ this._onFieldChangeSubCategory }
                                 autoComplete="none"
                               />
                            </span>
                            <span className="wrapper">
                               <FloatingLabel 
                                 className="form-input" 
                                 placeholder="Unit Cost($)*" 
                                 type="text" 
                                 name={ `unitCost-${index}` }
                                 value={ subCategory.unitCost }
                                 maxLength="9"
                                 onChange={ this._onFieldChangeSubCategory }
                                 autoComplete="none"
                               />
                            </span>
                            <span className="wrapper">
                                <Button 
                                  name="Add" 
                                  type='button' 
                                  className='btn-footer-cancel add-unit' 
                                  onClick={ () => this._addUnits(index) } // eslint-disable-line
                                />
                            </span>
                        </div>
                        {
                            subCategory && subCategory.cost &&subCategory.cost.map((cost, idx) => (
                            <div className="row">
                              <span className="wrapper">
                                 <FloatingLabel 
                                   className="form-input" 
                                   placeholder="Unit" 
                                   type="text" 
                                   name={ `unit-${index}-${idx}` }
                                   value={ cost.unit }
                                   maxLength="8"
                                   onChange={ this._onFieldChangeListCost }
                                 />
                                </span>
                                <span className="wrapper">
                                <FloatingLabel 
                                  className="form-input" 
                                  placeholder="Unit Cost($)*" 
                                  type="text" 
                                  name={ `unitCost-${index}-${idx}` }
                                  value={ cost.unitCost }
                                  maxLength="9"
                                  onChange={ this._onFieldChangeListCost }
                                />
                                </span>
                                <span className="wrapper">
                                    <NavLink to="#delete_cost"><img id={ idx } name={ index } className="img-delete-cost" src={ ICONS.DELETE } alt="delete" onClick={ this._onDeleteCost }/></NavLink>
                                </span>
                              </div>
                            ))
                         }
                     </div>
                    ))
                   }
                   <div className="wrapper-btn-subcategory">
                        <Button name="Add Sub Category" type="button" className="btn-footer-submit add-subcat" onClick={ this._addSubCategory } />

                   </div>
                   <div className='btn-footer-group'>
                    <Button name='Cancel' type='button' className='btn-footer-cancel' onClick={ this._cancelForm }/>
                    <Button name='Submit' type='button' className='btn-footer-submit' onClick={ this._submitForm } />
                  </div>
                </div> : ''
               }
            </div>
        );
    }
}

export default OtherPriceComponent;
