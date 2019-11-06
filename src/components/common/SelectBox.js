import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const SelectBox = props => {
    const { className, options, searchable, placeholder, selectedValue, onChange, onBlur } = props;
    return (
        <Select 
          className={ className }
          options= { options }
          isSearchable={ searchable }
          placeholder= { placeholder }
          value={ selectedValue }
          onChange={ onChange }
          onBlur={ onBlur }
        />
    );
};

SelectBox.defaultProps = {
    isSearchable: 'false'
};

SelectBox.propTypes = {
    className: PropTypes.string,
    options: PropTypes.string,
    isSearchable: PropTypes.bool,
    placeholder: PropTypes.placeholder,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
};

export default SelectBox;
