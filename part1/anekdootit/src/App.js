import React, {useState} from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(randomNumber(0, anecdotes.length))
  const [points, setPoints] = useState(anecdotes.map(_ => 0))
  const [topIndex, setTopIndex] = useState(0);

  const newAnecdote = () => {
    setSelected(randomNumber(0, anecdotes.length))
  }
  const voteAnecdote = () => {
    let tempPoints = [...points]
    tempPoints[selected] += 1
    setPoints(tempPoints)

    const topNum = [...tempPoints];
    setTopIndex(topNum.indexOf(Math.max(...topNum)));
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>
        Has {points[selected]} votes
        <br />
        <button onClick={voteAnecdote}>Vote</button>
        <button onClick={newAnecdote}>Next anecdote</button>
      </div>


      <div>
        <h1>
          Anecdote with most votes
        </h1>
        {anecdotes[topIndex]}
        <h3>
        has {points[topIndex]} votes
        </h3>
      </div>
    </div>
  )

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

export default App