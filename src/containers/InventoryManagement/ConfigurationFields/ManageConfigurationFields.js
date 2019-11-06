import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NAVIGATION } from '../../../actions';
import ManageOtherPriceComponent from '../../../components/InventoryManagement/ConfigurationFields/ManageOtherPriceComponent';
import OtherPriceComponent from '../../../components/InventoryManagement/ConfigurationFields/OtherPriceComponent';
import { POST_ADD_CONFIGURATION_FIELDS, GET_OTHER_PRICE_CONFIG_FIELDS, POST_EDIT_CONFIG_FIELDS, GET_CONFIG_FIELDS_LIST, POST_DELETE_CONFIG_FIELDS, POST_SEARCH_CONFIG_FIELDS } from '../../../actions/inventoryManagement';
import { PAGE_SIZE_DEFAULT, DELETE_CONFIRM_MSG } from '../../../constants';
import { Modal } from '../../../components/common';

class ManageConfigurationFields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showOtherPrice: true,
            isSearch: false,
            showDeleteModal: false
        };
        this._getConfigFieldsListData(
            {
                pageNumber: 0,
                pageSize: PAGE_SIZE_DEFAULT
            }
         );
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    _getConfigFieldsListData = data => {
        const { authToken } = this.props.Login;
        data.authToken = authToken;
        this.props.getConfigFieldsList(data);
    }

    _getOtherPriceConfigFieldsData = id => {
        const { authToken } = this.props.Login;
        this.props.getOtherPriceConfigFieldsData({ id, authToken });
        this._onClickAddOtherPrice();
    }


    _onClickAddOtherPrice = isShow => {
        this.setState({
            showOtherPrice: isShow
        });
    }

    _submitOtherPriceForm = data => {
        const { Login, configId, otherPriceData } = this.props;
        const { authToken } = Login;
        const id = configId;
        if(configId) {
            data = {
                category: data.category,
                configurationId: otherPriceData && otherPriceData.configurationId,
                subCategories: data.subCategories,
                createdBy: otherPriceData && otherPriceData.createdBy,
                status: otherPriceData && otherPriceData.status,
                createdDateTime: otherPriceData && otherPriceData.createdDateTime,
                updatedDateTime: otherPriceData && otherPriceData.updatedDateTime
            };
            const dataObj = {
              authToken,
              id,
              data
            };
            this.props.submitForm(POST_EDIT_CONFIG_FIELDS, dataObj);
        } else {
            const dataObj = {
                authToken,
                data
            };
            this.props.submitForm(POST_ADD_CONFIGURATION_FIELDS, dataObj);
        }
        this._onClickAddOtherPrice(true);
    }

    _deleteConfigField = id => {
        const { authToken } = this.props.Login;
        this.props.deleteConfigField({ id, authToken });
        this._toggleModal();
    }

    _postSearchConfig = textSearch => {
        let search = true;
        if(textSearch) {
            const { authToken } = this.props.Login;
            const searchParams = {
                textSearch: [ textSearch ]
            };
            this.props.postSearchConfig({ searchParams, authToken });
            search = true;
        } else {
            search = false;
            this._getConfigFieldsListData(
                {
                    pageNumber: 0,
                    pageSize: PAGE_SIZE_DEFAULT
                }
            );
        }
        this.setState({
            isSearch: search
        });
    }

    _cancelForm = () => {
       this._onClickAddOtherPrice(true);
        this._getConfigFieldsListData(
            {
                pageNumber: 0,
                pageSize: PAGE_SIZE_DEFAULT
            }
        );
    }

    _toggleModal = () => {
        this.setState({
            showDeleteModal: !this.state.showDeleteModal
        });
      }

    render() {
        const { showOtherPrice, isSearch, showDeleteModal } = this.state;
        const { otherPriceData, configId, configListData, configSearchData } = this.props;
        const configData = isSearch ? configSearchData : configListData;
        const modalBody = DELETE_CONFIRM_MSG;
        const buttonMeta = [
              {
                  name: 'Cancel',
                  class: 'btn-cancel',
                  onclick: this._toggleModal
              },
              {
                  name: 'Ok',
                  class: 'btn-delete',
                  onclick: this._deleteConfigField
              }
        ];
        return (
            <div className="container">
                 <div className="wrapper-custom-price">
                    <p className="other-price-title">Other Price</p>
                    {
                        showOtherPrice ? 
                         <Fragment>
                           <ManageOtherPriceComponent 
                             onClickAddOtherPrice={ this._onClickAddOtherPrice } 
                             configListData={ configData }
                             getOtherPriceConfigFieldsData={ this._getOtherPriceConfigFieldsData }
                             deleteConfigField={ this._toggleModal }
                             postSearchConfig={ this._postSearchConfig }
                           />
                           <Modal 
                             title="Confirmation" 
                             isShowModal={ showDeleteModal }
                             closeModal={ this._toggleModal }
                             modalBody={ modalBody }   
                             buttons={ buttonMeta }
                            />
                         </Fragment>  : 
                         <OtherPriceComponent 
                           id ={ configId }
                           submitOtherPriceForm={ this._submitOtherPriceForm }
                           otherPriceData={ otherPriceData }
                           cancelForm = { this._cancelForm }
                         />
                    }
                </div>      
           </div>
        );
    }
}

const mapStateToProps = state => {
    const { Login, GetOtherPriceConfigFields, GetConfigFieldsList, PostSearchConfigFields } = state;
    const otherPriceData = GetOtherPriceConfigFields && GetOtherPriceConfigFields.configuration;
    const configId = GetOtherPriceConfigFields && GetOtherPriceConfigFields.configuration && GetOtherPriceConfigFields.configuration.configurationId;
    const configListData = GetConfigFieldsList && GetConfigFieldsList.configurations;
    const configSearchData = PostSearchConfigFields && PostSearchConfigFields.configurations;
    return {
        Login,
        otherPriceData,
        configListData,
        configId,
        configSearchData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: data => {
            return dispatch({ type: NAVIGATION, data});
        },
        submitForm: (type, data) => {
            return dispatch({ type, data });
        },
        getOtherPriceConfigFieldsData: data => {
            return dispatch({ type: GET_OTHER_PRICE_CONFIG_FIELDS, data });
        },
        getConfigFieldsList: data => {
            return dispatch({ type: GET_CONFIG_FIELDS_LIST, data});
        },
        deleteConfigField: data => {
            return dispatch({ type: POST_DELETE_CONFIG_FIELDS, data});
        },
        postSearchConfig: data => {
            return dispatch({ type: POST_SEARCH_CONFIG_FIELDS, data});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageConfigurationFields);
