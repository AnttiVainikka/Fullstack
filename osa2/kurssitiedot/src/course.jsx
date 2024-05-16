const Course = ({course}) => {
    const parts = course.parts
    const exsum = parts.map(part => part.exercises).reduce(
      (s,p) => s+p,
      0,
    )
    return (
      <div>
        <h2>{course.name}</h2>
        {parts.map(part => <p key={part.id}>
          {part.name} {part.exercises}
          </p>)}
        <b>total of {exsum} exercises</b>
      </div>
    )
  }

export default Course