import React from "react";

const Button = ({action, text}) => {
    return (
        <div>
            <button style={{margin: '10px'}} onClick={action}>{text}</button>
        </div >
    );
};

export default Button;