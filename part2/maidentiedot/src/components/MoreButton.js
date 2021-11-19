import React from "react";

const MoreButton = (props) => {
  return (
    <>
      <button onClick={props.handleClick} value={props.value}>
        Show
      </button>
    </>
  )
};

export default MoreButton;