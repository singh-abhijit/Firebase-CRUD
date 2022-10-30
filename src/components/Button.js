import React from "react";

const Button = ({ variant, children, className, ...rest }) => {
  return (
    <button className={`button-${variant} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
