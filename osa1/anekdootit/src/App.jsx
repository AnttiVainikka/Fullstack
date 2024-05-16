import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ] 

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0)) 

  const randomNumberGenerator = (max) => {
    return (
      Math.floor(Math.random() * (max+1))
    )
  }

  const generateAnecdote = () => {
    setSelected(randomNumberGenerator(anecdotes.length-1))
  }

  const giveVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVoted = () => {
    let highest = 0
    let anec = false
    for (let i = 0; i < anecdotes.length; i++) {
      if (votes[i] > highest) {
        highest = votes[i]
        anec = anecdotes[i]
      }
    }
    if (anec) {
      return (
        <div>
          <h1>Anecdote with most votes</h1>
          <p>{anec}<br></br>has {highest} votes</p>
        </div>
      )
    }
    return
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}
      <br></br>
      has {votes[selected]} votes
      </p>
      <button onClick={giveVote}>vote</button>
      <button onClick={generateAnecdote}>next anecdote</button>
      {mostVoted()}
    </div>
  )
}

export default App