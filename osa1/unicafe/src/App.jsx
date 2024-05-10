import { useState } from 'react'

const Statistics = ({good,neutral,bad,all}) => {
  return (
  <div>
  <h1>statistics</h1>
  <p>
    good {good}<br></br>
    neutral {neutral}<br></br>
    bad {bad}<br></br>
    all {all}<br></br>
    average {(good-bad)/all}<br></br>
    positive {good/all*100} %
  </p></div>
  )
  
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good+neutral+bad
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>
      {Statistics({good,neutral,bad,all})}
    </div>
  )
}

export default App