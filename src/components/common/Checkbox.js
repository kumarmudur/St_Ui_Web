import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = props => {
    const { type, value, name, checked, onChange, className} = props;
    return (
        <input 
          type={ type } 
          value={ value }
          name = { name }
          checked= { checked }
          onChange={ onChange }
          className={ className }
        />
    );
};

Checkbox.defaultProps = {
    type: 'checkbox',
    checked: 'false'
  };

Checkbox.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.string,
    onChange: PropTypes.func
};

export default Checkbox;

