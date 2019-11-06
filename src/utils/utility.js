import _ from 'lodash';

export const getLength = data => {
    return _.size(data);
};

export const checkNumeric = data => {
    return /^[0-9-]+$/.test(data) || '';
};

export const checkNumericWithoutOneZero = data => {
    return /^[2-9-]+$/.test(data) || '';
};

export const isDecimal = data => {
    return /^\d+(\.\d+)?$/.test(data) || '';
};

export const checkAlphanumeric = data => {
    return /^[a-zA-Z0-9_ ]*$/.test(data) || '';
};

export const checkAlphabets = data => {
    return /^[a-zA-Z_ ]*$/.test(data) || '';
};

export const checkPhoneNumber = (data, value) => {
    if (data && data.length < 10) {
        value = data;
      } else if (data && data.length === 10) {
          const number = data.replace(
          /(\d{3})(\d{3})(\d{4})/,
          '($1)-$2-$3'
          );
        value = number;
      }
      return value;
};

const checkLeapYear = year => {
    if(year) {
        return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
    }
};

export const setDateFormat = (mm, year) => {
    let dd = null;
    if(mm) {
        if(mm === 0 || mm == 1 || mm === 3 || mm === 7 || mm ===8 || mm === 10) {
            dd = 31;
        } else if (mm === 4 || mm === 5 || mm === 6 || mm === 9 || mm === 11) {
            dd = 30;
        } else {
           let isLeapYear = checkLeapYear(year);
           dd = isLeapYear ? 29 : 28;
        }
    }
    return dd;
};

