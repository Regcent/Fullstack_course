import React from 'react'

const Total = ({ course }) => {
    const sum = course.parts.reduce((sum, part) => sum += part.exercises, 0)
    return(
      <p>total of {sum} exercises</p>
    ) 
  }

export default Total