import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/index.scss';

const Button = props => {
  const { type, className, onClick, disabled } = props;
  return (
    <button
      type={ type }
      className={ `${className} roundedCorner` }
      onClick={ onClick }
      disabled={ disabled }
    >
      {props.name}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  className: 'large-button'
};

Button.propTypes  = {
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default Button;