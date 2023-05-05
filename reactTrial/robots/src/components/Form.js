import React from 'react'

const Form = (props) => {
    return (
        <form onSubmit={props.handleRobotAdd}>
            <p>What is your new robot's name?</p>
            <input
                type='text'
                placeholder='name'
                value={props.input}
                onChange={props.handleInput} />
            <button>Create Robot</button>
        </form>
    )
}

export default Form