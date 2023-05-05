import React from 'react'

const Robot = (props) => {
    return (
        <div className='robot-card'>
            <h3>{props.robot.name}</h3>
            <img src={props.robot.picture} alt='robot profile'/>
        </div>
    )
}

export default Robot