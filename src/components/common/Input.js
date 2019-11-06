import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/index.scss';

const Input = props => {
  const { id, name, type, placeholder, className, value, defaultValue, required, pattern, disabled, readOnly, maxLength, textChange, onBlur, onCopy, onPaste, keyPress } = props;
  return (
      <input
        id={ id }
        name={ name }
        type={ type }
        placeholder={ placeholder }
        className={ className }
        value={ value }
        defaultValue={ defaultValue }
        required={ required }
        pattern={ pattern }
        disabled={ disabled }
        readOnly={ readOnly }
        maxLength={ maxLength }
        onChange={ textChange }
        onBlur={ onBlur }
        onCopy={ onCopy }
        onPaste={ onPaste }
        onKeyPress={ keyPress }
      />
  );
};

Input.defaultProps = {
  type: 'input',
  placeholder: ''
};

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.string,
  disabled: PropTypes.string,
  readOnly: PropTypes.string,
  maxLength: PropTypes.string,
  textChange: PropTypes.func,
  onBlur: PropTypes.func,
  onCopy: PropTypes.func,
  onPaste: PropTypes.func
};

export default Input;
