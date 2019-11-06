import React, { Component } from 'react';
import { Button } from '../../common';
import { PRODUCT_SPECIFICATION } from '../../../constants';
import { productValidation, assemblyValidation } from '../../../utils/InventoryManagement/validations';
import ProductGeneralComponent from './ProductGeneralComponent';
import ProductSpecificationComponent from './ProductSpecificationComponent';
import ProductStockComponent from './ProductStockComponent';
import ProductPriceComponent from './ProductPriceComponent';
import ProductEntryComponent from './ProductEntryComponent';
import ProductOtherPriceComponent from './ProductOtherPriceComponent';
import ProductAssemblyComponent from './ProductAssemblyComponent';
import ProductPartsComponent from './ProductPartsComponent';
import ProductAssemblyPriceComponent from './ProductAssemblyPriceComponent';
//import ProductTierPriceComponent from './ProductTierPriceComponent'; // to do next page 2
import { checkAlphanumeric, checkNumeric, setDateFormat } from '../../../utils/utility';
import { productGetInitialState, productSetInitialState, productAssemblyQuantityFieldChange, clearProductAssembly } from '../../../utils/InventoryManagement/product';

class ProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowWarranty: false,
      fields: productGetInitialState(),
      errors: {},
      checkDimension: false,
      checkWeight: false,
      checkColor: false,
      checkPower: false,
      checkDocumentUpload: false,
      listType: [],
      isAssembly: false,
      moduleResidential: 0,
      moduleCommercial: 0,
      moduleNonProfit: 0,
      moduleIndustrial: 0,
      optimizerResidential: 0,
      optimizerCommercial: 0,
      optimizerNonProfit: 0,
      optimizerIndustrial: 0,
      inverterResidential: 0,
      inverterCommercial: 0,
      inverterNonProfit: 0,
      inverterIndustrial: 0,
      partsList: [],
      subCategoryList: [],
      costList: [],
      inverters: [],
      optimizers: [],
      productPartsList: [],
      showCategoryLabel: false,
      showManufacturerLabel: false,
      showPromotionLabel: false,
      showWarrantyLabel: false,
      showSelectYearLabel: false,
      showQuantityTypeLabel: false,
      showWarehouseLabel: false,
      showAvailabilityLabel: false,
      showDateLabel: false
    };
    this.isAddImage = false;
    this.isAddFile = false;
    this.contentEdit = true;
  }

  componentWillReceiveProps(nextProps) {
    let  { showCategoryLabel, showManufacturerLabel, showPromotionLabel, showWarrantyLabel, showSelectYearLabel, showQuantityTypeLabel, 
      showWarehouseLabel, showAvailabilityLabel, showDateLabel } = this.state;
    let obj = {}; let assembly = false, inverters = [], optimizers = [], productPartsList = [], isShowWarranty = false;
    if(nextProps && nextProps.id && nextProps.productData && nextProps.page && this.contentEdit === true) {
      const {productData } = nextProps;
      obj = {
        productName: productData.productName || '',
        category: productData.category || '',
        manufacturer: productData.manufacturer || '',
        modelNumber: productData.modelNumber || '',
        manufactureDate: productData.manufactureDate || '',
        promotion: productData.promotion || '',
        status: productData.status || '',
        power: productData.power || '',
        description: productData.description || '',
        productHasWarranty: productData.productHasWarranty || '',
        warrantyType: productData.warrantyType || '',
        warrantyYear: productData.warrantyYear || '',
        warrantyExpiry: productData.warrantyExpiry || '',
        uploadImages: productData.uploadImages || [],
        specifications: productData.specifications || [],
        quantity: productData.quantity || '',
        threshold: productData.threshold || '',
        quantityType: productData.quantityType || '',
        quantityInBox: productData.quantityInBox || '',
        warehouse: productData.warehouse || '',
        stockAvailability: productData.stockAvailability || '',
        sku: productData.sku || '',

        productCost: productData.productCost || '',
        sellingPrice: productData.sellingPrice || '$',
        residential: productData.residential || '',
        commercial: productData.commercial || '',
        nonProfit: productData.nonProfit || '',
        industrial: productData.industrial || '',

        productEntries: productData.productEntries || [],

        otherPrices: productData.otherPrices || [],
        grandTotalOtherPrice: productData.grandTotalOtherPrice || '',

        assemblyWatt: productData.assemblyWatt || '',
        productParts : productData.productParts || [],
        productAssemblyModule: productData.productAssemblyModule || [],
        productAssemblyOptimizer: productData.productAssemblyOptimizer || [],
        productAssemblyInverter: productData.productAssemblyInverter || [],

        grandTotalAssemblyResidential: productData.grandTotalAssemblyResidential || 0,
        grandTotalAssemblyCommercial: productData.grandTotalAssemblyCommercial || 0,
        grandTotalAssemblyNonProfit: productData.grandTotalAssemblyNonProfit || 0,
        grandTotalAssemblyIndustrial: productData.grandTotalAssemblyIndustrial || 0,
  
        grandTotalPartsResidential: productData.grandTotalPartsResidential || 0,
        grandTotalPartsCommercial: productData.grandTotalPartsCommercial || 0,
        grandTotalPartsNonProfit: productData.grandTotalPartsNonProfit || 0,
        grandTotalPartsIndustrial: productData.grandTotalPartsIndustrial || 0,
    
        totalAssemblyResidentialPrice: productData.totalAssemblyResidentialPrice || 0,
        totalAssemblyCommercialPrice: productData.totalAssemblyCommercialPrice || 0,
        totalAssemblyNonProfitPrice: productData.totalAssemblyNonProfitPrice || 0,
        totalAssemblyIndustrialPrice: productData.totalAssemblyIndustrialPrice || 0
      };
      assembly = productData.category === 'Assembly' ? true : false;
      isShowWarranty = productData.category === 'Assembly' || productData.productHasWarranty === 'No'  ? false : true;
      showCategoryLabel = productData.category ? true : false;
      showManufacturerLabel = productData.manufacturer ? true : false;
      showPromotionLabel = productData.promotion ? true : false; 
      showWarrantyLabel = productData.warrantyType ? true : false;
      showSelectYearLabel = productData.warrantyYear ? true : false;
      showQuantityTypeLabel = productData.quantityType ? true : false; 
      showWarehouseLabel = productData.warehouse ? true : false;
      showAvailabilityLabel = productData.stockAvailability ? true : false;
      showDateLabel = productData.manufactureDate ? true : false;
    } else {
      const { fields } = this.state;
      obj = productSetInitialState(fields);
      assembly = fields.category === 'Assembly' ? true : false;
      isShowWarranty = fields.category === 'Assembly' ? false : this.state.isShowWarranty;
      showCategoryLabel = fields.category ? true : false;
      showManufacturerLabel = fields.manufacturer ? true : false;
      showPromotionLabel = fields.promotion ? true : false; 
      showWarrantyLabel = fields.warrantyType ? true : false;
      showSelectYearLabel = fields.warrantyYear ? true : false;
      showQuantityTypeLabel = fields.quantityType ? true : false; 
      showWarehouseLabel = fields.warehouse ? true : false;
      showAvailabilityLabel = fields.stockAvailability ? true : false;
      showDateLabel = fields.manufactureDate ? true : false;
    }
    if(this.isAddImage) {
      this._setImageUploadList(nextProps.imageUploadResponse);
    } else if (this.isAddFile) {
      this._setSpecificationFileUpload(nextProps.imageUploadResponse);
    }
    if(nextProps.inverters) {
      inverters = nextProps.inverters;
    }
    if(nextProps.optimizers) {
      optimizers = nextProps.optimizers;
    }
    if(nextProps.productPartsList) {  
      productPartsList = nextProps.productPartsList;
    }
    this.setState({
      fields: obj,
      isAssembly : assembly,
      isShowWarranty: isShowWarranty,
      showCategoryLabel,
      showManufacturerLabel,
      showPromotionLabel,
      showWarrantyLabel,
      showSelectYearLabel,
      showQuantityTypeLabel,
      showWarehouseLabel,
      showAvailabilityLabel,
      showDateLabel,
      inverters,
      optimizers,
      productPartsList
    });
  }

  
  _callFieldsSetState = () => {
    const { fields } = this.state;
    this.setState({
      fields
    });
  }

  _setImageUploadList = data => {
    if(data) {
      const { fields } = this.state;
      const { uploadImages} = fields;
      if(data.code === 200) {
        uploadImages.push({ 
          fileName: data.fileName,
          filePath: data.filePath
        });
      }
      fields['uploadImages'] = uploadImages;
      this._callFieldsSetState();
    }
  }

  _setSpecificationFileUpload = data => {
    if(data) {
      const { fields, fileUploadName } = this.state;
      const { specifications } = fields;
      let indexValue = fileUploadName && fileUploadName.split('-');
      let fieldName = indexValue && indexValue[0];
      let index = indexValue && indexValue[1];
      index = parseInt(index);
      specifications && specifications.map((item, i) => {
          if(i === index) {
              item[fieldName] = data && data.fileName;
              item['filePath'] = data && data.filePath;
          }
      });
      fields.specifications = specifications;
      this._callFieldsSetState();
    }
  }

  _handleChangeWarrent = e => {
    const { fields } = this.state;
    const { checked } = e.currentTarget;
    fields.productHasWarranty = checked ? 'Yes' : 'No';
    this.setState({
      fields,
      isShowWarranty: checked
    });
  }

  _submitForm = () => {
    const { isAssembly } = this.state;

    if(isAssembly) {
      let status = this._checkAssemblyValidation();
      if(status) {
        this.props.submitForm(this.state.fields); 
      }
    } else {
      let status = this._checkValidation();
      if(status) {
        this.props.submitForm(this.state.fields); 
      }
    }
  }

  _cancelForm = () => {
    this.props.cancelForm();
  }

  _checkValidation = () => {
    const { fields } = this.state;
    const formStatus = productValidation(fields);
    this.setState({
      errors: formStatus.errors,
      isFormValid: formStatus.formIsValid
    });
    return formStatus.status;
  }

  _checkAssemblyValidation = () => {
    const { fields } = this.state;
    const formStatus = assemblyValidation(fields);
    this.setState({
      errors: formStatus.errors,
      isFormValid: formStatus.formIsValid
    });
    return formStatus.status;
  }

  _onFieldChange = (value, name, type) => {
    const { fields } = this.state;
    if(value && type(value)) {
       if(type === 'checkNumeric') {
         fields[name] = parseInt(value);
       } else {
        fields[name] = value;
       }
    } else {
      if(!value) {
        fields[name] = value;
      }
    }
    this.setState({
      fields,
      errors: {}
    });
  }

  _onFieldChangeNumeric = e => {
    const { value, name } = e.currentTarget;
    this._onFieldChange(value, name, checkNumeric);
  }

  _onFieldChangeAlphaNumeric = e => {
    const { value, name } = e.target;
    this._onFieldChange(value, name, checkAlphanumeric);
  }

  _onFieldChangePrice = e => {
    const { value, name } = e.currentTarget;
    const { fields } = this.state;
    if(value && checkNumeric(value)) {
      fields[name] = parseInt(value);
    } else {
      if(!value) {
        fields[name] = value;
      }
    }
    this.setState({
      fields,
      errors: {}
    });
  }


  _onChangeSelectCategory = value => {
    this.contentEdit = false;
    this._changeSelectValue(value, 'category');
    if(value.label === 'Assembly') {
      this.props.getModuleList();
      this.props.getProductParts();
    }
    this.setState({
      showCategoryLabel: true,
      isShowWarranty: this.state.isShowWarranty
    });
  };

  _onChangeSelectManufacurer = value => {
    this._changeSelectValue(value, 'manufacturer');
    this.setState({
      showManufacturerLabel : true,
      isShowWarranty: this.state.isShowWarranty
    });
  };

  _onChangeSelectPromotion = value => {
    this._changeSelectValue(value, 'promotion');
    this.setState({
      showPromotionLabel: true,
      isShowWarranty: this.state.isShowWarranty
    });
  };

  _onChangeSelectQuantityType = value => {
    this._changeSelectValue(value, 'quantityType');
    this.setState({
      showQuantityTypeLabel: true,
      isShowWarranty: this.state.isShowWarranty
    });
  };

  _onChangeSelectStockAvailability = value => {
    this._changeSelectValue(value, 'stockAvailability');
    this.setState({
      showAvailabilityLabel: true,
      isShowWarranty: this.state.isShowWarranty
    });
  };

  _onChangeSelectWarehouse = value => {
    this._changeSelectValue(value, 'warehouse');
    this.setState({
      showWarehouseLabel: true,
      isShowWarranty: this.state.isShowWarranty
    });
  };

  _onChangeSelectPriceType = value => {
    this._changeSelectValue(value, 'sellingPrice');
  };

  _onChangeSelectWarrantyType = value => {
    this._changeSelectValue(value, 'warrantyType');
    this.setState({
      showWarrantyLabel: true,
      isShowWarranty: this.state.isShowWarranty
    });
  };

  _onChangeSelectWarrantyYear = value => {
    this._changeSelectValue(value, 'warrantyYear'); 
    this.setState({
      showSelectYearLabel: true
    });
    const { fields } = this.state;
    const { manufactureDate } = this.state.fields;   
    if(manufactureDate) {
      let currentDate = new Date(manufactureDate);
      let mm = currentDate.getMonth() + 1;
      let dd = currentDate.getDate() - 1;
      let yyyy = currentDate.getFullYear() + parseInt(value.label);
      if(dd === 0) {
        mm = mm - 1;
        dd = setDateFormat(mm, yyyy);
      }
      let dateFormat = mm + '/' + dd + '/' + yyyy;
      if(dateFormat) {
        fields['warrantyExpiry'] = dateFormat;
      }
      this._callFieldsSetState();
    }
  };

  _changeSelectValue = (value, fieldName) => {
    const  selectedValue = value;
    let isAssembly = false, isShowWarranty = false, uploadImagesList = [];
    const { fields } = this.state;
    if(selectedValue.value === 'Assembly') {
      isAssembly = true;
      isShowWarranty = false;
      uploadImagesList = [];
    } else {
      isAssembly = false;
      isShowWarranty = true;
      uploadImagesList = this.state.fields.uploadImages;
    }
    if(fieldName === 'quantityType') {
      if(selectedValue.value === 'Each') {
        fields.quantityInBox = 1;
      } else if (selectedValue.value === 'Box') {
        fields.quantityInBox = '';
      }
    }
    fields[fieldName] = selectedValue.value;
    fields.uploadImages = uploadImagesList;

    this.setState({
      fields,
      isAssembly,
      isShowWarranty,
      errors: {}
    });
  }

  _addProductEntry = () => {
    const { fields } = this.state;
    const { productEntries } = this.state.fields;
    const entries = productEntries.concat({
        serialNumber: '',
        warehouse: '',
        shelf: '',
        bin: '',
        uom: '',
        qty: ''
    });
    fields.productEntries = entries;
    this._callFieldsSetState();
  }

  _onDeleteProductEntry = e => {
    this.isAddImage = false;
    this.contentEdit = false;
    const { fields } = this.state;
    const { productEntries } = this.state.fields;
    const { id } = e.currentTarget;
    const filteredData = productEntries.filter((p, index )=> parseInt(id) !== index);
    fields.productEntries = filteredData;
    this._callFieldsSetState();
  }

  _onTextFieldChangeNumericProductEntry = e => {
    const { value, name } = e.currentTarget;
    if(value && checkNumeric(value)) {
      this._onFieldChangeProductEntry(value, name);
    } else {
      if(!value) {
        this._onFieldChangeProductEntry(value, name);
      }
    }
  }

  _onTextFieldChangeAlphanumericProductEntry = e => {
    const { value, name } = e.currentTarget;
    if(value && checkAlphanumeric(value)) {
      this._onFieldChangeProductEntry(value, name);
    } else {
      if(!value) {
        this._onFieldChangeProductEntry(value, name);
      }
    }
  }

  _onTextFieldChangeProductEntry = e => {
    const { value, name } = e.currentTarget;
    this._onFieldChangeProductEntry(value, name);
  }

  _onChangeSelectProductEntry = (value, name) => {
    const  selectedValue = value;
    this._onFieldChangeProductEntry(selectedValue.value, name);
  }

  _onFieldChangeProductEntry = (value, name) => {
    let indexValue = name && name.split('-');
    let fieldName = indexValue && indexValue[0];
    let index = indexValue && indexValue[1];
    let { fields } = this.state;
    const { productEntries } = fields;
    index = parseInt(index);
    productEntries && productEntries.map((item, i) => {
        if(i === index) {
            if(value === 'Each') {
              item['qty'] = 1;
            } else if (value === 'Box') {
              item['qty'] = '';
            }
            item[fieldName] = value;
        }
    });
    fields.productEntries = productEntries;
    this._callFieldsSetState();
  }

  _onCheckboxFieldChange = e => {
    const {name, checked } = e.currentTarget;
      this._addProductSpecification(name, checked);
    
  }

  _addSpecification = e => {
    this.isAddImage = false;
    this.contentEdit = false;
    const { name } = e.currentTarget;
    if(name) {
      this._addProductSpecification(name, true);
    }
  }

  _addProductSpecification = (name, checked) => {
    const { staticData } = this.props;
    const { fields } = this.state;
    const { specifications } = fields;
    const { colorType, dimensionType, weightType, powerType, documentType } = staticData;
    let listType = [];
    if(checked) {
      if(name === PRODUCT_SPECIFICATION.CHECKDIMENSION) {
        listType = dimensionType;
      } else if (name === PRODUCT_SPECIFICATION.CHECKWEIGHT) {
        listType = weightType;
      } else if (name === PRODUCT_SPECIFICATION.CHECKCOLOR) {
        listType = colorType;
      } else if (name === PRODUCT_SPECIFICATION.CHECKPOWER) {
        listType = powerType;
      } else if (name === PRODUCT_SPECIFICATION.CHECKDOCUMENTUPLOAD) {
        listType = documentType;
      }
      const productSpecifications = specifications && specifications.concat({
        name,
        measurementVaraible: '',
        measurementType: '',
        measurementValue: '',
        listType: listType
      });
      fields.specifications = productSpecifications;
    }
    this.setState({
      [name]: checked,
      fields
    });

  };

  _onDeleteProductSpecification = e => {
    this.contentEdit = false;
    let { fields, checkDimension, checkColor, checkWeight, checkPower, checkDocumentUpload } = this.state;
    const { specifications } = this.state.fields;
    const { id } = e.currentTarget;
    const filteredData = specifications.filter((p, index )=> parseInt(id) !== index);
   if(filteredData.length === 0) {
    checkDimension = false;
    checkColor = false;
    checkWeight = false;
    checkPower = false;
    checkDocumentUpload = false;
   }
    fields.specifications = filteredData;
    this.setState({
      checkDimension,
      checkColor,
      checkWeight,
      checkPower,
      checkDocumentUpload
    });
    this._callFieldsSetState();
  }

  _onTextFieldChangeSpecification = e => {
    this.isAddImage = false;
    this.isAddFile = false;
    this.contentEdit = false;
    const { value, name, type } = e.currentTarget;
    if(type !== 'file') {
      this._onFieldChangeProductSpecification(value, name);
    } else {
      file = null;
      let target = e.target || e.srcElement;
      let file=null;
      if (target.value.length == 0) {
          file = null;
      } else {
          file = e.target.files[0];
      }
      if(file) {
        this.isAddFile = true;
        this.props.productImageUpload(file);
        this.setState({
          fileUploadName : name
        });
      }
    }
  }

  _onChangeSelectProductSpecification = (value, name) => {
    const  selectedValue = value;
    this._onFieldChangeProductSpecification(selectedValue.value, name);
  }

  _onFieldChangeProductSpecification = (value, name) => {
    let indexValue = name && name.split('-');
    let fieldName = indexValue && indexValue[0];
    let index = indexValue && indexValue[1];
    let { fields } = this.state;
    const { specifications } = fields;
    index = parseInt(index);
    specifications && specifications.map((item, i) => {
        if(i === index) {
            item[fieldName] = value;
        }
    });
    fields.specifications = specifications;
    this._callFieldsSetState();
  } 

  _addProductOtherPrices = () => {
    this.contentEdit = false;
    const { fields } = this.state;
    const { otherPrices } = this.state.fields;
    const prices = otherPrices.concat({
        category: '',
        subCategory: '',
        unit: '',
        quantity: 1,
        cost: '',
        defaultCost: '',
        margin: '',
        totalCost: '',
        subCategoryList: [],
        unitList: [],
        configurationId: null
    });
    fields.otherPrices = prices;
    this._callFieldsSetState();
  }

  _onTextFieldChangeOtherPrice = e => {
    const { value, name } = e.currentTarget;
    if(value && checkNumeric(value)) {
      this._onFieldChangeProductOtherPrice(value, name);
    } else {
      if(!value) {
        this._onFieldChangeProductOtherPrice(value, name);
      }
    }
  }

  _onChangeSelectOtherPrice = (value, name) => {
    const { configurationsList } = this.props;
    let { fields } = this.state;
    const { otherPrices } = fields;
    let grandTotalOtherPrice = 0;
    const  selectedValue = value.value;
    let indexValue = selectedValue && selectedValue.split('-');
    let fieldName = indexValue && indexValue[0];
    let id = indexValue && indexValue[1];
    let indexName = name && name.split('-');
    let idx = indexName && indexName[1];
    let subcategories = [];
    otherPrices.map((price, index) => {
      if(index === parseInt(idx)) {
        price.category = fieldName;
        price.subCategory = '';
        price.unit = '';
        price.cost = 0;
        price.quantity = 1;
        price.margin = 0;
        price.totalCost = 0;
        configurationsList && configurationsList.map(config => {
          if(config.configurationId === parseInt(id)) {
            subcategories = config.subCategories;
            price.configurationId = config.configurationId; 
            price.subCategoryList = subcategories && subcategories.map(subCat => {
              return {
                label: subCat.subCategory,
                value: subCat.subCategory
              };
            });
          }
        });
      }
      grandTotalOtherPrice = parseFloat(grandTotalOtherPrice) + parseFloat(price.totalCost || 0);
    });
    fields.otherPrices = otherPrices;
    fields.grandTotalOtherPrice = parseFloat(grandTotalOtherPrice);
    this._callFieldsSetState();
    this._callCualateTotalAssemblyPrice();
  }

  _onChangeSelectSubCategory = (value, name) => {
    const { configurationsList } = this.props;
    let { fields } = this.state;
    const { otherPrices } = fields;
    const  selectedValue = value.label;
    let units = [];
    let indexName = name && name.split('-');
    let idx = indexName && indexName[1];
    let grandTotalOtherPrice = 0;
    otherPrices.map((price, index) => {
      if(index === parseInt(idx)) {
        price.subCategory = selectedValue;
        price.unit = '';
        price.cost = 0;
        price.quantity = 1;
        price.margin = 0;
        price.totalCost = 0;
        configurationsList && configurationsList.map(config => {
          if(config.configurationId === price.configurationId) {
            config.subCategories && config.subCategories.map(subCat => {
              if(subCat.subCategory === selectedValue) {
                units = subCat.cost;
                price.unitList = units && units.map(unit => {
                  return {
                    label: unit.unit,
                    value: `${unit.unit}-${unit.unitCost}`
                  };
                });
              }
            });
          }
        });
      }    
     grandTotalOtherPrice = parseFloat(grandTotalOtherPrice) + parseFloat(price.totalCost || 0);
    });
    fields.otherPrices = otherPrices;
    fields.grandTotalOtherPrice = parseFloat(grandTotalOtherPrice);
    this._callFieldsSetState();
    this._callCualateTotalAssemblyPrice();
  }

  _onChangeSelectUnit = (value, name) => {
    let { fields } = this.state;
    let { otherPrices } = fields;
    const  selectedValue = value.value;
    let grandTotalOtherPrice = 0;
    let indexValue = selectedValue && selectedValue.split('-');
    let unit = indexValue && indexValue[0];
    let unitCost = indexValue && indexValue[1];

    let indexName = name && name.split('-');
    let idx = indexName && indexName[1];
    otherPrices.map((price, index) => {
      if(index === parseInt(idx)) {
        price.unit = unit;
        price.cost = unitCost;
        price.defaultCost = unitCost;
        price.quantity = 1,
        price.margin = 0;
        price.totalCost = parseFloat(price.cost) * parseInt(price.quantity);
      }
      grandTotalOtherPrice = parseFloat(grandTotalOtherPrice) + parseFloat(price.totalCost || 0);
    });
    fields.otherPrices = otherPrices;
    fields.grandTotalOtherPrice = parseFloat(grandTotalOtherPrice);
    this._callFieldsSetState();
    this._callCualateTotalAssemblyPrice();
  }

  _onFieldTextChangeOtherPrice = e => {
    const { value, name } = e.currentTarget;
    let { fields } = this.state;
    let { otherPrices } = fields;
    let grandTotalOtherPrice = 0;
    let indexName = name && name.split('-');
    let indexValue = indexName && indexName[0];
    let idx = indexName && indexName[1];
    otherPrices.map((price, index) => {
      if(index === parseInt(idx)) {
        if(indexValue === 'quantity') {
          if(value) {
            price.quantity = parseInt(value);
            price.cost = parseFloat(price.defaultCost) * parseInt(value);
            price.totalCost = parseFloat(price.cost);
          } else {
            price.quantity = 0;
            price.cost = 0;
            price.margin = 0;
            price.totalCost = parseFloat(price.cost);
          }
        } else if (indexValue === 'margin') {
          let margin = '';
          if(value) {
            price.margin = parseFloat(value);
            margin = parseFloat(price.cost * value / 100);
            price.totalCost =  parseFloat(price.cost) + parseFloat(margin);
          } else {
            price.margin = 0;
            margin = 0;
            price.totalCost =  parseFloat(price.cost) + parseFloat(margin);
          }
        }
      }
      grandTotalOtherPrice = parseFloat(grandTotalOtherPrice) + parseFloat(price.totalCost || 0);
    });
    fields.otherPrices = otherPrices;
    fields.grandTotalOtherPrice = parseFloat(grandTotalOtherPrice);
    this._callFieldsSetState();
    this._callCualateTotalAssemblyPrice();
  }

  _onDeleteProductOtherPrice = e => {
    this.contentEdit = false;
    this.isAddImage = false;
    this.isAddFile = false;
    const { fields } = this.state;
    const { otherPrices, grandTotalOtherPrice } = this.state.fields;
    const { id, name } = e.currentTarget;
    const totalCost = name;
    const filteredData = otherPrices.filter((p, index )=> parseInt(id) !== index);
    fields.otherPrices = filteredData;
    let grandTotalValue = grandTotalOtherPrice - totalCost;
    fields.grandTotalOtherPrice = parseFloat(grandTotalValue);
    this._callFieldsSetState();
    this._callCualateTotalAssemblyPrice();
  }
  
  _addCustomerGroup = () => {
    const { fields } = this.state;
    const { tierPrices } = this.state.fields;
    const prices = tierPrices.concat({
        customerGroup: '',
        salesGroup: '',
        quantity: '',
        price: ''
    });
    fields.tierPrices = prices;
    this._callFieldsSetState();
  }

  _changepPoductImageUpload = file => {
    this.props.productImageUpload(file);
    this.isAddImage = true;
    this.isAddFile = false;
  }

  _onDeleteProductImage = e => {
    this.contentEdit = false;
    this.isAddImage = false;
    this.isAddFile = false;
    const { fields } = this.state;
    const { uploadImages } = this.state.fields;
    const { id } = e.currentTarget;
    const filteredData = uploadImages.filter((p, index )=> parseInt(id) !== index);
    fields.uploadImages = filteredData;
    this._callFieldsSetState();
    this.setState({
      pageType: ''
    });
  }

  // Assenlby Business Logic
  _addProductParts = () => {
    const { fields } = this.state;
    const { productParts } = this.state.fields;
    const parts = productParts.concat({
      partName: '',
      power: '',
      quantity: '',
      residential: '',
      commercial: '',
      nonProfit: '',
      industrial: ''
    });
    fields.productParts = parts;
    this._callFieldsSetState();
  }

  _onDeleteProductPart = e => {
    this.contentEdit = false;
    this.isAddImage = false;
    this.isAddFile = false;
    const { fields } = this.state;
    const { productParts } = this.state.fields;
    const { id } = e.currentTarget;
    let residentailTotal = 0, commercialTotal = 0, nonProfitTotal = 0, industrialTotal = 0;
    const filteredData = productParts.filter((p, index )=> parseInt(id) !== index);
    fields.productParts = filteredData;
    if(fields.productParts && fields.productParts.length === 0) {
      fields['grandTotalPartsResidential'] = 0;
      fields['grandTotalPartsCommercial'] = 0;
      fields['grandTotalPartsNonProfit'] = 0;
      fields['grandTotalPartsIndustrial'] = 0;
    } else {
      fields.productParts.map(item => {
        residentailTotal = residentailTotal + item.residential;
        commercialTotal = commercialTotal + item.commercial;
        nonProfitTotal = nonProfitTotal + item.nonProfit;
        industrialTotal = industrialTotal + item.industrial;
      });
      fields['grandTotalPartsResidential'] = parseFloat(residentailTotal);
      fields['grandTotalPartsCommercial'] = parseFloat(commercialTotal);
      fields['grandTotalPartsNonProfit'] = parseFloat(nonProfitTotal);
      fields['grandTotalPartsIndustrial'] = parseFloat(industrialTotal);
    }
    this._callFieldsSetState();
    this._callCualateTotalAssemblyPrice();
  }

  _onChangeSelectAseemblyModule = value => {
    this.isAddImage = false;
    this.isAddFile = false;
    this.contentEdit = false;
    const label = value.value;
    let moduleData = {};

    const { modules } = this.props;
    let { fields, moduleResidential, moduleCommercial, moduleNonProfit, moduleIndustrial } = this.state;
    const { productAssemblyModule } = fields;
    let indexValue = label && label.split('-');
    let id = indexValue && indexValue[1];
    if(id) {
      this.props.getModuleMappingData(id);
    }
    moduleData = modules.filter((module) => {
      return module.productId === parseInt(id);
    });
  
    moduleData.map(item => {
      productAssemblyModule.productName = item.productName,
      productAssemblyModule.productId = item.productId,
      productAssemblyModule.power = item.power,
      productAssemblyModule.quantity = item.quantity,
      productAssemblyModule.residential = item.residential,
      productAssemblyModule.commercial = item.commercial,
      productAssemblyModule.nonProfit = item.nonProfit,
      productAssemblyModule.industrial = item.industrial,
      moduleResidential = item.residential,
      moduleCommercial = item.commercial,
      moduleNonProfit = item.nonProfit,
      moduleIndustrial = item.industrial;
    });
    fields.productAssemblyOptimizer = { 
      optimizerName: '',
      power: '',
      quantity: '',
      residential: 0,
      commercial: 0,
      nonProfit: 0,
      industrial: 0
    };
    fields.productAssemblyInverter = {
      inverterName: '',
      power: '',
      quantity: '',
      residential: 0,
      commercial: 0,
      nonProfit: 0,
      industrial: 0
    };

    fields.productParts.map(part => {
      part.partName = '';
      part.power = '';
      part.quantity = '';
      part.residential = 0;
      part.commercial = 0;
      part.nonProfit = 0;
      part.industrial = 0;
    });
    fields['grandTotalPartsResidential'] = 0;
    fields['grandTotalPartsCommercial'] = 0;
    fields['grandTotalPartsNonProfit'] = 0;
    fields['grandTotalPartsIndustrial'] = 0;
    this._callFieldsSetState();
    this.setState({
      moduleResidential,
      moduleCommercial,
      moduleNonProfit,
      moduleIndustrial,
      inverters: [],
      optimizers: [],
      productPartsList: []
    });
    this._calculateGrandTotalAssembly();
  }

  _onChangeSelectAseemblyOptimizer = value => {
    const label = value.value;
    let optimizerData = {};

    const { optimizers } = this.props;
    let { fields, optimizerResidential, optimizerCommercial, optimizerNonProfit, optimizerIndustrial  } = this.state;
    const { productAssemblyOptimizer } = fields;
    let indexValue = label && label.split('-');
    let id = indexValue && indexValue[1];
    optimizerData = optimizers.filter(optimizer => {
      return optimizer.productId === parseInt(id);
    });
    optimizerData.map(item => {
      productAssemblyOptimizer.optimizerName = item.productName,
      productAssemblyOptimizer.power = item.power,
      productAssemblyOptimizer.quantity = item.quantity,
      productAssemblyOptimizer.residential = item.residential,
      productAssemblyOptimizer.commercial = item.commercial,
      productAssemblyOptimizer.nonProfit = item.nonProfit,
      productAssemblyOptimizer.industrial = item.industrial;
      optimizerResidential = item.residential,
      optimizerCommercial = item.commercial,
      optimizerNonProfit = item.nonProfit,
      optimizerIndustrial = item.industrial;
    });
    this.setState({
      optimizerResidential,
      optimizerCommercial,
      optimizerNonProfit,
      optimizerIndustrial
    });
    this._calculateGrandTotalAssembly();
  }

  _onChangeSelectAseemblyInverter = value => {
    const label = value.value;
    let inverterData = {};
    const { inverters } = this.props;
    let { fields, inverterResidential, inverterCommercial, inverterNonProfit, inverterIndustrial } = this.state;
    const { productAssemblyInverter } = fields;
    let indexValue = label && label.split('-');
    let id = indexValue && indexValue[1];
    inverterData = inverters.filter(inverter => {
      return inverter.productId === parseInt(id);
    });
    inverterData.map(item => {
      productAssemblyInverter.inverterName = item.productName,
      productAssemblyInverter.power = item.power,
      productAssemblyInverter.quantity = item.quantity,
      productAssemblyInverter.residential = item.residential,
      productAssemblyInverter.commercial = item.commercial,
      productAssemblyInverter.nonProfit = item.nonProfit,
      productAssemblyInverter.industrial = item.industrial,
      inverterResidential = item.residential,
      inverterCommercial = item.commercial,
      inverterNonProfit = item.nonProfit,
      inverterIndustrial = item.industrial;
    });
    this.setState({
      inverterResidential,
      inverterCommercial,
      inverterNonProfit,
      inverterIndustrial
    });
   this._calculateGrandTotalAssembly();
  }

  _calculateGrandTotalAssembly = () => {
    const { fields } = this.state;
    const { productAssemblyModule, productAssemblyInverter, productAssemblyOptimizer } = fields;
    fields['grandTotalAssemblyResidential'] = parseFloat(productAssemblyInverter.residential ? productAssemblyInverter.residential : 0) + 
    parseFloat(productAssemblyModule.residential ? productAssemblyModule.residential : 0) 
    + parseFloat(productAssemblyOptimizer.residential ? productAssemblyOptimizer.residential : 0);
    fields['grandTotalAssemblyCommercial'] = parseFloat(productAssemblyInverter.commercial ? productAssemblyInverter.commercial : 0) + 
    parseFloat(productAssemblyModule.commercial ? productAssemblyModule.commercial : 0) 
    + parseFloat(productAssemblyOptimizer.commercial ? productAssemblyOptimizer.commercial : 0);
    fields['grandTotalAssemblyNonProfit'] = parseFloat(productAssemblyInverter.nonProfit ? productAssemblyInverter.nonProfit : 0) + 
    parseFloat(productAssemblyModule.nonProfit ? productAssemblyModule.nonProfit : 0) 
    + parseFloat(productAssemblyOptimizer.nonProfit ? productAssemblyOptimizer.nonProfit : 0);
    fields['grandTotalAssemblyIndustrial'] = parseFloat(productAssemblyInverter.industrial ? productAssemblyInverter.industrial : 0) + 
    parseFloat(productAssemblyModule.industrial ? productAssemblyModule.industrial : 0) 
    + parseFloat(productAssemblyOptimizer.industrial ? productAssemblyOptimizer.industrial : 0);

    this._callFieldsSetState();
    this._callCualateTotalAssemblyPrice();
  }

  _onChangeSelectParts = (value, name) => {
    const { fields} = this.state;
    let { productParts } = fields;
    const { productPartsList } = this.props;
    let partsData = {};
    const selectedValue = value.value;
    let indexValue = selectedValue && selectedValue.split('-');
    let id = indexValue && indexValue[1];
    let indexName = name && name.split('-');
    let indexId = indexName && indexName[1];
    let residentailTotal = 0, commercialTotal = 0, nonProfitTotal = 0, industrialTotal = 0;
    partsData = productPartsList.filter(parts => {
      return parts.productId === parseInt(id);
    });
    partsData = { ...partsData };
    productParts.map((item, index) => {
     if(parseInt(indexId) === index) {
        item.partName = partsData[0].productName,
        item.productId = partsData[0].productId,
        item.power = partsData[0].power,
        item.quantity = partsData[0].quantity,
        item.residential = partsData[0].residential,
        item.commercial = partsData[0].commercial,
        item.nonProfit = partsData[0].nonProfit,
        item.industrial = partsData[0].industrial;
      }
    });
    fields.productParts = productParts;
    fields.productParts.map(item => {
      residentailTotal = residentailTotal + item.residential;
      commercialTotal = commercialTotal + item.commercial;
      nonProfitTotal = nonProfitTotal + item.nonProfit;
      industrialTotal = industrialTotal + item.industrial;
    });
    fields['grandTotalPartsResidential'] = parseFloat(residentailTotal);
    fields['grandTotalPartsCommercial'] = parseFloat(commercialTotal);
    fields['grandTotalPartsNonProfit'] = parseFloat(nonProfitTotal);
    fields['grandTotalPartsIndustrial'] = parseFloat(industrialTotal);
    this.setState({
      partsList: productParts
    });
    this._callFieldsSetState();
    this._callCualateTotalAssemblyPrice();
  }

  _onTextFieldChangePartsQuantity = e => {
    const { name, value } = e.currentTarget;
    const { fields} = this.state;
    let { productParts } = fields;
    const { productPartsList } = this.props;
   let indexName = name && name.split('-');
    let id = indexName && indexName[1];
    let residentailTotal = 0, commercialTotal = 0, nonProfitTotal = 0, industrialTotal = 0;
    productParts.map((item, index) => {
      if(parseInt(id) === index) {
        productPartsList && productPartsList.map(list => {
          if(list.productId === parseInt(item.productId)) {
            if(value) {
              item.quantity = parseFloat(value),
              item.residential = parseFloat(value) * list.residential,
              item.commercial = parseFloat(value) * list.commercial,   
              item.nonProfit = parseFloat(value) * list.nonProfit,
              item.industrial = parseFloat(value) * list.industrial;
            } else {
              item.quantity = 0,
              item.residential = 0,
              item.commercial = 0,   
              item.nonProfit = 0,
              item.industrial = 0;
            }
          }
        });
       }
     });
     fields.productParts = productParts;
     fields.productParts.map(item => {
      residentailTotal = residentailTotal + item.residential;
      commercialTotal = commercialTotal + item.commercial;
      nonProfitTotal = nonProfitTotal + item.nonProfit;
      industrialTotal = industrialTotal + item.industrial;
    });
    fields['grandTotalPartsResidential'] = parseFloat(residentailTotal);
    fields['grandTotalPartsCommercial'] = parseFloat(commercialTotal);
    fields['grandTotalPartsNonProfit'] = parseFloat(nonProfitTotal);
    fields['grandTotalPartsIndustrial'] = parseFloat(industrialTotal);
    this._callFieldsSetState();
    this._callCualateTotalAssemblyPrice();
  }

  _callCualateTotalAssemblyPrice = () => {
    const { fields } = this.state;
    const { grandTotalAssemblyResidential, grandTotalAssemblyCommercial, grandTotalAssemblyNonProfit, grandTotalAssemblyIndustrial,
      grandTotalOtherPrice, grandTotalPartsResidential, grandTotalPartsCommercial, grandTotalPartsNonProfit,
    grandTotalPartsIndustrial } = fields; 

    fields['totalAssemblyResidentialPrice'] = parseFloat(grandTotalAssemblyResidential ? grandTotalAssemblyResidential : 0) + 
    parseFloat(grandTotalOtherPrice ? grandTotalOtherPrice : 0) + parseFloat(grandTotalPartsResidential ? grandTotalPartsResidential : 0);
    fields['totalAssemblyCommercialPrice'] = parseFloat(grandTotalAssemblyCommercial ? grandTotalAssemblyCommercial : 0) + 
    parseFloat(grandTotalOtherPrice ? grandTotalOtherPrice : 0) + parseFloat(grandTotalPartsCommercial ? grandTotalPartsCommercial : 0);
    fields['totalAssemblyNonProfitPrice'] = parseFloat(grandTotalAssemblyNonProfit ? grandTotalAssemblyNonProfit : 0) + 
    parseFloat(grandTotalOtherPrice ? grandTotalOtherPrice : 0 ) + parseFloat(grandTotalPartsNonProfit ? grandTotalPartsNonProfit : 0);
    fields['totalAssemblyIndustrialPrice'] = parseFloat(grandTotalAssemblyIndustrial ? grandTotalAssemblyIndustrial : 0) + 
    parseFloat(grandTotalOtherPrice ? grandTotalOtherPrice : 0) + parseFloat(grandTotalPartsIndustrial ? grandTotalPartsIndustrial : 0);
    this._callFieldsSetState();
  }

  _onFieldChangeAssemblyQuantity = e => {
    const { value, name } = e.currentTarget;
    const assemblyData = productAssemblyQuantityFieldChange(name, value, this.state);
    this._onFieldQuantity(assemblyData);
  }

  _onFieldQuantity = assemblyData => {
    const { fields } = this.state;
    fields.assemblyData = assemblyData;
    this._callFieldsSetState();
    this._calculateGrandTotalAssembly();
    this._callCualateTotalAssemblyPrice();
  };

  _onClearProductAssembly = e => {
    this.contentEdit = false;
    this.isAddImage = false;
    this.isAddFile = false;
    const { id } = e.currentTarget;
    const { fields } = this.state;
    let clearData = clearProductAssembly(id);
    if(clearData) {
      if(id === 'module') {
        fields.productAssemblyModule = clearData.productAssemblyModule;
        fields.productAssemblyOptimizer = clearData.productAssemblyOptimizer;
        fields.productAssemblyInverter = clearData.productAssemblyInverter;
        fields.productParts.map(part => {
          part.partName = '';
          part.power = '';
          part.quantity = '';
          part.residential = 0;
          part.commercial = 0;
          part.nonProfit = 0;
          part.industrial = 0;
        });
        fields['grandTotalPartsResidential'] = 0;
        fields['grandTotalPartsCommercial'] = 0;
        fields['grandTotalPartsNonProfit'] = 0;
        fields['grandTotalPartsIndustrial'] = 0;
      } else if (id === 'optimizer') {
        fields.productAssemblyOptimizer = clearData.productAssemblyOptimizer;
      } else if (id === 'inverter') {
        fields.productAssemblyInverter = clearData.productAssemblyInverter;
      }
    }
    this._callFieldsSetState();
    this._calculateGrandTotalAssembly();
  }

  _onDateChange = date => {
    const { fields } = this.state;
    const { warrantyYear } = fields;

    if(date) {
      let currentDate = new Date(date);
      let mm = currentDate.getMonth() + 1;
      let dd = currentDate.getDate();
      let yyyy = currentDate.getFullYear();
      let dateFormat = mm + '/' + dd + '/' + yyyy;
      fields['manufactureDate'] = dateFormat;
      if (warrantyYear) {
       let dd = currentDate.getDate() - 1;
       if(dd === 0) {
        mm = mm - 1;
        yyyy = currentDate.getFullYear() + parseInt(warrantyYear);
        dd = setDateFormat(mm, yyyy);
       }
       let yyyy =  currentDate.getFullYear() + parseInt(warrantyYear);
       let dateFormat = mm + '/' + dd + '/' + yyyy;
       if(dateFormat) {
         fields['warrantyExpiry'] = dateFormat;
       }
      }
      this.setState({
        fields,
        showDateLabel: true
      });
    }
  }

  render() {
    const { isShowWarranty, fields, errors, isAssembly, showCategoryLabel, subCategoryList, costList, inverters, optimizers, productPartsList,
      showManufacturerLabel, showPromotionLabel, showWarrantyLabel, showSelectYearLabel, showQuantityTypeLabel, showWarehouseLabel, showAvailabilityLabel, showDateLabel } = this.state;
    const { productName, category, manufacturer, modelNumber, manufactureDate, promotion, productCost, residential, commercial, nonProfit, industrial, 
      quantity, quantityInBox, sku, threshold, warehouse, stockAvailability, quantityType, sellingPrice, warrantyType, warrantyYear, warrantyExpiry,
      productEntries, specifications, otherPrices, uploadImages, grandTotalOtherPrice, assemblyWatt, productAssemblyModule, productParts,
      grandTotalAssemblyResidential, grandTotalAssemblyCommercial, grandTotalAssemblyNonProfit, grandTotalAssemblyIndustrial,
      totalAssemblyResidentialPrice, totalAssemblyCommercialPrice, totalAssemblyNonProfitPrice, totalAssemblyIndustrialPrice, productAssemblyOptimizer, productAssemblyInverter,
      grandTotalPartsResidential,grandTotalPartsCommercial, grandTotalPartsNonProfit, grandTotalPartsIndustrial, description, power } = fields;
    const  { checkDimension, checkWeight, checkColor, checkPower, checkDocumentUpload } = this.state;
    const { errorProductName, errorCategory, errorManufacturer, errorModelNumber, errorProductCost, errorResidential, errorCommercial,
    errorNonProfit, errorIndustrial, errorQuantity, errorThreshold, errorPower, errorQunatityBox } = errors;
    const { staticData, warehouseList, modules, configurationsList } = this.props;
    const categoryList = staticData && staticData.category;
    const manufacturerList = staticData && staticData.manufacturer;
    const promotionList = staticData && staticData.promotion;
    const warrantyTypeList = staticData && staticData.warrantyType;
    const warrantyYearList = staticData && staticData.warrantyYear;
    const quantityTypeList = staticData && staticData.quantityType;
    const stockAvailabilityList = staticData && staticData.stockAvailability;
    const priceTypeList = staticData && staticData.priceType;
    const uomTypeList = staticData && staticData.uomType;
    const categoryTypeList = staticData && staticData.categoryType;
    const subCategoryTypeList = staticData && staticData.subCategoryType;
    const unitTypeList = staticData && staticData.unitType;
    return (
      <div className="container">
          <div className="main-section">
            <div className="product-general">
              <ProductGeneralComponent 
                productName={ productName }
                category={ category }
                manufacturer={ manufacturer }
                modelNumber={ modelNumber }
                manufactureDate={ manufactureDate }
                promotion={ promotion }
                description={ description }
                power={ power }
                isShowWarranty={ isShowWarranty }
                categoryList={ categoryList }
                manufacturerList={ manufacturerList }
                promotionList={ promotionList }
                warrantyTypeList={ warrantyTypeList }
                warrantyYearList={ warrantyYearList }
                warrantyType={ warrantyType }
                warrantyYear={ warrantyYear }
                warrantyExpiry={ warrantyExpiry }
                errorProductName={ errorProductName }
                errorCategory={ errorCategory }
                errorManufacturer={ errorManufacturer }
                errorModelNumber={ errorModelNumber }
                errorPower={ errorPower }
                onFieldChange={ this._onFieldChangeAlphaNumeric }
                onFieldChangeNumeric={ this._onFieldChangePrice }
                onChangeSelectCategory={ this._onChangeSelectCategory }
                onChangeSelectManufacurer={ this._onChangeSelectManufacurer }
                onChangeSelectPromotion={ this._onChangeSelectPromotion }
                onChangeSelectWarrantyType={ this._onChangeSelectWarrantyType }
                onChangeSelectWarrantyYear={ this._onChangeSelectWarrantyYear }
                handleChangeWarrent={ this._handleChangeWarrent }
                fileChange={ this._changepPoductImageUpload }
                uploadImages={ uploadImages }
                onDeleteProductImage={ this._onDeleteProductImage }
                isAssembly={ isAssembly }
                assemblyWatt={ assemblyWatt }
                onDateChange={ this._onDateChange }
                showCategoryLabel={ showCategoryLabel }
                showManufacturerLabel={ showManufacturerLabel }
                showPromotionLabel={ showPromotionLabel }
                showWarrantyLabel={ showWarrantyLabel }
                showSelectYearLabel={ showSelectYearLabel }
                showDateLabel={ showDateLabel }
              />
            </div>

            {
              !isAssembly ? <div className="product-specification">
                <ProductSpecificationComponent 
                  specifications={ specifications }
                  checkDimension={ checkDimension }
                  checkWeight={ checkWeight }
                  checkColor={ checkColor }
                  checkPower={ checkPower }
                  checkDocumentUpload={ checkDocumentUpload }
                  onCheckboxFieldChange={ this._onCheckboxFieldChange } 
                  addSpecification={ this._addSpecification }
                  onDeleteProductSpecification={ this._onDeleteProductSpecification }
                  onFieldChange={ this._onTextFieldChangeSpecification }
                  onChangeSelectProductSpecification={ this._onChangeSelectProductSpecification }
                />
              </div> : ''
            }
            

             {/* to do next page 2 */}
            {/* <div className="tier-price">
                <ProductTierPriceComponent 
                  tierPrices={ tierPrices }
                  addCustomerGroup={ this._addCustomerGroup }
                />
            </div> */}

           {
             !isAssembly ? <div className="product-price">
                <ProductPriceComponent 
                  productCost={ productCost }
                  residential={ residential }
                  commercial={ commercial }
                  nonProfit={ nonProfit }
                  industrial={ industrial }
                  sellingPrice={ sellingPrice }
                  priceTypeList={ priceTypeList }
                  onFieldChange={ this._onFieldChangePrice }
                  onChangeSelectPriceType={ this._onChangeSelectPriceType }
                  errorProductCost={ errorProductCost }
                  errorResidential={ errorResidential }
                  errorCommercial={ errorCommercial }
                  errorNonProfit={ errorNonProfit }
                  errorIndustrial={ errorIndustrial }
                />
              </div> : ''
           }

           { 
             isAssembly ? <div className="product-assembly">
              <ProductAssemblyComponent 
                productAssemblyModule={ productAssemblyModule }
                onChangeSelect={ this._onChangeSelectAseemblyModule }
                onChangeSelectOptimizer={ this._onChangeSelectAseemblyOptimizer }
                onChangeSelectInverter={ this._onChangeSelectAseemblyInverter }
                onFieldChange={ this._onFieldChangeAssemblyQuantity }
                onClearProductAssembly={ this._onClearProductAssembly }
                modules={ modules }
                inverters={ inverters }
                optimizers={ optimizers }
                productAssemblyOptimizer={ productAssemblyOptimizer }
                productAssemblyInverter={ productAssemblyInverter }
                grandTotalAssemblyResidential={ grandTotalAssemblyResidential }
                grandTotalAssemblyCommercial={ grandTotalAssemblyCommercial }
                grandTotalAssemblyNonProfit={ grandTotalAssemblyNonProfit }
                grandTotalAssemblyIndustrial={ grandTotalAssemblyIndustrial }
              />
             </div> : ''
           }

           {
             isAssembly ? <div className="product-assembly">
              <ProductPartsComponent 
                productParts={ productParts }
                productPartsList={ productPartsList }
                addProductParts={ this._addProductParts }
                onDeleteProductPart={ this._onDeleteProductPart }
                onChangeSelectParts={ this._onChangeSelectParts }
                grandTotalPartsResidential={ grandTotalPartsResidential }
                grandTotalPartsCommercial={ grandTotalPartsCommercial }
                grandTotalPartsNonProfit={ grandTotalPartsNonProfit }
                grandTotalPartsIndustrial={ grandTotalPartsIndustrial }
                onFieldChange={ this._onTextFieldChangePartsQuantity }
              />
             </div> : ''
           }

            <div className="other-price">
              <ProductOtherPriceComponent 
                grandTotalOtherPrice={ grandTotalOtherPrice }
                otherPrices={ otherPrices }
                categoryTypeList={ categoryTypeList }
                subCategoryTypeList={ subCategoryTypeList }
                subCategoryList={ subCategoryList }
                unitTypeList={ unitTypeList }
                addOtherPrices={ this._addProductOtherPrices }
                onFieldChange={ this._onTextFieldChangeOtherPrice }
                onChangeSelect={ this._onChangeSelectOtherPrice }
                onDeleteProductOtherPrice={ this._onDeleteProductOtherPrice }
                configurationsList={ configurationsList }
                onChangeSelectSubCategory={ this._onChangeSelectSubCategory }
                costList={ costList }
                onChangeSelectUnit={ this._onChangeSelectUnit }
                onFieldTextChangeOtherPrice={ this._onFieldTextChangeOtherPrice }
              />
            </div>

            {
              isAssembly ? <div className="product-assembly">
                <ProductAssemblyPriceComponent 
                  totalAssemblyResidentialPrice={ totalAssemblyResidentialPrice }
                  totalAssemblyCommercialPrice={ totalAssemblyCommercialPrice }
                  totalAssemblyNonProfitPrice={ totalAssemblyNonProfitPrice }
                  totalAssemblyIndustrialPrice={ totalAssemblyIndustrialPrice }
                />
              </div> : ''
            }

            {
              !isAssembly ? <div className="product-stock">
                <ProductStockComponent 
                  quantity={ quantity }
                  quantityType={ quantityType }
                  threshold={ threshold }
                  quantityInBox={ quantityInBox }
                  sku={ sku }
                  warehouse={ warehouse }
                  stockAvailability={ stockAvailability }
                  warehouseList={ warehouseList }
                  quantityTypeList={ quantityTypeList }
                  stockAvailabilityList={ stockAvailabilityList }
                  onFieldChangeNumeric={ this._onFieldChangeNumeric }
                  onFieldChangeAlphaNumeric={ this._onFieldChangeAlphaNumeric }
                  onChangeSelectQuantityType={ this._onChangeSelectQuantityType }
                  onChangeSelectStockAvailability={ this._onChangeSelectStockAvailability }
                  onChangeSelectWarehouse={ this._onChangeSelectWarehouse }
                  onFieldBlur={ this._onFieldStockBlur }
                  errorQuantity={ errorQuantity }
                  errorThreshold={ errorThreshold }
                  errorQunatityBox={ errorQunatityBox }
                  showQuantityTypeLabel= { showQuantityTypeLabel }
                  showWarehouseLabel={ showWarehouseLabel }
                  showAvailabilityLabel={ showAvailabilityLabel }
                />
              </div> : ''
            }
           
           {
             !isAssembly ?  <div className="product-entry">
                <ProductEntryComponent 
                  productEntries={ productEntries }
                  warehouseList={ warehouseList }
                  uomTypeList={ uomTypeList }
                  addProductEntry={ this._addProductEntry }
                  onFieldChange = { this._onTextFieldChangeProductEntry } 
                  onFieldChangeNumeric={ this._onTextFieldChangeNumericProductEntry }
                  onFieldChangeAlphaNumeric={ this._onTextFieldChangeAlphanumericProductEntry }
                  onChangeSelectProductEntry={ this._onChangeSelectProductEntry }
                  onDeleteProductEntry={ this._onDeleteProductEntry }
                />
              </div> : ''
           }

            <div className='btn-footer-group'>
                <Button name='Cancel' type='button' className='btn-footer-cancel' onClick={ this._cancelForm }/>
                <Button name='Submit' type='button' className='btn-footer-submit' onClick={ this._submitForm } />
            </div>
          </div>
      </div>
    );
  }
}

export default ProductComponent;
