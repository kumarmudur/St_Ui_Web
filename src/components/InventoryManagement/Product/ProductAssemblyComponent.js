import React, { Fragment } from 'react';
import { Input,  DropdownBox} from '../../common';
import { NavLink } from 'react-router-dom';
import { ICONS } from '../../../constants';

const ProductAssemblyComponent = props => {
    const { productAssemblyModule, modules, inverters, optimizers, onFieldChange, onChangeSelect, 
      onChangeSelectOptimizer, onChangeSelectInverter,
      grandTotalAssemblyResidential, grandTotalAssemblyCommercial, grandTotalAssemblyNonProfit, 
      grandTotalAssemblyIndustrial, productAssemblyOptimizer, productAssemblyInverter, onClearProductAssembly } = props;
    const moduleList = modules && modules.map(module => {
      return {
        label: module.productName,
        value: `${module.productName}-${module.productId}`
      };
    });
    const invertersList = inverters && inverters.map(inverter => {
      return  {
        label: inverter.productName,
        value: `${inverter.productName}-${inverter.productId}`
      };
    });
    const optimizersList = optimizers && optimizers.map(optimizer => {
      return {
        label: optimizer.productName,
        value: `${optimizer.productName}-${optimizer.productId}`
      };
    });
    return (
        <Fragment>
            <p className="title">Product Assembly</p>
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
                            <div className="grid-row">
                                <div className="grid-cell warehouse-cell">
                                    <div className="inline-div">
                                    <DropdownBox 
                                      placeholder="Select Module"
                                      name="moduleItem"
                                      options={ moduleList ? moduleList : [] }
                                      onChangeSelect= { value => onChangeSelect(value) } // eslint-disable-line
                                      selectedValue={ productAssemblyModule.productName }
                                    />
                                    </div>
                                </div>
                                <div className="grid-cell">
                                    <Input 
                                      className="form-input" 
                                      type="text" 
                                      name="moduleWatt"
                                      value={ productAssemblyModule.power } 
                                      readOnly={ true }
                                    />
                                </div>
                                <div className="grid-cell">
                                    <Input 
                                      className="form-input" 
                                      placeholder="Quantity"
                                      type="text" 
                                      name="moduleQuantity"
                                      value={ productAssemblyModule.quantity } 
                                      maxLength={ 25 }  
                                      textChange={ onFieldChange }
                                      readOnly={ productAssemblyModule.productName ? false : true }
                                    />
                                </div>
                                <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        name="moduleResidential"
                                        value={ productAssemblyModule.residential } 
                                        readOnly={ true }
                                      />
                                    </div>
                                    <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        name="moduleCommercial"
                                        value={ productAssemblyModule.commercial } 
                                        readOnly={ true }
                                      />
                                    </div>
                                    <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        name="moduleNonProfit"
                                        value={ productAssemblyModule.nonProfit } 
                                        readOnly={ true }
                                      />
                                    </div>
                                    <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        name="moduleIndustrial"
                                        value={ productAssemblyModule.industrial } 
                                        readOnly={ true }
                                      />
                                    </div>
                                    <div className="grid-cell grid-delete-cell">
                                      <span>
                                        <NavLink to="#delete_product_specification"><img id='module' className="imgIconCurosr" src={ ICONS.DELETE } alt="delete" onClick={ onClearProductAssembly }/></NavLink>
                                      </span>
                                   </div>
                            </div>  

                            <div className="grid-row">
                                <div className="grid-cell warehouse-cell">
                                    <div className="inline-div">
                                    <DropdownBox 
                                      placeholder="Select Optimizer"
                                      name="optimizerName"
                                      options={ optimizersList ? optimizersList : [] }
                                      onChangeSelect= { value => onChangeSelectOptimizer(value, 'optimizer') } // eslint-disable-line
                                      selectedValue={ productAssemblyOptimizer.optimizerName }
                                    />
                                    </div>
                                </div>
                                <div className="grid-cell">
                                    <Input 
                                      className="form-input" 
                                      type="text" 
                                      name=" optimizerWatt"
                                      value={ productAssemblyOptimizer.power } 
                                      readOnly={ true }
                                    />
                                </div>
                                <div className="grid-cell">
                                    <Input 
                                      className="form-input" 
                                      placeholder="Quantity"
                                      type="text" 
                                      name="optimizerQuantity"
                                      value={ productAssemblyOptimizer.quantity } 
                                      maxLength={ 25 }  
                                      textChange={ onFieldChange }
                                      readOnly={ productAssemblyOptimizer.optimizerName ? false : true }
                                    />
                                </div>
                                <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        name="optimizerResidential"
                                        value={ productAssemblyOptimizer.residential } 
                                        readOnly={ true }
                                      />
                                    </div>
                                    <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        name="optimizerCommercial"
                                        value={ productAssemblyOptimizer.commercial } 
                                        readOnly={ true }
                                      />
                                    </div>
                                    <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        name="optimizerNonProfit"
                                        value={ productAssemblyOptimizer.nonProfit } 
                                        readOnly={ true }
                                      />
                                    </div>
                                    <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        name="optimizerIndustrial"
                                        value={ productAssemblyOptimizer.industrial } 
                                        readOnly={ true }
                                      />
                                    </div>
                                    <div className="grid-cell grid-delete-cell">
                                      <span>
                                        <NavLink to="#delete_product_specification"><img id="optimizer" className="imgIconCurosr" src={ ICONS.DELETE } alt="delete" onClick={ onClearProductAssembly }/></NavLink>
                                      </span>
                                   </div>
                            </div>  

                            <div className="grid-row">
                                <div className="grid-cell warehouse-cell">
                                    <div className="inline-div">
                                    <DropdownBox 
                                      placeholder="Select Inverter"
                                      name="inverterName"
                                      options={ invertersList ? invertersList : [] }
                                      onChangeSelect= { value => onChangeSelectInverter(value, 'inverter') } // eslint-disable-line
                                      selectedValue={ productAssemblyInverter.inverterName }
                                    />
                                    </div>
                                </div>
                                <div className="grid-cell">
                                    <Input 
                                      className="form-input" 
                                      type="text" 
                                      name="inverterWatt"
                                      value={ productAssemblyInverter.power } 
                                      readOnly={ true }
                                    />
                                </div>
                                <div className="grid-cell">
                                    <Input 
                                      className="form-input" 
                                      placeholder="Quantity"
                                      type="text" 
                                      name="inverterQuantity"
                                      value={ productAssemblyInverter.quantity } 
                                      maxLength={ 25 }  
                                      textChange={ onFieldChange }
                                      readOnly={ productAssemblyInverter.inverterName ? false : true }
                                    />
                                </div>
                                <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        name="inverterResidential"
                                        value={ productAssemblyInverter.residential } 
                                        readOnly={ true }
                                      />
                                    </div>
                                    <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        name="inverterCommercial"
                                        value={ productAssemblyInverter.commercial } 
                                        readOnly={ true }
                                      />
                                    </div>
                                    <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        name="inverterNonProfit"
                                        value={ productAssemblyInverter.nonProfit } 
                                        readOnly={ true }
                                      />
                                    </div>
                                    <div className="grid-cell">
                                      <Input 
                                        className="form-input" 
                                        type="text" 
                                        name="inverterIndustrial"
                                        value={ productAssemblyInverter.industrial } 
                                        readOnly={ true }
                                      />
                                    </div>
                                     <div className="grid-cell grid-delete-cell">
                                      <span>
                                        <NavLink to="#delete_product_specification"><img id="inverter" className="imgIconCurosr" src={ ICONS.DELETE } alt="delete" onClick={ onClearProductAssembly }/></NavLink>
                                      </span>
                                   </div>
                            </div>  
                </div>

                <div className="table-heading grand-total-assembly">
                    <div className="grid-row">
                        <div className="header">Grand Total</div>
                        <div className="header no-border"></div>
                        <div className="header no-border"></div>
                        <div className="header">{ grandTotalAssemblyResidential }</div>
                        <div className="header">{ grandTotalAssemblyCommercial }</div>
                        <div className="header">{ grandTotalAssemblyNonProfit }</div>
                        <div className="header">{ grandTotalAssemblyIndustrial }</div>
                        <div className="header"></div>
                    </div>
                </div>

            </div>
        </Fragment>
    );
};

export default ProductAssemblyComponent;