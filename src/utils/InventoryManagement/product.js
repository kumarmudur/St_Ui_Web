export const productGetInitialState = () => {
    const obj = {
        productName: '',
        category: '',
        manufacturer: '',
        modelNumber: '',
        manufactureDate: '',
        promotion: '',
        power: '',
        description: '',
        productHasWarranty: false,
        warrantyType: '',
        warrantyYear: '',
        warrantyExpiry: '',
        status: 'Active',
        uploadImages: [],
        assemblyWatt: '',
  
        specifications: [],
  
        quantity: '',
        threshold: '',
        quantityType: '',
        quantityInBox: '',
        warehouse: '',
        stockAvailability: '',
        sku: '',
  
        productCost: '',
        sellingPrice: '$',
        residential: '',
        commercial: '',
        nonProfit: '',
        industrial: '',
  
        otherPrices: [],
        grandTotalOtherPrice: 0,
  
        productEntries: [{
          serialNumber: '',
          warehouse: '',
          shelf: '',
          bin: '',
          uom: '',
          qty: ''
        }],
  
      productParts: [ {
        partName: '',
        power: '',
        quantity: '',
        residential: '',
        commercial: '',
        nonProfit: '',
        industrial: ''
      }],
  
      productAssemblyModule: {
        productName: '',
        power: '',
        quantity: '',
        residential: 0,
        commercial: 0,
        nonProfit: 0,
        industrial: 0
      },
  
      productAssemblyOptimizer: {
        optimizerName: '',
        power: '',
        quantity: '',
        residential: 0,
        commercial: 0,
        nonProfit: 0,
        industrial: 0
      },
  
      productAssemblyInverter: {
        inverterName: '',
        power: '',
        quantity: '',
        residential: 0,
        commercial: 0,
        nonProfit: 0,
        industrial: 0
      },
  
      grandTotalAssemblyResidential: 0,
      grandTotalAssemblyCommercial: 0,
      grandTotalAssemblyNonProfit: 0,
      grandTotalAssemblyIndustrial: 0,
  
      grandTotalPartsResidential: 0,
      grandTotalPartsCommercial: 0,
      grandTotalPartsNonProfit: 0,
      grandTotalPartsIndustrial: 0,
  
      totalAssemblyResidentialPrice: 0,
      totalAssemblyCommercialPrice: 0,
      totalAssemblyNonProfitPrice: 0,
      totalAssemblyIndustrialPrice: 0
  
      };
      return obj;
};

export const productSetInitialState = data => {
    const obj = {
        productName: data.productName || '',
        category: data.category || '',
        manufacturer: data.manufacturer || '',
        modelNumber: data.modelNumber || '',
        manufactureDate: data.manufactureDate || '',
        promotion: data.promotion || '',
        power: data.power || '',
        description: data.description || '',
        productHasWarranty: data.productHasWarranty || '',
        warrantyType: data.warrantyType || '',
        warrantyYear: data.warrantyYear || '',
        warrantyExpiry: data.warrantyExpiry || '',
        status: 'Active',
        uploadImages: data.uploadImages || [],
  
        assemblyWatt: data.assemblyWatt || [],
  
        otherPrices: data.otherPrices || [],
        grandTotalOtherPrice: data.grandTotalOtherPrice || 0,
  
        quantity: data.quantity || '',
        threshold: data.threshold || '',
        quantityType: data.quantityType || '',
        quantityInBox: data.quantityInBox || '',
        warehouse: data.warehouse || '',
        stockAvailability: data.stockAvailability || '',
        sku: data.sku || '',
  
        productCost: data.productCost || '',
        sellingPrice: data.sellingPrice || '$',
        residential: data.residential || '',
        commercial: data.commercial || '',
        nonProfit: data.nonProfit || '',
        industrial: data.industrial || '',
  
        productEntries: data.productEntries || [{
          serialNumber: '',
          warehouse: '',
          shelf: '',
          bin: '',
          uom: '',
          qty: ''
        }],
  
        specifications: data.specifications || [],
  
        productParts: data.productParts || [{
          partName: '',
          power: '',
          quantity: '',
          residential: '',
          commercial: '',
          nonProfit: '',
          industrial: ''
        }],
  
        productAssemblyModule: data.productAssemblyModule || {
          productName: '',
          power: '',
          quantity: '',
          residential: '',
          commercial: '',
          nonProfit: '',
          industrial: ''
        },
  
        productAssemblyOptimizer: data.productAssemblyOptimizer || {
          optimizerName: '',
          power: '',
          quantity: '',
          residential: '',
          commercial: '',
          nonProfit: '',
          industrial: ''
        },
  
        productAssemblyInverter: data.productAssemblyInverter || {
          inverterName: '',
          power: '',
          quantity: '',
          residential: '',
          commercial: '',
          nonProfit: '',
          industrial: ''
        },
    
        grandTotalAssemblyResidential: data.grandTotalAssemblyResidential || 0,
        grandTotalAssemblyCommercial: data.grandTotalAssemblyCommercial || 0,
        grandTotalAssemblyNonProfit: data.grandTotalAssemblyNonProfit || 0,
        grandTotalAssemblyIndustrial: data.grandTotalAssemblyIndustrial || 0,
  
        grandTotalPartsResidential: data.grandTotalPartsResidential || 0,
        grandTotalPartsCommercial: data.grandTotalPartsCommercial || 0,
        grandTotalPartsNonProfit: data.grandTotalPartsNonProfit || 0,
        grandTotalPartsIndustrial: data.grandTotalPartsIndustrial || 0,
    
        totalAssemblyResidentialPrice: data.totalAssemblyResidentialPrice || 0,
        totalAssemblyCommercialPrice: data.totalAssemblyCommercialPrice || 0,
        totalAssemblyNonProfitPrice: data.totalAssemblyNonProfitPrice || 0,
        totalAssemblyIndustrialPrice: data.totalAssemblyIndustrialPrice || 0
      };
      return obj;
};

export const setProductPayload = data => {
  let obj = {};
   if (data.category === 'Assembly') {
    obj = {
      productName: data.productName || '',
      category: data.category || '',
      assemblyWatt: data.assemblyWatt || '',
      description: data.description || '',
      uploadImages: data.uploadImages || [],

      productAssemblyModule: data.productAssemblyModule || {
        productName: '',
        power: '',
        quantity: 1,
        residential: 0,
        commercial: 0,
        nonProfit: 0,
        industrial: 0
      },
      productAssemblyOptimizer: data.productAssemblyOptimizer || {
        optimizerName: '',
        power: '',
        quantity: 1,
        residential: 0,
        commercial: 0,
        nonProfit: 0,
        industrial: 0
      },
      productAssemblyInverter: data.productAssemblyInverter || {
        inverterName: '',
        power: '',
        quantity: 1,
        residential: 0,
        commercial: 0,
        nonProfit: 0,
        industrial: 0
      },

      productParts: data.productParts || [{
        partName: '',
        power: '',
        quantity: '',
        residential: 0,
        commercial: 0,
        nonProfit: 0,
        industrial: 0
      }],

      otherPrices: data.otherPrices || [],
      grandTotalOtherPrice: data.grandTotalOtherPrice || 0,

      grandTotalAssemblyResidential: data.grandTotalAssemblyResidential || 0,
      grandTotalAssemblyCommercial: data.grandTotalAssemblyCommercial || 0,
      grandTotalAssemblyNonProfit: data.grandTotalAssemblyNonProfit || 0,
      grandTotalAssemblyIndustrial: data.grandTotalAssemblyIndustrial || 0,

      grandTotalPartsResidential: data.grandTotalPartsResidential || 0,
      grandTotalPartsCommercial: data.grandTotalPartsCommercial || 0,
      grandTotalPartsNonProfit: data.grandTotalPartsNonProfit || 0,
      grandTotalPartsIndustrial: data.grandTotalPartsIndustrial || 0,
  
      totalAssemblyResidentialPrice: data.totalAssemblyResidentialPrice || 0,
      totalAssemblyCommercialPrice: data.totalAssemblyCommercialPrice || 0,
      totalAssemblyNonProfitPrice: data.totalAssemblyNonProfitPrice || 0,
      totalAssemblyIndustrialPrice: data.totalAssemblyIndustrialPrice || 0
    };
   } else {
     obj = {
      productName: data.productName || '',
      category: data.category || '',
      manufacturer: data.manufacturer || '',
      modelNumber: data.modelNumber || '',
      manufactureDate: data.manufactureDate || '',
      promotion: data.promotion || '',
      power: data.power || '',
      description: data.description || '',
      productHasWarranty: data.productHasWarranty || 'No',
      warrantyType: data.warrantyType || '',
      warrantyYear: data.warrantyYear || '',
      warrantyExpiry: data.warrantyExpiry || '',
      status: data.status || 'Active',
      uploadImages: data.uploadImages || [],

      specifications: data.specifications || [],

      productCost: data.productCost || '',
      sellingPrice: data.sellingPrice || '$',
      residential: data.residential || '',
      commercial: data.commercial || '',
      nonProfit: data.nonProfit || '',
      industrial: data.industrial || '',

      otherPrices: data.otherPrices || [],
      grandTotalOtherPrice: data.grandTotalOtherPrice || 0,

      quantity: data.quantity || '',
      threshold: data.threshold || '',
      quantityType: data.quantityType || '',
      quantityInBox: data.quantityInBox || '',
      warehouse: data.warehouse || '',
      stockAvailability: data.stockAvailability || '',
      sku: data.sku || '',

      productEntries: data.productEntries || [{
        serialNumber: '',
        warehouse: '',
        shelf: '',
        bin: '',
        uom: '',
        qty: ''
      }],

     };
   }

   return obj;
};

const caluclateAssembyData = (value, residential, commercial, nonProfit, industrial, assemblyType) => {
    if(value) {
      assemblyType.quantity = parseFloat(value);
      assemblyType.residential = parseFloat(value) * residential;
      assemblyType.commercial = parseFloat(value) * commercial;
      assemblyType.nonProfit = parseFloat(value) * nonProfit;
      assemblyType.industrial = parseFloat(value) * industrial;
    } else {
      assemblyType.quantity = 0;
      assemblyType.residential = 0;
      assemblyType.commercial = 0;
      assemblyType.nonProfit = 0;
      assemblyType.industrial = 0;
    }
    return {
      assemblyType
    };
};

export const productAssemblyQuantityFieldChange = (quantityType, value, data) => {
    if(quantityType === 'moduleQuantity') {
        const { fields, moduleResidential, moduleCommercial, moduleNonProfit, moduleIndustrial } = data;
        const { productAssemblyModule } = fields;
        caluclateAssembyData(value, moduleResidential, moduleCommercial, moduleNonProfit, moduleIndustrial, productAssemblyModule);
    } else if (quantityType === 'optimizerQuantity') {
        const { fields, optimizerResidential, optimizerCommercial, optimizerNonProfit, optimizerIndustrial } = data;
        const { productAssemblyOptimizer } = fields;
        caluclateAssembyData(value, optimizerResidential, optimizerCommercial, optimizerNonProfit, optimizerIndustrial, productAssemblyOptimizer);
    } else if (quantityType === 'inverterQuantity') {
        const { fields, inverterResidential, inverterCommercial, inverterNonProfit, inverterIndustrial } = data;
        const { productAssemblyInverter } = fields;
        caluclateAssembyData(value, inverterResidential, inverterCommercial, inverterNonProfit, inverterIndustrial, productAssemblyInverter);
    }
};

const clearOptimizer = () => {
  let productAssemblyOptimizer = {};
  productAssemblyOptimizer = {
        optimizerName: '',
        power: '',
        quantity: '',
        residential: 0,
        commercial: 0,
        nonProfit: 0,
        industrial: 0
    };
    return productAssemblyOptimizer;
};

const clearInverter = () => {
    let productAssemblyInverter = {};
    productAssemblyInverter = {
        inverterName: '',
        power: '',
        quantity: '',
        residential: 0,
        commercial: 0,
        nonProfit: 0,
        industrial: 0
      };
      return productAssemblyInverter;
  };

export const clearProductAssembly = id => {
    let productAssemblyModule = {}, productAssemblyOptimizer = {}, productAssemblyInverter = {};
    if(id === 'module') {
        productAssemblyModule = {
            productName: '',
            power: '',
            quantity: '',
            residential: 0,
            commercial: 0,
            nonProfit: 0,
            industrial: 0
        };
        productAssemblyOptimizer = clearOptimizer();
        productAssemblyInverter = clearInverter();
        return {
            productAssemblyModule,
            productAssemblyOptimizer,
            productAssemblyInverter
        };
    } else if (id === 'optimizer') {
        productAssemblyOptimizer = clearOptimizer();
        return  { productAssemblyOptimizer };
    } else if (id === 'inverter') {
        productAssemblyInverter = clearInverter();
        return { productAssemblyInverter };
    }
};



