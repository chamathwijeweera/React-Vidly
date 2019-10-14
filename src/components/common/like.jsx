import React, { Component } from "react";
import PropTypes from "prop-types";

class Like extends Component {
  render() {
    const likeClass = this.props.likeStatus ? "fa-thumbs-up" : "fa-thumbs-o-up";
    return (
      <i
        className={`fa ${likeClass}`}
        aria-hidden="true"
        style={{ cursor: "pointer" }}
        onClick={this.props.onLikeToggle}
      ></i>
    );
  }
}

Like.propTypes = {
  onLikeToggle: PropTypes.func.isRequired
};

export default Like;
