export const usernameValidation = data => {
  let errorMessage = '';
  if(!data) {
      errorMessage = 'Please enter the registered email ID';
      return { status: true, errorMessage};
  } else {
      // const regex = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*(\+[a-zA-Z0-9-]+)?@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/i;  
      // eslint-disable-next-line no-useless-escape
      const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let emailValue = regex.test(data);
      if(!emailValue) {
          errorMessage = 'Please enter valid email ID';
          return { status: true, errorMessage}; 
      } else {
          return { status: false}; 
      }
  }
};


export const isValidPhone = phone => {
if (!isNaN(phone) && phone.length !== 10 ) { 
  return true;
} else {
  return false;
}
};

const ValidateNumberOrEmail = userName => {
  let errorUserNameMessage = '';
  if(isNaN(userName)) {
      // eslint-disable-next-line no-useless-escape
      const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let emailResult = regex.test(userName);
      errorUserNameMessage = 'Please enter valid email ID';
      return {
          status : !emailResult ? true : false,
          invalidUsername: !emailResult ? true : false,
          errorUserNameMessage: !emailResult ? errorUserNameMessage : null,
      };
  }
};

export const loginValidation = data => {
  const { userName, password } = data;

  let msg = {
      validationFailed : false,
      invalidUsername: false,
      invalidPassword: false,
      errorUserNameMessage: 'Please enter valid email ID',
      errorPasswordMessage: 'Please enter valid password'
  };

  if (userName && password) {
      msg.validationFailed = true;
      msg.invalidUsername = true;
      msg.validationFailed = true;
      msg.invalidPassword = true; 
  }
  else if (!userName || !password) {
      msg.validationFailed = true;
      msg.invalidUsername = true;
      msg.validationFailed = true;
      msg.invalidPassword = true; 
  }

  if (!userName && !password) {
      msg.validationFailed = true;
      msg.invalidUsername = true;
      msg.validationFailed = true;
      msg.invalidPassword = true; 
  }

  else if (!userName) {
      msg.validationFailed = true;
      msg.invalidUsername = true;
  }
  else if (userName) {
      const userNameValidation = ValidateNumberOrEmail(userName);
      msg.validationFailed = userNameValidation.status;
      msg.invalidUsername = userNameValidation.invalidUsername;
      msg.errorUserNameMessage = userNameValidation.errorUserNameMessage;
  }

  if (!password) {
      msg.validationFailed = true;
      msg.invalidPassword = true;
  }
  else if (!msg.validationFailed && password) {
      msg.validationFailed = false;
      msg.invalidUsername = false;
      msg.invalidPassword = false;
  }
  return msg;
};

const checkEmail = (email) => {
//let pattern = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*(\+[a-zA-Z0-9-]+)?@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/i;
// eslint-disable-next-line no-useless-escape
let pattern =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if (pattern.test(email)) {
  return null;
} else {
  return 'Please enter valid email ID';
}
};

export const changePasswordValidation = data => {
const { oldPassword, newPassword, confirmPassword } = data;
let formIsValid = true;

const errors = {};

if(!oldPassword) {
  formIsValid = false;
  errors.errorOldPassword = 'Old password is required';
}

if (newPassword !== undefined) {
  if (!newPassword.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
    formIsValid = false;
    errors.errorPassword = 'Please enter secure and strong password';
  } 
}

if (!newPassword) {
  formIsValid = false;
  errors.errorPassword = 'New password is required';
}

if (confirmPassword !== undefined) {
  if (!confirmPassword.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
    formIsValid = false;
    errors.errorConfirmPassword = 'Please enter secure and strong confirm password';
  } else {
    if (newPassword !== confirmPassword) {
      formIsValid = false;
      errors.errorConfirmPassword = 'Password and confirm password should match';
    }
  }
}

if (!confirmPassword) {
  formIsValid = false;
  errors.errorConfirmPassword = 'Confirm password is required';
}

 return {
    status: formIsValid,
    errors: errors
}; 

};

export const registerValidation = data => {
  const { firstName, lastName, email, confirmEmail, phone, alternativePhone, password, confirmPassword } = data;
  let formIsValid = true;

  const errors = {
    errorFirstName: !firstName ? 'First name is required': null,
    errorLastName: !lastName ? 'Last name is required' : null,
    errorEmail: !email ? 'Email is required' : checkEmail(email),
    errorConfirmEmail: (!confirmEmail ? 'Please enter valid email ID' : checkEmail(confirmEmail))
  };

  if(email && confirmEmail && (confirmEmail !== email) ) {
    errors.errorConfirmEmail = 'Confirmation email does not match with the given email';
  }
  
  if( !firstName || !lastName || !email || !confirmEmail || errors.errorConfirmEmail ) { 
    formIsValid = false;
  }
  
  if(!phone) {
    formIsValid = false;
    errors.errorPhone = 'Phone number is required';
  }

  if(phone && phone.length !== 14) {
    formIsValid = false;
    errors.errorPhone = 'Please enter valid phone number';
  }

  if(alternativePhone && alternativePhone.length !== 14) {
    formIsValid = false;
    errors.errorAlternative = 'Please enter valid alternate phone number';
  }

  if (password !== undefined) {
    if (!password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
      formIsValid = false;
      errors.errorPassword = 'Please enter secure and strong password';
    } 
  }

  if (!password) {
    formIsValid = false;
    errors.errorPassword = 'Password is required';
  }

  if (confirmPassword !== undefined) {
    if (!confirmPassword.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
      formIsValid = false;
      errors.errorConfirmPassword = 'Please enter secure and strong confirm password';
    } else {
      if (password !== confirmPassword) {
        formIsValid = false;
        errors.errorConfirmPassword = 'Password and confirm password should match';
      }
    }
  }

  if (!confirmPassword) {
    formIsValid = false;
    errors.errorConfirmPassword = 'Confirm password is required';
  }

   return {
      status: formIsValid,
      errors: errors
  }; 

};

export const addUserValidation = data => {
  const { firstName, lastName, email, phone, alternativePhone, houseBuilding, street, zipCode, city, county, country, state, userType, role, office, department } = data;
  let formIsValid = true;
  const errors = {};

  if(!firstName) {
    formIsValid = false;
    errors.errorFirstName ='First name is required';
  }

  if(!lastName) {
    formIsValid = false;
    errors.errorLastName = 'Last name is required';
  }
 
  if(!phone) {
    formIsValid = false;
    errors.errorPhone = 'Phone number is required';
  }

  if(phone && phone.length !== 14) {
    formIsValid = false;
    errors.errorPhone = 'Please enter valid phone number';
  }

  if(alternativePhone && alternativePhone.length !== 14) {
    formIsValid = false;
    errors.errorAlternative = 'Please enter valid alternate phone number';
  }

  if(email !== undefined) {
  // eslint-disable-next-line no-useless-escape    
  let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if (!pattern.test(email)) {
     formIsValid = false;
     errors.errorEmail = 'Please enter valid email ID';
   }
  }

  if(!email) {
    formIsValid = false;
    errors.errorEmail = 'Email is required';
  }

  if(!houseBuilding) {
    formIsValid = false;
    errors.errorHouseBuilding ='Address 1 is required';
  }

  if(!street) {
    formIsValid = false;
    errors.errorStreet ='Address 2 is required';
  }

  if(!zipCode) {
    formIsValid = false;
    errors.errorZipcode ='Zip code is required';
  }

  if(!city) {
    formIsValid = false;
    errors.errorCity ='City is required';
  }

  if(!county) {
    formIsValid = false;
    errors.errorCounty ='County is required';
  }

  if(!country) {
    formIsValid = false;
    errors.errorCountry ='Country is required';
  }

  if(!state) {
    formIsValid = false;
    errors.errorState ='State is required';
  }

  if(!userType) {
    formIsValid = false;
    errors.errorUserType ='User Type is required';
  }

  if(!role) {
    formIsValid = false;
    errors.errorRole ='Role is required';
  }

  if(!office) {
    formIsValid = false;
    errors.errorOffice ='Office is required';
  }

  if(!department) {
    formIsValid = false;
    errors.errorDepartment ='Department is required';
  }

 return {
  status: formIsValid,
  errors: errors
};

};

export const associateFormValidation = (data, type) => {
  const { firstName, lastName, email, phone, representativeFirstName, representativeLastName, companyName, companyEin, ssn, driverLicenseNumber, companyRegistrationState, 
  houseBuilding, street, zipCode, city, county, country, state } = data;
  let formIsValid = true;
  const errors = {};
  if(type === 'associate') {
    if(!representativeFirstName) {
      formIsValid = false;
      errors.errorRepresentFirstName ='First name is required';
    }

    if(!representativeLastName) {
      formIsValid = false;
      errors.errorRepresentLastName = 'Last name is required';
    }
    if(!ssn) {
      formIsValid = false;
      errors.errorSSN ='SSN is required';
    }

    if(!driverLicenseNumber) {
      formIsValid = false;
      errors.errorDriverLicenseNumber = 'Driver license number is required';
    }
  }
  else {
    if(!firstName) {
      formIsValid = false;
      errors.errorFirstName ='First name is required';
    }

    if(!lastName) {
      formIsValid = false;
      errors.errorLastName = 'Last name is required';
    }
  
    if(!email) {
      formIsValid = false;
      errors.errorEmail = 'Email is required';
    }

    if(email !== undefined) {
      // eslint-disable-next-line no-useless-escape
      let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!pattern.test(email)) {
        formIsValid = false;
        errors.errorEmail = 'Please enter valid email ID';
      }
    }
    if(!phone) {
      formIsValid = false;
      errors.errorPhone = 'Phone number is required';
    }
}

if(!companyName) {
  formIsValid = false;
  errors.errorCompanyName ='Company name is required';
}

if(!companyEin) {
  formIsValid = false;
  errors.errorCompanyEin ='Company FEIN is required';
}

if(!companyRegistrationState) {
  formIsValid = false;
  errors.errorRegistrationState ='Company registration state is required';
}

if(!houseBuilding) {
  formIsValid = false;
  errors.errorHouseBuilding ='Address 1 is required';
}

if(!street) {
  formIsValid = false;
  errors.errorStreet ='Address 2 is required';
}

if(!zipCode) {
  formIsValid = false;
  errors.errorZipcode ='Zip code is required';
}

if(!city) {
  formIsValid = false;
  errors.errorCity ='City is required';
}

if(!county) {
  formIsValid = false;
  errors.errorCounty ='County is required';
}

if(!country) {
  formIsValid = false;
  errors.errorCountry ='Country is required';
}

if(!state) {
  formIsValid = false;
  errors.errorState ='State is required';
}

return {
status: formIsValid,
errors: errors
};

};

export const contactPersonValidation = data => {
  const { contactEmail, contactPhone, contactPersons, type } = data;
  let formIsValid = true;
  const errors = {};
  if(type === 'main') {
    if(contactEmail) {
      // eslint-disable-next-line no-useless-escape
      let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!pattern.test(contactEmail)) {
        formIsValid = false;
        errors.errorContactEmail = 'Please enter valid email ID';
      }
    }

    if(contactPhone && contactPhone.length !== 14) {
      formIsValid = false;
      errors.errorContactPhone = 'Please enter valid phone number';
    }
  }
  else {
    contactPersons && contactPersons.length > 0 && contactPersons.map((contactPerson, index) => {
      if(contactPerson.email) {
        // eslint-disable-next-line no-useless-escape
        let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!pattern.test(contactPerson.email)) {
          formIsValid = false;
          errors[`errorEmail-${ index }`] = 'Please enter valid email ID';
        }
      }
      if(contactPerson.phone && contactPerson.phone.length !== 14) {
        formIsValid = false;
        errors[`errorPhone-${ index }`] = 'Please enter valid phone number';
      }
    });
  }

  return {
    status: formIsValid,
    errors: errors
  };
};

export const rolePageValidation = data => {
  const { roleName, roleDiscription, checkedBoxes } = data;
  let formIsValid = true;
  const errors = {};
  if(!roleName) {
    formIsValid = false;
    errors.errorRoleName ='Role name is required';
  }

  if(!roleDiscription) {
    formIsValid = false;
    errors.errorRoleDiscription = 'Role description is required';
  }
  if(checkedBoxes && checkedBoxes.length === 0) {
    formIsValid = false;
    errors.errorCheckedBoxes ='Please select atleast one role checkbox';
  }

  return {
    status: formIsValid,
    errors: errors
  };
};

export const officeValidation = data => {
  const { officeName, country, state, city } = data;
  let formIsValid = true;
  const errors = {};
  if(!officeName) {
    formIsValid = false;
    errors.errorOfficeName ='Office name is required';
  }

  if(!country) {
    formIsValid = false;
    errors.errorCountry = 'Country is required';
  }
  if(!state) {
    formIsValid = false;
    errors.errorState = 'State is required';
  }

  if(!city) {
    formIsValid = false;
    errors.errorCity = 'City is required';
  }

  return {
    status: formIsValid,
    errors: errors
  };
};

export const departmentValidation = department => {
  let formIsValid = true;
  const errors = {};
  if(!department) {
    formIsValid = false;
    errors.errorDepartment ='Department name is required';
  }
  return {
    status: formIsValid,
    errors: errors
  };
};