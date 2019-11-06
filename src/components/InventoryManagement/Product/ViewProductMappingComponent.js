import React, { Component } from 'react';
import { Button, Checkbox } from '../../common';

class ViewProductMappingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inverters: [],
      optimizers: [],
      otherParts: [],
      useFor: {
        residential: false,
        commercial: false,
        nonProfit: false,
        industrial: false
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps && nextProps.mappingData) {
      this._getModifyMappingData(nextProps);
    }
  }

  _getModifyMappingData = data => {
    const { mappingData, inverterList, optimizerList, partList   } = data;
    this._setUseFor(mappingData);
    this._getInverterMappingData(mappingData, inverterList);
    this._getOptimizerMappingData(mappingData, optimizerList);
    this._getPartsMappingData(mappingData, partList);
  }

  _setUseFor = data => {
    const { useFor } = this.state;
    if(data.useFor) {
      useFor.residential = data && data.useFor.residential;
      useFor.commercial = data && data.useFor.commercial;
      useFor.nonProfit = data && data.useFor.nonProfit;
      useFor.industrial = data && data.useFor.industrial;
      this.setState({
        useFor
      });
    }
  }

  _getInverterMappingData = (mappingData, inverterList) => {
    let modifiedInverterData = [];
    if(mappingData.length === 0) {
      modifiedInverterData = inverterList;
    } else {
      modifiedInverterData = inverterList && inverterList.map(inverter => {
        mappingData.inverters.map(inv => {
           if(inverter.productId === inv.productId) {
             inverter.checked = true;
           }
       });
       return inverter;
     });
    }
   
    this.setState({
      inverters: modifiedInverterData
    });
  }

  _getOptimizerMappingData = (mappingData, optimizerList) => {
    let modifiedOptimizerData = [];
    if(mappingData.length === 0) {
      modifiedOptimizerData = optimizerList;
    } else {
       modifiedOptimizerData = optimizerList && optimizerList.map(optimizer => {
        mappingData.optimizers.map(opt => {
           if(optimizer.productId === opt.productId) {
             optimizer.checked = opt.checked;
           }
       });
       return optimizer;
   });
    }
    
    this.setState({
      optimizers: modifiedOptimizerData
    });
  }

  _getPartsMappingData = (mappingData, partList) => {
    let modifiedPartsData = [];
    if(mappingData.length === 0) {
      modifiedPartsData = partList;
    } else {
       modifiedPartsData = partList && partList.map(part => {
        mappingData.otherParts.map(otherPart => {
          if(part.productId === otherPart.productId) {
            part.checked = otherPart.checked;
          }
        });
        return part;
      });
    }
   
    this.setState({
      otherParts: modifiedPartsData
    });
  }

  _onFieldChangeUseFor = e => {
    const { name, checked } = e.currentTarget;
    const { useFor } = this.state;
    useFor[name] = checked;
    this.setState({
      useFor
    });
  }

  _onFieldChangeInverter = e => {
    const { name, checked } = e.currentTarget;
    const { inverters } = this.state;
    inverters.map(inverter => {
      if(inverter.productId === parseInt(name)) {
        inverter.checked = checked;
      }
    });
    this.setState({
      inverters
    });
  }

  _onFieldChangeOptimizer = e => {
    const { name, checked } = e.currentTarget;
    const { optimizers } = this.state;
    optimizers.map(opt => {
      if(opt.productId === parseInt(name)) {
        opt.checked = checked;
      }
    });
    this.setState({
      optimizers
    });
  }

  _onFieldChangeParts = e => {
    const { name, checked } = e.currentTarget;
    const { otherParts } = this.state;
    otherParts.map(part => {
      if(part.productId === parseInt(name)) {
        part.checked = checked;
      }
    });
    this.setState({
      otherParts
    });
  }

  _submitForm = () => {
    const { mappingData } = this.props;
    const { moduleName, moduleId, mappingId } = mappingData;
    let { useFor, inverters, optimizers, otherParts } = this.state;
    inverters = inverters && inverters.filter(inv => {
      return inv.checked === true;
    });
    optimizers = optimizers && optimizers.filter(opt => {
      return opt.checked === true;
    });
    otherParts = otherParts && otherParts.filter(part => {
      return part.checked === true;
    });
    const dataObj = {
      moduleName,
      moduleId,
      mappingId,
      useFor,
      inverters,
      optimizers,
      otherParts
    };
    this.props.submitForm(dataObj);
  }

  _cancelForm = () => {
    this.props.cancelForm();
  }

    render() {
        const { mappingData } = this.props;
        const { inverters, optimizers, otherParts, useFor } = this.state;
        const { residential, commercial, nonProfit, industrial } = useFor;
        return (
            <div className="container">   
                <div className="wrapper-mapping">
                    <div className="wrapper-module border-separator">
                        <div className="row">
                            <div className="cols">
                                <div className="row">
                                    <span className="form-label">Module Name</span><br /> <span className="form-label-text">{ mappingData && mappingData.moduleName }</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wrapper-userfor border-separator">
                       <p>Use For</p>
                        <div className="row">
                             <div className="cols">
                                <span>
                                  <label className="checkbox-label">
                                    <Checkbox 
                                      name="residential" 
                                      type="checkbox" 
                                      className="select-checkbox" 
                                      onChange={ this._onFieldChangeUseFor }
                                      checked={ residential }
                                    />
                                  </label>
                                  <span className="checkbox-text">Residential</span>
                                  </span>
                             </div>

                             <div className="cols">
                                <span>
                                    <label className="checkbox-label">
                                      <Checkbox 
                                        name="commercial" 
                                        type="checkbox" 
                                        className="select-checkbox" 
                                        onChange={ this._onFieldChangeUseFor }
                                        checked={ commercial }
                                      />
                                    </label>
                                    <span className="checkbox-text">Commercial</span>
                                </span>
                              </div>

                              <div className="cols">
                                <span>
                                    <label className="checkbox-label">
                                      <Checkbox 
                                        name="nonProfit" 
                                        type="checkbox" 
                                        className="select-checkbox" 
                                        onChange={ this._onFieldChangeUseFor }
                                        checked={ nonProfit }
                                      />
                                    </label>
                                    <span className="checkbox-text">Non Profit</span>
                                </span>
                              </div>

                              <div className="cols">
                                <span>
                                    <label className="checkbox-label">
                                      <Checkbox 
                                        name="industrial" 
                                        type="checkbox" 
                                        className="select-checkbox" 
                                        onChange={ this._onFieldChangeUseFor }
                                        checked={ industrial }
                                      />
                                    </label>
                                    <span className="checkbox-text">Industrial</span>
                                </span>
                              </div>
                        </div>
                    </div>
                    <div className="wrapper-inverter border-separator">
                        <p>Inverter</p>
                        <div className="row">
                          {
                            inverters && inverters.map(inverter => (
                              <div className="cols">
                                      <span>
                                          <label className="checkbox-label">
                                            <Checkbox 
                                              name={ inverter.productId } 
                                              type="checkbox" 
                                              className="select-checkbox" 
                                              onChange={ this._onFieldChangeInverter }
                                              checked={ inverter.checked }
                                            />
                                          </label>
                                          <span className="checkbox-text">{inverter.productName}</span>
                                      </span>
                                </div>
                            ))
                          }
                       </div>
                    </div>
                    <div className="wrapper-optimizer border-separator">
                        <p>Optimizer</p>
                        <div className="row">
                          {
                            optimizers && optimizers.map(optimizer => (
                              <div className="cols">
                                      <span>
                                          <label className="checkbox-label">
                                            <Checkbox 
                                              name={ optimizer.productId } 
                                              type="checkbox" 
                                              className="select-checkbox" 
                                              onChange={ this._onFieldChangeOptimizer }
                                              checked={ optimizer.checked }
                                            />
                                          </label>
                                          <span className="checkbox-text">{optimizer.productName}</span>
                                      </span>
                                </div>
                            ))
                          }
                       </div>
                    </div>
                    <div className="wrapper-otherparts border-separator">
                      <p>Other Parts</p>
                      <div className="row">
                          {
                            otherParts && otherParts.map(part => (
                              <div className="cols">
                                      <span>
                                          <label className="checkbox-label">
                                            <Checkbox 
                                              name={ part.productId } 
                                              type="checkbox" 
                                              className="select-checkbox" 
                                              onChange={ this._onFieldChangeParts }
                                              checked={ part.checked }
                                            />
                                          </label>
                                          <span className="checkbox-text">{part.productName}</span>
                                      </span>
                                </div>
                            ))
                          }
                     </div>
                   </div>

                    <div className='btn-footer-group'>
                        <Button name='Cancel' type='button' className='btn-footer-cancel' onClick={ this._cancelForm }/>
                        <Button name='Submit' type='button' className='btn-footer-submit' onClick={ this._submitForm } />
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewProductMappingComponent;
