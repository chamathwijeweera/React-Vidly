import React from "react";
import Input from "./input";

const SearchBox = ({ value, onChange }) => {
  return (
    <Input
      name="query"
      type="text"
      placeholder="Search.."
      className="form-control my-3"
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
