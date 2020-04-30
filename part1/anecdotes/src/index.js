import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(props.pointsInit)
  console.log(points)

  const nextClickHandler = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

  const voteClickHandler = () => {
    console.log(selected)
    const copy = [...points]
    copy[selected] += 1
    console.log(copy)
    setPoints(copy)
  }

  const findIndexOfMax = (array) => {
    let candidate = array[0]
    let index = 0 
    for(let i = 1; i < array.length; i++) {
      if (array[i] > candidate) {
        candidate = array[i]
        index = i
      }
    }
    return index
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <button onClick={nextClickHandler}>next anecdote</button>
      <button onClick={voteClickHandler}>vote</button>
      <h2>Anecdote with most votes</h2>
      <div>{props.anecdotes[findIndexOfMax(points)]}</div>
      <div>has {points[findIndexOfMax(points)]} votes</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const pointsInit = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0)
console.log(pointsInit)

ReactDOM.render(
  <App anecdotes={anecdotes} pointsInit={pointsInit}/>,
  document.getElementById('root')
)