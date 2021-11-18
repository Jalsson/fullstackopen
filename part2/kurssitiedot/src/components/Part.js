import React from "react"

const Part = (props) => {
    props = props.part
    return (<p>
        {props.name} {props.exercises}
    </p>)

}

export default Part