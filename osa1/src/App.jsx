const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  const parts = props.parts
  const exercises = props.exercises
  var contents = []
  for (let i=0; i<parts.length; i++) {
    contents[i] = <p>{parts[i]} {exercises[i]}</p>
  }
  return (
    <div>
      {contents[0]}
      {contents[1]}
      {contents[2]}
    </div>
  )
}

const Total = (props) => {
  return <p>Number of exercises {props.exercises.reduce((a,c) => a+c, 0)}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts = [part1,part2,part3]
  const exercises = [exercises1,exercises2,exercises3]
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total exercises={exercises} />
    </div>
  )
}

export default App