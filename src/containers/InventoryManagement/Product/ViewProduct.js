import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NAVIGATION } from '../../../actions';
import { GET_PRODUCT_DATA, GET_PRODUCT_MODULE_MAPPING, GET_INVERTER_LIST, 
    GET_OPTIMIZER_LIST, GET_PRODUCT_PART_LIST, POST_SUBMIT_MAPPING, SET_ALERT_STATUS } from '../../../actions/inventoryManagement';
import { Breadcrumb, Modal, Button } from '../../../components/common';
import ViewProductGeneralComponent from '../../../components/InventoryManagement/Product/ViewProductGeneralComponent';
import ViewProductMappingComponent from '../../../components/InventoryManagement/Product/ViewProductMappingComponent';
import { VIEW_PRODUCT_TABS, MESSAGE } from '../../../constants';

class ViewProduct extends Component {
    constructor(props) {
        super(props);
        if(props && props.id) {
            this._getProductData(props.id);
        }
        this.state = {
            showTab: true,
            generalClassName: 'btn-footer-submit',
            mappingClassName: 'btn-footer-cancel'
        };
    }

    _getProductData = id => {
        const { authToken } = this.props.Login;
        this.props.getProductData({ id, authToken });
    }

    _editProduct = (link, id) => {
        this.props.navigate({ currentPage: link, id });
    }
    

    _onClickTabChange = tabName => {
        let  generalClassName ='', mappingClassName = '', showTab = false;
 
        if(tabName === VIEW_PRODUCT_TABS.GENERAL) {
            showTab = true;
            generalClassName = 'btn-footer-submit';
            mappingClassName = 'btn-footer-cancel';
        } else if (tabName === VIEW_PRODUCT_TABS.MAPPING) {
            showTab = false;
            generalClassName = 'btn-footer-cancel';
            mappingClassName = 'btn-footer-submit';
            this._getMappingData();
        }
        this.setState({
            showTab,
            generalClassName,
            mappingClassName
        });
    }

    _getMappingData = () => {
        const { id, Login, getMappingData, getInverterList, getOptimizerList, getProductPartList } = this.props;
        const { authToken } = Login;
        getMappingData({ id, authToken });
        getInverterList({ authToken });
        getOptimizerList({ authToken });
        getProductPartList({ authToken });
    }

    _submitForm = data => {
        const { Login } = this.props;
        const { authToken } = Login;
        const dataObj = {
            authToken,
            data
        };
        this.props.submitMapping(dataObj);
    }

    _cancelForm = () => {
        this.props.setAlertStatus({ 'visible': false });
        this.props.navigate({ currentPage: 'MANAGE_PRODUCTS' });
    }

    render() {
        const { showTab, generalClassName, mappingClassName } = this.state;
        const { productData, mappingData, inverterList, optimizerList, partList, isAlertVisible, code, message } = this.props;
        let modalBody = '';
        if (code == 200) {
           modalBody =  message;
        } else if( code != 200) {
           modalBody = MESSAGE.ERROR;
        } 
        const buttonMeta = [
            {
                name: 'Ok',
                class: 'btn-delete',
                onclick: this._cancelForm
            }
        ];
        return (
            <Fragment>
                <div className="align-breadcrumb">
                 <Breadcrumb 
                   firstTitle="Manage Inventory"
                   secondTitle="Manage Products"
                   thirdTitle={ 'View Product' }
                   changePage={ this._cancelForm }
                 />
                 </div>
                <div className='btn-footer-group btn-view-product-group'>
                   <Button 
                     name='General' 
                     type='button' 
                     className={ generalClassName } 
                     onClick={ () => this._onClickTabChange('general') } // eslint-disable-line
                   /> 
                   {
                    productData && productData.category === 'Module' ? 
                      <Button 
                        name='Mapping' 
                        type='button' 
                        className={ mappingClassName } 
                        onClick={ () => this._onClickTabChange('mapping') } // eslint-disable-line
                      /> : ''
                   }
                   
                </div>
                {
                    showTab ? 
                        <ViewProductGeneralComponent 
                          productData={ productData }
                          editProduct={ this._editProduct }
                        /> : 
                        <Fragment>
                          <ViewProductMappingComponent 
                            mappingData={ mappingData }
                            inverterList={ inverterList }
                            optimizerList={ optimizerList }
                            partList={ partList }
                            submitForm={ this._submitForm }
                            cancelForm={ this._cancelForm }
                          />
                          <Modal
                            title="Message" 
                            isShowModal={ isAlertVisible } 
                            modalBody={ modalBody }
                            closeModal={ this._cancelForm }
                            buttons={ buttonMeta }
                          />
                        </Fragment>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { Login, GetProductData, GetProductModuleMapping, GetInverterList, GetOptimizerList, GetProductPartList, AlertStatus, PostSubmitMapping } = state;
    const productData = GetProductData && GetProductData.product;
    const mappingData = GetProductModuleMapping && GetProductModuleMapping.mapping;
    const inverterList = GetInverterList && GetInverterList.inverters;
    const optimizerList = GetOptimizerList && GetOptimizerList.optimizer;
    const partList = GetProductPartList && GetProductPartList.otherParts;
    let isAlertVisible = AlertStatus && AlertStatus.visible;
    let code = PostSubmitMapping && PostSubmitMapping.code;
    let message = PostSubmitMapping && PostSubmitMapping.message;
    return {
        Login,
        productData,
        mappingData,
        inverterList,
        optimizerList,
        partList,
        isAlertVisible,
        code,
        message
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProductData: data => {
            return dispatch({ type: GET_PRODUCT_DATA, data });
        },
        navigate: data => {
            return dispatch({ type: NAVIGATION, data});
        },
        getMappingData: data => {
            return dispatch({ type: GET_PRODUCT_MODULE_MAPPING, data });
        },
        getInverterList: data => {
            return dispatch({ type: GET_INVERTER_LIST, data });
        },
        getOptimizerList: data => {
            return dispatch({ type: GET_OPTIMIZER_LIST, data });
        },
        getProductPartList: data => {
            return dispatch({ type: GET_PRODUCT_PART_LIST, data });
        },
        submitMapping: data => {
            return dispatch({ type: POST_SUBMIT_MAPPING, data });
        },
        setAlertStatus: data => {
            return dispatch({ type: SET_ALERT_STATUS, data });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct);


