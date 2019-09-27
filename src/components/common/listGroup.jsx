import React, { Component } from "react";

class ListGroup extends Component {
  state = {};
  render() {
    return (
      <ul className="list-group" style={{ cursor: "pointer" }}>
        {this.props.items.map(item => (
          <li
            key={item[this.props.valueProperty]}
            className={
              item === this.props.selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => this.props.onItemSelect(item)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    );
  }
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
