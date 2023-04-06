import React from "react";
import "./TipPercentage.scss";

function TipPercentage(props) {
  return (
    <div
      className={`tip-percentage ${props.className}`}
      onClick={props.onClick}
    >
      {props.percentages}%
    </div>
  );
}

export default TipPercentage;
