import React,{ Fragment} from 'react';
import FloatingLabel from 'floating-label-react';

const DeliveryWarehouseComponent = props => {
    const { houseNumber, state, street, zipCode, country, county, city, managerPhone } = props && props.warehouseData;
    return (
        <Fragment>
            <div className="row">
                <span className="wrapper">
                  <FloatingLabel
                    className="form-input" 
                    placeholder="Building Number & Name*" 
                    type="text" 
                    readOnly={ true }
                    value={ houseNumber }
                  />
                </span>
                <span className="wrapper">
                  <FloatingLabel
                    className="form-input" 
                    placeholder="Street*" 
                    type="text" 
                    readOnly={ true }
                    value={ street }
                  />
                </span>
                <span className="wrapper">
                  <FloatingLabel
                    className="form-input" 
                    placeholder="Zip Code*" 
                    type="text" 
                    readOnly={ true }
                    value={ zipCode }
                  />
                </span>
            </div>

            <div className="row">
                <span className="wrapper">
                  <FloatingLabel
                    className="form-input" 
                    placeholder="City*" 
                    type="text" 
                    readOnly={ true }
                    value={ city }
                  />
                </span>
                <span className="wrapper">
                  <FloatingLabel
                    className="form-input" 
                    placeholder="County*" 
                    type="text" 
                    readOnly={ true }
                    value={ county }
                  />
                </span>
                <span className="wrapper">
                  <FloatingLabel
                    className="form-input" 
                    placeholder="State*" 
                    type="text" 
                    readOnly={ true }
                    value={ state }
                  />
                </span>
            </div>

            <div className="row">
                <span className="wrapper">
                  <FloatingLabel
                    className="form-input" 
                    placeholder="Country*" 
                    type="text" 
                    name="productName"
                    readOnly={ true }
                    value={ country }
                  />
                </span>
                <span className="wrapper">
                  <FloatingLabel
                    className="form-input" 
                    placeholder="Phone*" 
                    type="text" 
                    readOnly={ true }
                    value={ managerPhone }
                  />
                </span>
            </div>
        </Fragment>
    );
};

export default DeliveryWarehouseComponent;