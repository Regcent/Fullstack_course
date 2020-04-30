import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header />
      <Button handleClick={() => setGood(good + 1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button handleClick={() => setBad(bad + 1)} text='bad'/>
      <h2>Statistics</h2>
      <Counter name="good" value={good}/>
      <Counter name="neutral" value={neutral}/>
      <Counter name="bad" value={bad}/>
    </div>
  )
}

const Header = () => (
  <>
    <h2>give feedback</h2>
  </>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Counter = ({name, value}) => <div>{name} {value}</div>

ReactDOM.render(<App />, 
  document.getElementById('root')
)
