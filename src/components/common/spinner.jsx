import React, { Component } from "react";
import { css } from "@emotion/core";
import { ScaleLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  render() {
    return (
      <div className="sweet-loading" style={{ textAlign: "center" }}>
        <ScaleLoader
          css={override}
          sizeUnit={"px"}
          size={16}
          color={"#123abc"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default Spinner;
