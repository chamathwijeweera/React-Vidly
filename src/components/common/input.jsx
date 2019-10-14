import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input className="form-control" {...rest} id={name} name={name} />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default Input;
