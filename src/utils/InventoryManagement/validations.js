export const productValidation = data => {
    const { productName, category, manufacturer, modelNumber, productCost, residential,
        commercial, nonProfit, industrial, quantity, threshold, power, quantityType, quantityInBox } = data;
    let formIsValid = true;
    const errors = {};

    if(!productName) {
        formIsValid = false;
        errors.errorProductName = 'Product Name is required';
    }

    if(!category) {
        formIsValid = false;
        errors.errorCategory = 'Category is required';
    }

    if(!manufacturer) {
        formIsValid = false;
        errors.errorManufacturer = 'Manufacturer is required';
    }

    if(!modelNumber) {
        formIsValid = false;
        errors.errorModelNumber = 'Model Number is required';
    }

    if(!power) {
        formIsValid = false;
        errors.errorPower = 'Power is required';
    }

    if(!productCost) {
        formIsValid = false;
        errors.errorProductCost = 'Product Cost is required';
    }

    if(!residential) {
        formIsValid = false;
        errors.errorResidential = 'Residential Price is required';
    }

    if(!commercial) {
        formIsValid = false;
        errors.errorCommercial = 'Commercial Price is required';
    }

    if(!nonProfit) {
        formIsValid = false;
        errors.errorNonProfit = 'NonProfit Price is required';
    }

    if(!industrial) {
        formIsValid = false;
        errors.errorIndustrial = 'Industrial Price is required';
    }

    if(!quantity) {
        formIsValid = false;
        errors.errorQuantity = 'Quantity is required';
    }

    if(parseInt(quantity)) {
        if(parseInt(threshold) && parseInt(quantity) < parseInt(threshold)) {
            formIsValid = false;
            errors.errorThreshold = 'X threshold value should be less than Quantity value';
        } else {
            errors.errorThreshold = '';
        }
    }

    if(quantityType === 'Box') {
        if(parseInt(quantityInBox) && parseInt(quantityInBox) < 2) {
            formIsValid = false;
            errors.errorQunatityBox = 'Minimum box quantity should be greater than one';
        } else if (parseInt(quantityInBox) === 0) {
            formIsValid = false;
            errors.errorQunatityBox = 'Minimum box quantity should be greater than one';
        } else {
            errors.errorQunatityBox = ''; 
        }
    }

    return {
        status: formIsValid,
        errors: errors
    };
};

export const assemblyValidation = data => {
    const { productName, category } = data;

    let formIsValid = true;
    const errors = {};

    if(!productName) {
        formIsValid = false;
        errors.errorProductName = 'Product Name is required';
    }

    if(!category) {
        formIsValid = false;
        errors.errorCategory = 'Category is required';
    }

    return {
        status: formIsValid,
        errors: errors
    };
};

export const warehouseValidation = data => {
    const { warehouseName, managerName, managerEmail, managerPhone, houseNumber, 
        street, zipCode, city, county, state, country} = data;
    let formIsValid = true;
    const errors = {};

    if(!warehouseName) {
        formIsValid = false;
        errors.errorWarehouseName = 'Warehouse Name is required';
    }

    if(!managerName) {
        formIsValid = false;
        errors.errorManagerName = 'Manager Name is required';
    }

    if(managerEmail) {
        let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(managerEmail)) {
          formIsValid = false;
          errors.errorManagerEmail = 'Please enter valid email ID';
        }
    }
   
    if(!managerEmail) {
        formIsValid = false;
        errors.errorManagerEmail = 'Manager Email is required';
    }

    if(managerPhone) {
        if(managerPhone.length !== 14) {
            formIsValid = false;
            errors.errorManagerPhone = 'Please enter valid phone number';
        }
    }

    if(!managerPhone) {
        formIsValid = false;
        errors.errorManagerPhone = 'Manager Phone is required';
    }

    if(!houseNumber) {
        formIsValid = false;
        errors.errorHouseNumber = 'Address 1 is required';
    }

    if(!street) {
        formIsValid = false;
        errors.errorWareStreet = 'Address 2 is required';
    }

    if(!zipCode) {
        formIsValid = false;
        errors.errorZipCode = 'Zip Code is required';
    }

    if(!city) {
        formIsValid = false;
        errors.errorCity = 'City is required';
    }

    if(!county) {
        formIsValid = false;
        errors.errorCounty = 'County is required';
    }

    if(!state) {
        formIsValid = false;
        errors.errorState = 'State is required';
    }

    if(!country) {
        formIsValid = false;
        errors.errorCountry = 'Country is required';
    }
    return {
        status: formIsValid,
        errors: errors
    };
};

export const supplierValidation = data => {
    const { organizationName, supplierNo, registrationNo} = data;
    let formIsValid = true;
    const errors = {};

    if(!organizationName) {
        formIsValid = false;
        errors.errorOrganizationName = 'Organization Name is required';
    }

    if(!supplierNo) {
        formIsValid = false;
        errors.errorSupplierNo = 'Supplier No is required';
    }

    if(!registrationNo) {
        formIsValid = false;
        errors.errorRegistrationNo = 'Registration No is required';
    }
       
    return {
        status: formIsValid,
        errors: errors
    };
};

export const contactSupplierValidation = data => {
    const { contactName, contactEmail, contactPhone } = data;
    let formIsValid = true;
    const errors = {};

    if(!contactName) {
        formIsValid = false;
        errors.errorContactName = 'Contact Name is required';
    }

    if(contactEmail) {
        let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(contactEmail)) {
          formIsValid = false;
          errors.errorContactEmail = 'Please enter valid email ID';
        }
    }

    if(!contactEmail) {
        formIsValid = false;
        errors.errorContactEmail = 'Contact Email is required';
    }

    if(contactPhone) {
        if(contactPhone.length !== 14) {
            formIsValid = false;
            errors.errorContactPhone = 'Please enter valid phone number';
        }
    }

    if(!contactPhone) {
        formIsValid = false;
        errors.errorContactPhone = 'Contact Phone is required';
    }
       
    return {
        status: formIsValid,
        errors: errors
    };
};

export const configurationOtherPriceValidation = data => {

    let { category, subCategories } = data;
        
    let formIsValid = true;
    const errors = {};

    if(!category) {
        formIsValid = false;
        errors.errorCategory = 'Category is required';
    }
    subCategories && subCategories.map((subCat) => {
        if(!subCat.subCategory) {
            formIsValid = false;
            subCat.errorSubCategory = 'Sub category is required';
        } else {
            formIsValid = true;
            subCat.errorSubCategory = '';
        }
        return subCat;
    });
    return {
        status: formIsValid,
        errors,
        subCategories
    };
};