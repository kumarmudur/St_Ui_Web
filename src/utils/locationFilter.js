export const countryFilter = countryList  => {
    let cKeys = Object.keys(countryList);
    let countries = cKeys.map(key => {
        if(countryList[key] && countryList[key].hasOwnProperty('country_name') && countryList[key].country_name !== undefined) {
            return countryList[key].country_name;
        }
    });
    countries = countries.filter(item => {
       return item !== undefined;
    });
    return countries;
};

export const statesFilter = statesList => {
    let sKeys = statesList && Object.keys(statesList);
    let states = sKeys.map(key => {
        if(statesList[key] && statesList[key].hasOwnProperty('state_name') && statesList[key].state_name !== undefined) {
            return statesList[key].state_name;
        }
    });
    return states;
};

export const cityFilter = cityList  => {
    let cKeys = Object.keys(cityList);
    let cities = cKeys.map(key => {
        if(cityList[key] && cityList[key].hasOwnProperty('city_name') && cityList[key].city_name !== undefined) {
            return cityList[key].city_name;
        }
    });
    cities = cities.filter(item => {
       return item !== undefined;
    });
    return cities;
};

export const warehouseFilteredList = warehouseList => {
    let cKeys = Object.keys(warehouseList);
    let warehouses = cKeys.map(key => {
        if(warehouseList[key] && warehouseList[key].hasOwnProperty('warehouseName') && warehouseList[key].warehouseName !== undefined) {
            return warehouseList[key].warehouseName;
        }
    });
    warehouses = warehouses.filter(item => {
       return item !== undefined;
    });
    return warehouses;
};
