import React from "react";
import "./TipPercentage.scss";

function TipPercentage(props) {
  return (
    <button
      className={`tip-percentage ${props.className}`}
      onClick={props.onClick}
    >
      {props.percentages}%
    </button>
  );
}

export default TipPercentage;
