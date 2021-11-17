import React from "react";

const StatisticLine  = ({ text, value }) => {
  return (
    <ul>
      <li>
      <span>{text}   --   {value}</span>
      </li>
    </ul>
  );
};

export default StatisticLine ;