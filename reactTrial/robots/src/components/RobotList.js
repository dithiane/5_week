import React from 'react'
import Robot from './Robot'

const RobotList = (props) => {
    if (props.robots) {
        return (
            <div className='robot-list'>
                <h2>Your Robots</h2>
                <ul >
                    {
                        props.robots.map((robot, i) => {
                            return <Robot key={i} robot={robot}/>
                        })
                    }
                </ul>
            </div>
        )
    } else {
        return (
            <h2 className='robot-list'>You don't have any robots yet!</h2>
        )
    }
}

export default RobotList