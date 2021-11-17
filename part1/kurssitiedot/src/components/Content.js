import React from "react"
import Part from "./Part"
const Content = (props) => {

    const parts = props.parts.map(value => <Part part={value} />)

    return (
        <>
            {parts}
        </>
    )

}

export default Content