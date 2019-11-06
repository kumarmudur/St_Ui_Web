import React from 'react';
import PropTypes from 'prop-types';

const Radio = props => {
    const { type, value, name, checked, onChange } = props;
    return (
        <input 
          type={ type } 
          value= { value }
          name= { name }
          checked={ checked }
          onChange={ onChange }
        />
    );
};

Radio.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
};

export default Radio;
