import React, { Component } from "react";
import PropType from "prop-types";

class DropDown extends Component {
  state = {
    pageSizes: [3, 5, 10]
  };

  render() {
    return (
      <React.Fragment>
        <select
          className="custom-select custom-select-sm form-control form-control-sm"
          style={{ width: "auto" }}
          onChange={event =>
            this.props.onPageCountChange(parseInt(event.target.value))
          }
        >
          {this.state.pageSizes.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </React.Fragment>
    );
  }
}

DropDown.propTypes = {
  onPageCountChange: PropType.func.isRequired
};

export default DropDown;
