import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Spinner from "./common/spinner";

const LoadingBar = props => {
  const { promiseInProgress } = usePromiseTracker();
  return <div>{promiseInProgress === true ? <Spinner /> : null}</div>;
};

export default LoadingBar;
