import React, { Component } from 'react';
import FloatingLabel from 'floating-label-react';
import { DropdownBox, Calendar, Button } from '../../common';
import DeliveryWarehouseComponent from  './DeliveryWarehouseComponent';
import DeliveryNewAddressComponent from './DeliveryNewAddressComponent';

class PurchaseOrderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fields: this._getInitialState(props),
          errors: {},
          showSupplierDiv: true,
          supplierContacts: [],
          warehouseData: {}
        };
    }

    _getInitialState = data => {
        const obj = {
            supplier: data && data.supplier || '',
            supplierContact: data && data.supplierContact || '',
            deliveryType: data && data.deliveryType || '',
            warehouseName: data && data.warehouseName || '',
            deliveryNotes: data && data.deliveryNotes || '',
            shipVia: data && data.shipVia || '',
            expectedDeliveryDate: data && data.expectedDeliveryDate || '',
            purchaseType: data && data.purchaseType || '',
            currency: data && data.currency || '',
            purchaseTerm: data && data.purchaseTerm || '',
            invoiceDueDate: data && data.invoiceDueDate || '',
            items: data && data.items || [],
            totalAmount: data && data.totalAmount || ''
        };
        return obj;
    }

    _onChangeSelectSupplier = value => {
      this._changeSelectValue(value, 'supplier');
      const selectedValue = value && value.value;
      let { supplierContacts, fields } = this.state;
      let indexValue = selectedValue && selectedValue.split('-');
      let id = indexValue && indexValue[1];
      const { suppliers } = this.props;

      suppliers && suppliers.map(sup => {
        if(sup.supplierId === parseInt(id)) {
          supplierContacts = sup.contacts;
        }
      });
      supplierContacts && supplierContacts.map(sup => {
        if(sup.isPrimary) {
          fields['supplierContact'] = sup.contact;
        }
      });
      this.setState({
        supplierContacts
      });
    }

    _onChangeSelectSupplierContact = value => {
      this._changeSelectValue(value, 'supplierContact');
    }

    _onChangeSelectDeliveryType = value => {
      this._changeSelectValue(value, 'deliveryType');
      const { fields } = this.state;
      if(value.label === 'Warehouse') {
        this.props.getWarehouseList();
      } else {
        fields['warehouseName'] = '';
      }
      this.setState({
        fields
      });
    }

    _onChangeSelectWarehouse = value => {
      const selectedValue = value && value.value;
      let { warehouseData } = this.state;
      const { warehouses } = this.props;
      let indexValue = selectedValue && selectedValue.split('-');
      let id = indexValue && indexValue[1];
      warehouses && warehouses.map(warehouse => {
        if(warehouse.warehouseId === parseInt(id)) {
          warehouseData = warehouse;
        }
      });
      this._changeSelectValue(value, 'warehouseName');
      this.setState({
        warehouseData
      });
    }

    _onChangeSelectShipVia = value => {
      this._changeSelectValue(value, 'shipVia');
    }

    _onChangeSelectPurchaseType = value => {
      this._changeSelectValue(value, 'purchaseType');
    }

    _onChangeSelectCurrency = value => {
      this._changeSelectValue(value, 'currency');
    }

    _onChangeSelectPurchaseTerm = value => {
      this._changeSelectValue(value, 'purchaseTerm');
    }

    _changeSelectValue = (value, fieldName) => {
      const { fields } = this.state;
      const  selectedValue = value;
      fields[fieldName] = selectedValue.value;
      this.setState({
        fields
      });
    }
    
    render() {
        const { showSupplierDiv, supplierContacts, warehouseData } = this.state;
        const { staticData, suppliers, warehouses } = this.props;
        const deliveryTypeList = staticData && staticData.deliveryType;
        const shipViaList = staticData && staticData.shipVia;
        const purchaseTypeList = staticData && staticData.purchaseType;
        const purchaseTermList = staticData && staticData.purchaseTerm;
        const currencyList = staticData && staticData.currency;

        const supplierList = suppliers && suppliers.map(supplier => {
          return {
            label: supplier.supplierName,
            value: `${supplier.supplierName}-${supplier.supplierId}`
          };
        });
        const supplierContactList = supplierContacts && supplierContacts.map(supplierContact => {
          return {
            label: supplierContact.contact,
            value: supplierContact.contact
          };
        });
        const warehousesList = warehouses && warehouses.map(warehouse => {
          return {
            label: warehouse.warehouseName,
            value: `${warehouse.warehouseName}-${warehouse.warehouseId}`
          };
        });
        const { supplier, supplierContact, deliveryType, shipVia, purchaseType, currency, purchaseTerm, warehouseName  } = this.state.fields;
        return (
            <div className="container">
                <div className="main-section">
                    <div className="wrapper-supplier-details">
                      <a href="#" className="sub" tabindex="2" onClick={ this._onClickShowOtherPriceDiv } ><i className={ (showSupplierDiv && 'po-arrow-down' || ! showSupplierDiv && 'po-arrow-right') } /></a>
                      <p className="title">Supplier Details</p>

                      <div className="row">
                        <div className="inline-div">
                            <DropdownBox 
                              placeholder="Select Supplier*"
                              name="supplier"
                              options = { supplierList ? supplierList : [] }
                              onChangeSelect= { this._onChangeSelectSupplier }
                              selectedValue={ supplier }
                            />
                        </div>
                        <div className="inline-div">
                            <DropdownBox 
                              placeholder="Select Contact*"
                              name="supplierContact"
                              options = { supplierContactList ? supplierContactList : [] }
                              onChangeSelect= { this._onChangeSelectSupplierContact }
                              selectedValue={ supplierContact }
                            />
                        </div>
                      </div>
                    </div>

                    <div className="wrapper-delivery-details">
                    <a href="#" className="sub" tabindex="2" onClick={ this._onClickShowOtherPriceDiv } ><i className={ (showSupplierDiv && 'po-arrow-down' || ! showSupplierDiv && 'po-arrow-right') } /></a>
                    <p className="title">Delivery Details</p>
                        <div className="row">
                            <div className="inline-div">
                              <DropdownBox 
                                placeholder="Delivery Type*"
                                name="deliveryType"
                                options = { deliveryTypeList ? deliveryTypeList : [] }
                                onChangeSelect= { this._onChangeSelectDeliveryType }
                                selectedValue={ deliveryType }
                              />
                            </div>
                            {
                              deliveryType === 'Warehouse' ? <div className="inline-div">
                                <DropdownBox 
                                  placeholder="Warehouse Name*"
                                  name="warehouseName"
                                  options = { warehousesList ? warehousesList : [] }
                                  onChangeSelect= { this._onChangeSelectWarehouse }
                                  selectedValue={ warehouseName }
                                />
                              </div> : ''
                            }
                        </div>
                        {
                          warehouseName && deliveryType === 'Warehouse' ? <DeliveryWarehouseComponent warehouseData={ warehouseData } /> : ''
                        }
                        {
                          deliveryType === 'New Address' ? <DeliveryNewAddressComponent /> : ''
                        }
                        <div className="row">
                            <span className="wrapper">
                            <FloatingLabel  
                              className="form-input" 
                              placeholder="Delivery Notes" 
                              type="text" 
                              name="deliveryNotes"
                              //value={ productName }
                              maxLength="50"
                              //onChange={ onFieldChange }
                              autoComplete="none"
                            />
                            </span>
                        </div>

                        <div className="row">
                            <div className="inline-div">
                              <DropdownBox 
                                placeholder="Ship Via*"
                                name="shipVia"
                                options = { shipViaList ? shipViaList : [] }
                                onChangeSelect= { this._onChangeSelectShipVia }
                                selectedValue={ shipVia }
                              />
                            </div>
                            <span className="wrapper">
                            <Calendar
                              //onDateChange={ onDateChange }
                              name="manufactureDate"
                             // date={ formattedManufactureDate }
                              placeholder="Expected Delivery Date"
                            />
                            </span>
                        </div>
                    </div>

                    <div className="wrapper-general">
                        <a href="#" className="sub" tabindex="2" onClick={ this._onClickShowOtherPriceDiv } ><i className={ (showSupplierDiv && 'po-arrow-down' || ! showSupplierDiv && 'po-arrow-right') } /></a>
                        <p className="title">General</p>

                        <div className="row">
                            <div className="inline-div">
                              <DropdownBox 
                                placeholder="Purchase Type*"
                                name="purchaseType"
                                options = { purchaseTypeList ? purchaseTypeList : [] }
                                onChangeSelect= { this._onChangeSelectPurchaseType }
                                selectedValue={ purchaseType }
                              />
                            </div>
                            <div className="inline-div">
                              <DropdownBox 
                                placeholder="Currency*"
                                name="currency"
                                options = { currencyList ? currencyList : [] }
                                onChangeSelect= { this._onChangeSelectCurrency }
                                selectedValue={ currency }
                              />
                            </div>
                        </div>

                        <div className="row">
                            <div className="inline-div">
                              <DropdownBox 
                                placeholder="PurchaseTerm*"
                                name="purchaseTerm"
                                options = { purchaseTermList ? purchaseTermList : [] }
                                onChangeSelect= { this._onChangeSelectPurchaseTerm }
                                selectedValue={ purchaseTerm }
                              />
                            </div>
                            <span className="wrapper">
                            <Calendar
                              //onDateChange={ onDateChange }
                              name="invoiceDueDate"
                             // date={ formattedManufactureDate }
                              placeholder="Invoice Date"
                            />
                            </span>
                        </div>
                    </div>

                    <div className='btn-footer-group'>
                      <Button name='Cancel' type='button' className='btn-footer-cancel' onClick={ this._cancelForm }/>
                      <Button name='Save Draft' type='button' className='btn-footer-cancel' onClick={ this._cancelForm }/>
                      <Button name='Submit' type='button' className='btn-footer-submit' onClick={ this._submitForm } />
                   </div>
                </div>
            </div>
        );
    }
}

export default PurchaseOrderComponent;
