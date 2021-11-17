import React from "react"

const Total = (props) => {

    let number = 0
    props.parts.map(value => number += value.exercises)
    return (<p>Number of exercises {number}</p>)

}

export default Total