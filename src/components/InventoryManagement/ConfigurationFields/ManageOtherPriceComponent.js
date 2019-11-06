import React, { Component, Fragment } from 'react';
import { Button, Input } from '../../common';
import { ICONS } from '../../../constants';
import { getDateTime } from '../../../utils/extractDateTime';
import { NavLink } from 'react-router-dom';
class ManageOtherPriceComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            configList: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.configListData) {
            this.setState({
                configList: nextProps.configListData
            });
        }
    }

    _onEditConfigField = e => {
        const { id } = e.currentTarget;
        if(id) {
            this.props.getOtherPriceConfigFieldsData(id);
        }
    }

    _onDeleteConfigData = e => {
        const { id } = e.currentTarget;
        if(id) {
            this.props.deleteConfigField(id);

        }
    }

    _onBlurSearchHandler = e => {
        const { value } = e.currentTarget;
        this.props.postSearchConfig(value); 
    }

    _onClickAddOtherPrice = () => {
        this.props.onClickAddOtherPrice(false);
    }

    _onKeyPressed =  e => {
        let code = e.keyCode || e.which;
        if(code === 13) {
            this.props.postSearchConfig(e.currentTarget.value);
        }
    }

    render() {
        const { configList } = this.state;

        const configData = configList && configList.map((config) => {
            return (
                <div className="grid-row">
                    <div className="grid-cell">
                        <label>{ config.category }</label>
                    </div>
                    <div className="grid-cell">
                        {
                            config.subCategories && config.subCategories.map(subCat => {
                                return <div className="grid-row nested-row" rowspan="0">
                                  <div className="nested-cell grid-cell">
                                    <label>{ subCat.subCategory }</label>
                                  </div>
                                </div>;
                                
                            })
                        }
                    </div>
                    <div className="grid-cell">
                        {
                            config.subCategories && config.subCategories.map(subCat => {
                              return subCat && subCat.cost && subCat.cost.map(cost => {
                                  return <div className="grid-row nested-row">
                                        <div className="nested-cell grid-cell">
                                            <label>{ cost.unit }</label>
                                        </div>
                                    </div>;
                               });
                            })
                        }
                    </div>
                    <div className="grid-cell">
                        {
                            config.subCategories && config.subCategories.map(subCat => {
                              return subCat && subCat.cost && subCat.cost.map(cost => {
                                  return <div className="grid-row nested-row">
                                        <div className="nested-cell grid-cell">
                                            <label>{ cost.unitCost }</label>
                                        </div>
                                    </div>;
                               });
                            })
                        }
                    </div>
                    <div className="grid-cell">
                        <label>{ config.createdDateTime && getDateTime('date', config.createdDateTime) }</label>
                    </div>
                    <div className="grid-cell">
                        <label>{ config.createdBy }</label>
                    </div>
                    <div className="grid-cell">
                        <label>{ config.status }</label>
                    </div>
                    <div className="grid-cell">
                        <span>
                          <NavLink to="#delete_config_field"><img title="EDIT_CONFIG_FIELD" id={ config.configurationId } className="imgIconCurosr" src={ ICONS.EDIT } alt="add" onClick={ this._onEditConfigField }/></NavLink>
                        </span>
                        <span>
                           <NavLink to="#delete_product_specification"><img title="DELETE_CONFIG_FIELD" id={ config.configurationId } className="imgIconCurosr" src={ ICONS.DELETE } alt="delete" onClick={ this._onDeleteConfigData }/></NavLink>
                        </span>
                    </div>
                </div>
            );
        });
        return (
            <Fragment>
                <div>
                  <div className="search-main search-config-fields">
                    <Input 
                      placeholder="Search by Category, Sub Category"
                      type="text"
                      className="input-search roundedCorner"
                      onBlur={ this._onBlurSearchHandler }
                      keyPress={ this._onKeyPressed }
                    />
                    <img className="image-search" src={ ICONS.SEARCH_GREEN } width="16" alt="" title="Search" />
                  </div>
                
                  <div className="btn-footer-group">
                    <Button name='Add Other Price' type='button' className='btn-footer-cancel btn-other-price' onClick={ this._onClickAddOtherPrice }/>
                  </div>
                  
                  <div className="config-grid">
                   <div className="table-heading">
                    <div className="grid-row">
                        <div className="header">Category</div>
                        <div className="header">Sub Category</div>
                        <div className="header">Unit</div>
                        <div className="header">Unit Cost</div>
                        <div className="header">Created On</div>
                        <div className="header">Created By</div>
                        <div className="header">Status</div>
                        <div className="header">Actions</div>
                    </div>
                  </div>
                  <div className="grid-body">
                    { configData }
                  </div>

                  </div>
                </div>
            </Fragment>
        );
    }
}

export default ManageOtherPriceComponent;
