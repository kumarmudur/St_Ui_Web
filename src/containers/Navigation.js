import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { USER_MANAGEMENT, PAGE_TITLES } from '../constants';
import { INVENTORY_MANAGEMENT } from '../constants/inventoryManagement';
import { PURCHASE_PLAN } from '../constants/purchasePlan';
import { CUSTOMER_PROPOSAL } from '../constants/customerProposal';

import LogoImage from '../components/common/LogoImage';
import '../styles/index.scss';
import { NAVIGATION, GET_VIEW_USERS, POST_EXPORT_USERS } from '../actions';
import { POST_EXPORT_INVENTORY } from '../actions/inventoryManagement';

import { ICONS } from '../constants';

import TopNavbar from '../components/UserManagement/TopNavbar';

import SearchUsers from '../containers/UserManagement/SearchUsers';
import SearchRoles from '../containers/UserManagement/SearchRoles';
import ViewUsers from '../containers/UserManagement/ViewUsers';
import AddUser from '../containers/UserManagement/AddUser';
import UserDetail from '../containers/UserManagement/UserDetail';
import Organization from '../containers/UserManagement/Organization';
import AddBulkImport from '../containers/UserManagement/AddBulkImport';
import ViewUsersBulkImport from '../containers/UserManagement/ViewUsersBulkImport';
import AddRole from '../containers/UserManagement/AddRole';
import ViewRole from '../containers/UserManagement/ViewRoles';
import downloadFile from '../utils/downloadFile';


//ProposalManagement
import ViewProposals from '../containers/ProposalManagement/ViewProposals';
import ProposalDetail from '../containers/ProposalManagement/ProposalDetail';
import SearchProposals from '../containers/ProposalManagement/SearchProposals';

//import CreateProposal from '../containers/ProposalManagement/CreateProposal';

//inventory module
import ManageProducts from './InventoryManagement/Product/ManageProducts';
import SearchProducts from './InventoryManagement/Product/SearchProducts';
import Product from './InventoryManagement/Product/Product';
import ViewProduct from './InventoryManagement/Product/ViewProduct';

import ManageWarehouse from './InventoryManagement/Warehouse/ManageWarehouse';
import SearchWarehouse from './InventoryManagement/Warehouse/SearchWarehouse';
import Warehouse from './InventoryManagement/Warehouse/Warehouse';
import ViewWarehouse from './InventoryManagement/Warehouse/ViewWarehouse';

import ManageSupplier from './InventoryManagement/Supplier/ManageSupplier';
import SearchSupplier from './InventoryManagement/Supplier/SearchSupplier';
import Supplier from './InventoryManagement/Supplier/Supplier';
import ViewSupplier from './InventoryManagement/Supplier/ViewSupplier';

import ManagePurchaseOrder from './InventoryManagement/PurchaseOrder/ManagePurchaseOrder';
import SearchPurchaseOrder from './InventoryManagement/PurchaseOrder/SearchPurchaseOrder';
import PurchaseOrder from './InventoryManagement/PurchaseOrder/PurchaseOrder';

import ManageConfigurationFields from './InventoryManagement/ConfigurationFields/ManageConfigurationFields';

// profile screen
import ViewProfile from './Profile/ViewProfile';
import EditProfile from './Profile/EditProfile';
import ChangePassword from './Profile/ChangePassword';

// purchase plan module
import ManagePurchasePlan from './PurchasePlan/ManagePurchasePlan';
import SearchPurchasePlan from './PurchasePlan/SearchPurchasePlan';
import PurchasePlan from './PurchasePlan/PurchasePlan';
import ViewPurchasePlan from './PurchasePlan/ViewPurchasePlan';
import ManagePlanConfig from './PurchasePlan/ManagePlanConfig';


class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ExportUsers: null,
            ExportInventory: null,
            //enableDownload: false,
            showUserMenu: true,
            showInventoryMenu: false,
            showPurchasePlanMenu: false,
            showCustomerProposalMenu: false,
            searchParams: '',
            clearSearch: false,
            showUserMenuActiveClass: true,
            showInventoryMenuActiveClass: false,
            showPlanMenuActiveClass: false,
            showCPMenuActiveClass: false,
            downloadUser: false,
            downloadInventory: false,
        };
        this._getRedirectViewUsers();
        this.contentDownload = true;

    }
    componentWillReceiveProps(nextProps) {
      if(nextProps && this.contentDownload === true) {
        const { ExportUsers, ExportInventory } = nextProps;
        this.setState({
          ExportUsers, ExportInventory
        });
      } 

    }

    _setStateClearSearch = isClearSearch => {
        this.setState({
            clearSearch: isClearSearch
        });
    }
    _getRedirectViewUsers = () => {
        this.props.navigate({ currentPage: 'VIEW_USERS' });
    }

    manageTopNavigation = name => {
        this._setStateClearSearch(true);
        this.props.navigate({ currentPage: name  });
    }

    manageNavigation = e => {
        this._setStateClearSearch(true);
        this.props.navigate({ currentPage: e.currentTarget.name  });
    }

    _search = (searchIn, data) => {
        this.props.navigate({ currentPage: searchIn, searchParams: data  });
        this._setStateClearSearch(false);
    }
    
    _export = mod => {
      const { authToken } = this.props.Login;
      let { downloadUser, downloadInventory } = this.state;
      if(mod === 'SEARCH_USERS') {
        const { usersData } = this.props;
        this.props.exportUsersfn(usersData);
        downloadUser = true;
        downloadInventory = false;
        this.contentDownload = true;
      } else if(mod === 'SEARCH_PRODUCTS') { 
        const { products } = this.props;
        this.props.exportInventoryfn({ authToken, payload: products });
        downloadUser = false;
        downloadInventory = true;
        this.contentDownload = true;
      } else if(mod === 'SEARCH_WAREHOUSE') { 
        const { warehouses } = this.props;
        this.props.exportInventoryfn({ authToken, payload: warehouses });
        downloadUser = false;
        downloadInventory = true;
        this.contentDownload = true;
      } else if(mod === 'SEARCH_SUPPLIER') { 
        const { suppliers } = this.props;
        this.props.exportInventoryfn({ authToken, payload: suppliers });
        downloadUser = false;
        downloadInventory = true;
        this.contentDownload = true;
      } else if(mod === 'SEARCH_PURCHASE_PLAN') { 
        const { purchasePlans } = this.props;
        this.props.exportInventoryfn({ authToken, payload: purchasePlans });
        downloadUser = false;
        downloadInventory = true;
        this.contentDownload = true;
      } 

      this.setState({
       // enableDownload: true,
        downloadUser,
        downloadInventory
      });
    }


    _fileDownload = url => {
        
        if(url) { 
            downloadFile(url);
        }
        this.setState({
            ExportUsers: null,
            ExportInventory: null,
            //enableDownload: false,
            downloadUser: false,
            downloadInventory: false
        });
        this.contentDownload = false;
    }

    _showToggleMenu = e => {
        let { showUserMenu, showInventoryMenu, showPurchasePlanMenu, showCustomerProposalMenu,
              showUserMenuActiveClass, showInventoryMenuActiveClass, showPlanMenuActiveClass, showCPMenuActiveClass } = this.state;
        let menusObject = {
            showUserMenu: true,
            showInventoryMenu: false,
            showPurchasePlanMenu: false,
            showCustomerProposalMenu: false,
            showUserMenuActiveClass: true,  
            showInventoryMenuActiveClass: false,
            showPlanMenuActiveClass: false,
            showCPMenuActiveClass: false
        };
        switch(e.currentTarget.title){
            case 'User Management': ({...menusObject } = { 
                showUserMenu: !showUserMenu, showInventoryMenu: false, showPurchasePlanMenu: false, showCustomerProposalMenu: false,
                showUserMenuActiveClass: !showUserMenuActiveClass, showInventoryMenuActiveClass: false, showPlanMenuActiveClass: false, showCPMenuActiveClass: false
            });
            break;
            case 'Manage Inventory': ({...menusObject } = { 
                showUserMenu: false, showInventoryMenu: !showInventoryMenu, showPurchasePlanMenu: false, showCustomerProposalMenu: false,
                showUserMenuActiveClass:false, showInventoryMenuActiveClass: !showInventoryMenuActiveClass, showPlanMenuActiveClass: false, showCPMenuActiveClass: false

            });
            break;
            case 'Purchase Plan': ({ ...menusObject } = {
                showUserMenu: false, showInventoryMenu: false, showPurchasePlanMenu: !showPurchasePlanMenu, showCustomerProposalMenu: false,
                showUserMenuActiveClass: false, showInventoryMenuActiveClass: false, showPlanMenuActiveClass: !showPlanMenuActiveClass, showCPMenuActiveClass: false
            });
            break;
            case 'Customer Proposal': ({ ...menusObject } = {
              showUserMenu: false, showInventoryMenu: false, showPurchasePlanMenu: false, showCustomerProposalMenu: !showCustomerProposalMenu,
              showUserMenuActiveClass: false, showInventoryMenuActiveClass: false, showPlanMenuActiveClass: false, showCPMenuActiveClass: !showCPMenuActiveClass

            });
            break;
         }
        this.setState(
            menusObject
        );
    }

    render () {
        //const ROLE = 'ADMIN';
        const { navigateTo, id, searchParams, exportData } = this.props;
        let { showUserMenu, showInventoryMenu, showPurchasePlanMenu, showCustomerProposalMenu, clearSearch, ExportUsers, ExportInventory, 
            showUserMenuActiveClass, showInventoryMenuActiveClass, showPlanMenuActiveClass, showCPMenuActiveClass, downloadUser, downloadInventory } = this.state;      

        if(ExportUsers && ExportUsers.filePath && downloadUser === true && this.contentDownload === true) {
            this._fileDownload(ExportUsers.filePath);
        } else if (ExportInventory && ExportInventory.filePath && downloadInventory === true && this.contentDownload === true) {
          this._fileDownload(ExportInventory.filePath);
        }

        return (
            <div className="navigation">
                <div className="top-navbar">
                    <TopNavbar
                      currentFeature = { navigateTo }
                      navbarTitle={ PAGE_TITLES[navigateTo] || '' }
                      clickHandler = { this.manageTopNavigation }
                      search = { this._search }
                      export = { this._export }
                      navigate = { this.manageTopNavigation }
                      clearSearch={ clearSearch }
                    />
                </div>
                <div className="left-navbar">
                    <div className='nav-menu-logo'>
                        <LogoImage className="navigationLogo"/>
                    </div>
                    <div class="sidebar">
                        <div className="subsidebar">      
                            <div className="subsidebar-content">
                                <ul id="nav">
                                    <li id="first-menu">
                                        <a href="#" className="sub" tabindex="1" onClick={ this._showToggleMenu } title='User Management' className={ (showUserMenuActiveClass && 'active-module' || !showUserMenuActiveClass && 'inactive-module' ) }><img src={ ICONS.USERMANAGEMENT } />User Management<i className={ (showUserMenu && 'arrow-up' || !showUserMenu && 'arrow-down') } /></a>
                                        <ul id="submenu1" className={ (showUserMenu && 'side-menu-visible' || !showUserMenu && 'side-menu-hidden') }>
                                            {/* <li className="first-menu-item"> */}
                                            <li>
                                                <img src={ ICONS.USERMENUICON } alt="" /><NavLink to="#view-users" name={ `${ USER_MANAGEMENT.VIEW_USERS.NAME}` } onClick={ this.manageNavigation }>{ USER_MANAGEMENT.VIEW_USERS.LABEL } </NavLink>
                                            </li>    
                                            <li>                                            
                                                <img src={ ICONS.USERMENUICON } alt="" /><NavLink to="#add-bulkimport" name={ `${ USER_MANAGEMENT.VIEW_BULK_IMPORT.NAME}` } onClick={ this.manageNavigation }>{ USER_MANAGEMENT.VIEW_BULK_IMPORT.LABEL }</NavLink>
                                            </li>
                                            {/* <li>
                                                <img src={ ICONS.USERMENUICON } alt="" /><NavLink to="#view-bulkimport" name="BULK_IMPORT" onClick={ this.manageNavigation }>Bulk Import</NavLink>
                                            </li>     */}
                                
                                            {/* <li>
                                                <img src={ ICONS.USERMENUICON } alt="" /><NavLink to="#manage-role" name='MANAGE_ROLE' onClick={ this.manageNavigation }>Manage Role</NavLink>
                                            </li>    */}
                                            {/* <li className='no-border-bottom'>    
                                              <img src={ ICONS.USERMENUICON } alt="" /><NavLink to="#" name='ORGANIZATION_TREE' onClick={ this.manageNavigation }>Manage Organization Tree</NavLink>
                                            </li> */}
                                        </ul>
		                            </li>
                                <li>
                                    <a href="#" className="sub" tabindex="2" onClick={ this._showToggleMenu } title='Manage Inventory' className={ (showInventoryMenuActiveClass && 'active-module' || !showInventoryMenuActiveClass && 'inactive-module' ) }><img src={ ICONS.INVENTORY } />Manage Inventory<i className={ (showInventoryMenu && 'arrow-up' || !showInventoryMenu && 'arrow-down') } /></a>
                                    <ul id="submenu2" className={ (showInventoryMenu && 'side-menu-visible' || !showInventoryMenu && 'side-menu-hidden') }>
                                        <li className="first-menu-item">
                                            <img src={ ICONS.USERMENUICON } alt="manage_product" /><NavLink to="#manage_products" name={ `${INVENTORY_MANAGEMENT.MANAGE_PRODUCTS.NAME}` } onClick={ this.manageNavigation }>Manage Products </NavLink>
                                        </li>
                                        <li>                                            
                                            <img src={ ICONS.USERMENUICON } alt="manage_warehouse" /><NavLink to="#manage_warehouse" name={ `${INVENTORY_MANAGEMENT.MANAGE_WAREHOUSE.NAME}` } onClick={ this.manageNavigation }>Manage Warehouse </NavLink>
                                        </li>
                                        <li>
                                            <img src={ ICONS.USERMENUICON } alt="manage_supplier" /><NavLink to="#manage_supplier" name={ `${INVENTORY_MANAGEMENT.MANAGE_SUPPLIER.NAME}` } onClick={ this.manageNavigation } >Manage Supplier </NavLink>
                                        </li>    
                                        <li>
                                            <img src={ ICONS.USERMENUICON } alt="manage_purchase_order" /><NavLink to="#manage_purchase_order" name={ `${INVENTORY_MANAGEMENT.MANAGE_PURCHASE_ORDER.NAME}` } onClick={ this.manageNavigation } >Manage PO </NavLink>
                                        </li>   
                                        <li className='no-border-bottom'>
                                            <img src={ ICONS.USERMENUICON } alt="manage_configuration_fields" /><NavLink to="#manage_configuration_fields" name={ `${INVENTORY_MANAGEMENT.MANAGE_CONFIGURATION_FIELDS.NAME}` } onClick={ this.manageNavigation } >Manage Configuration </NavLink>
                                        </li>  
                                    </ul>
                              </li>
                              <li>
                                  <a href="#" className="sub" tabindex="2" onClick={ this._showToggleMenu } title='Purchase Plan' className={ (showPlanMenuActiveClass && 'active-module' || !showPlanMenuActiveClass && 'inactive-module' ) }><img src={ ICONS.PLAN } />Purchase Plan<i className={ (showPurchasePlanMenu && 'arrow-up' || !showPurchasePlanMenu && 'arrow-down') } /></a>
                                  <ul id="submenu2" className={ (showPurchasePlanMenu && 'side-menu-visible' || !showPurchasePlanMenu && 'side-menu-hidden') }>
                                      <li className='no-border-bottom first-menu-item'>
                                          <img src={ ICONS.USERMENUICON } alt="" /><NavLink to="#manage_purchase_plan" name={ `${PURCHASE_PLAN.MANAGE_PURCHASE_PLAN.NAME}` } onClick={ this.manageNavigation }>Manage Purchase Plan </NavLink>
                                      </li>   
                                  </ul>
		                          </li>
                              <li>
                                  <a href="#" className="sub" tabindex="2" onClick={ this._showToggleMenu } title='Customer Proposal' className={ (showCPMenuActiveClass && 'active-module' || !showCPMenuActiveClass && 'inactive-module' ) }><img src={ ICONS.PROPOSAL } />Customer Proposal<i className={ (showCustomerProposalMenu && 'arrow-up' || !showCustomerProposalMenu && 'arrow-down') } /></a>
                                  <ul id="submenu2" className={ (showCustomerProposalMenu && 'side-menu-visible' || !showCustomerProposalMenu && 'side-menu-hidden') }>
                                      <li className='no-border-bottom first-menu-item'>
                                          <img src={ ICONS.USERMENUICON } alt="" /><NavLink to="#manage_customer_proposal" name={ `${CUSTOMER_PROPOSAL.MANAGE_CUSTOMER_PROPOSAL.NAME}` } onClick={ this.manageNavigation }>Manage Proposal </NavLink>
                                      </li>
                                      {/* <li>
                                          <img src={ ICONS.USERMENUICON } alt="" /><NavLink to="#create_customer_proposal" name={ `${CUSTOMER_PROPOSAL.CREATE_CUSTOMER_PROPOSAL.NAME}` } onClick={ this.manageNavigation }>Create Proposal </NavLink>
                                      </li>
                                      <li>
                                          <img src={ ICONS.USERMENUICON } alt="" /><NavLink to="#associate_proposal_config" name={ `${CUSTOMER_PROPOSAL.ASSOCIATE_PROPOSAL_CONFIG.NAME}` } onClick={ this.manageNavigation }>Associate Proposal Config</NavLink>
                                      </li>
                                      <li>
                                          <img src={ ICONS.USERMENUICON } alt="" /><NavLink to="#customer_proposal_config" name={ `${CUSTOMER_PROPOSAL.CUSTOMER_PROPOSAL_CONFIG.NAME}` } onClick={ this.manageNavigation }>Customer Proposal Config</NavLink>
                                      </li>  */}  
                                  </ul>
		                          </li>
	                            </ul>    
                            </div>
                        </div>
                    </div>
                </div>

                <div className="centre-div">
                     { /* USER MANAGEMENT MODULE*/ }
                    
                    { navigateTo === 'SEARCH_USERS' ? <SearchUsers searchParams={ searchParams } /> : '' }
                    { navigateTo === 'SEARCH_ROLES' ? <SearchRoles searchParams={ searchParams } /> : '' }
                    { !navigateTo || navigateTo === 'VIEW_USERS' ? <ViewUsers exportData={ exportData } /> : '' }
                    { navigateTo === 'ADD_USER' ? <AddUser/> : ''  }
                    { navigateTo === 'USER_DETAILS' ? <UserDetail id={ id } /> : ''}
                    { navigateTo === 'EDIT_USER' ? <AddUser id={ id } page="edit_mode" /> : ''}
                    { navigateTo === 'ORGANIZATION_TREE' ? <Organization /> : '' }
                    { navigateTo === 'BULK_IMPORT' ? <AddBulkImport />: ''}
                    { navigateTo === 'ADD_ROLE' ? <AddRole /> : ''}
                    { navigateTo === 'VIEW_BULK_IMPORT' ? <ViewUsersBulkImport /> : ''}
                    { navigateTo === 'MANAGE_ROLE' ? <ViewRole /> : '' }
                    { navigateTo === 'EDIT_ROLE' ? <AddRole id={ id }/> : '' }
                    { navigateTo === 'PROFILE' ? <ViewProfile /> : ''}
                    { navigateTo === 'EDIT_PROFILE' ? <EditProfile /> : ''}
                    { navigateTo === 'CHANGE_PASSWORD' ? <ChangePassword /> : ''}

                    { /* INVENTORY MODULE*/ }
                    { navigateTo === 'MANAGE_PRODUCTS' ? <ManageProducts exportData={ exportData } /> : '' }
                    { navigateTo === 'SEARCH_PRODUCTS' ? <SearchProducts searchParams={ searchParams } /> : '' }
                    { navigateTo === 'ADD_PRODUCT' ? <Product /> : '' }
                    { navigateTo === 'EDIT_PRODUCT' ? <Product id={ id } page="edit_mode" /> : '' }
                    { navigateTo === 'MANAGE_WAREHOUSE' ? <ManageWarehouse /> : '' }
                    { navigateTo === 'SEARCH_WAREHOUSE' ? <SearchWarehouse searchParams={ searchParams } /> : '' }
                    { navigateTo === 'MANAGE_SUPPLIER' ? <ManageSupplier /> : '' }
                    { navigateTo === 'SEARCH_SUPPLIER' ? <SearchSupplier searchParams={ searchParams } /> : '' }
                    { navigateTo === 'ADD_WAREHOUSE' ? <Warehouse /> : '' }
                    { navigateTo === 'EDIT_WAREHOUSE' ? <Warehouse id={ id } /> : '' }
                    { navigateTo === 'MANAGE_PURCHASE_ORDER' ? <ManagePurchaseOrder /> : '' }
                    { navigateTo === 'SEARCH_PURCHASE_ORDER' ? <SearchPurchaseOrder searchParams={ searchParams } /> : '' }
                    { navigateTo === 'VIEW_WAREHOUSE' ? <ViewWarehouse id={ id } /> : '' }
                    { navigateTo === 'ADD_SUPPLIER' ? <Supplier /> : '' }
                    { navigateTo === 'EDIT_SUPPLIER' ? <Supplier id={ id }/> : '' }
                    { navigateTo === 'VIEW_SUPPLIER' ? <ViewSupplier id={ id }/> : '' }
                    { navigateTo === 'ADD_PURCHASE_ORDER' ? <PurchaseOrder /> : '' }
                    { navigateTo === 'VIEW_PRODUCT' ? <ViewProduct id={ id } /> : ''}
                    { navigateTo === 'MANAGE_CONFIGURATION_FIELDS' ? <ManageConfigurationFields /> : '' }
                    
                    { /* PURCHASE PLAN MODULE*/ }
                    { navigateTo === 'MANAGE_PURCHASE_PLAN' ? <ManagePurchasePlan /> : '' }
                    { navigateTo === 'SEARCH_PURCHASE_PLAN' ? <SearchPurchasePlan searchParams={ searchParams } /> : '' }
                    { navigateTo === 'ADD_PURCHASE_PLAN' ? <PurchasePlan /> : '' }
                    { navigateTo === 'EDIT_PURCHASE_PLAN' ? <PurchasePlan id={ id } page="edit_mode" /> : '' }
                    { navigateTo === 'VIEW_PURCHASE_PLAN' ? <ViewPurchasePlan id={ id } /> : '' } 
                    { navigateTo === 'MANAGE_PLAN_CONFIGURATION' ? <ManagePlanConfig /> : '' }   

                    { /* CUSTOMER PURPOSAL MODULE*/ }
                    { navigateTo === 'SEARCH_CUSTOMER_PROPOSAL' ? <SearchProposals searchParams={ searchParams } /> : '' }
                    { navigateTo === 'MANAGE_CUSTOMER_PROPOSAL' ? <ViewProposals exportData={ exportData } /> : '' }
                    { navigateTo === 'PROPOSAL_DETAILS' ? <ProposalDetail id={ id } /> : ''}
                    { navigateTo === 'ASSOCIATE_PROPOSAL_CONFIG' ? <ViewProposals exportData={ exportData } /> : '' }
                    
                    {/* { navigateTo === 'CREATE_CUSTOMER_PROPOSAL' ? <CreateProposal /> : ''  }
                    { navigateTo === 'CUSTOMER_PROPOSAL_CONFIG' ? <CreateProposal /> : ''  } */}

                    

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { Navigation, ViewUsers, Login, ExportUsers, ExportInventory, GetProductList, GetSupplierList, GetWarehouseList, GetPurchasePlanList } = state;
    const data = ViewUsers.users;
    const products = GetProductList && GetProductList.products;
    const suppliers = GetSupplierList && GetSupplierList.suppliers;
    const warehouses = GetWarehouseList && GetWarehouseList.warehouses;
    const purchasePlans = GetPurchasePlanList && GetPurchasePlanList.purchasePlans;

    return {
        navigateTo: Navigation ? Navigation.currentPage : null,
        id: Navigation ? Navigation.id : null,
        searchParams: Navigation.searchParams,
        exportData: Navigation.exportData || false,
        usersData: data,
        Login,
        ExportUsers,
        products,
        suppliers,
        warehouses,
        purchasePlans,
        ExportInventory
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        navigate: data => {
            return dispatch({ type: NAVIGATION, data });
        },
        exportUsersfn: data => {
            return dispatch({ type: POST_EXPORT_USERS, data });
        },
        exportInventoryfn: data => {
          return dispatch({ type: POST_EXPORT_INVENTORY, data });
      },
        viewUsers: (data) => {
            return dispatch({ type: GET_VIEW_USERS, data });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);