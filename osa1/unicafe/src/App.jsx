import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <div>
      {text} {value}
    </div>
  )
}

const Statistics = ({good,neutral,bad,all}) => {
  if (all !== 0) {
    return (
    <div>
    <h1>statistics</h1>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="average" value ={(good-bad)/all} />
      <StatisticLine text="positive" value ={good/all*100+' %'}  />
    </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>
  
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good+neutral+bad
  const giveGood = () => setGood(good + 1)
  const giveNeutral = () => setNeutral(neutral + 1)
  const giveBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={giveGood} text="good"/>
      <Button handleClick={giveNeutral} text="neutral"/>
      <Button handleClick={giveBad} text="bad"/>
      {Statistics({good,neutral,bad,all})}
    </div>
  )
}

export default App