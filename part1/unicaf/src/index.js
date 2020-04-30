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
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Header = () => <h2>give feedback</h2>

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Statistic = ({name, value}) => (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if (all > 0) {
    return (
      <>
        <h2>Statistics</h2>
        <table>
          <tbody> 
            <Statistic name="good" value={good}/>
            <Statistic name="neutral" value={neutral}/>
            <Statistic name="bad" value={bad}/>
            <Statistic name="all" value={all}/>
            <Statistic name="average" value={(good - bad) / all}/>
            <Statistic name="Percentage" value={(good * 100 / all) + "%"}/>
          </tbody>
        </table>
      </>
    )
  }
  else return (
    <>
      <h2>Statistics</h2>
      <div>No feedback given</div>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
