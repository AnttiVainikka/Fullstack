import { useState } from 'react'

const RenderPersons = (props) => {
  let persons = props.persons
  if (props.filter) {
    persons = persons.filter((person) => person.name.toLowerCase().includes(props.filter))
  }
  return persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
}

const FilterPersons = (props) => {

  const filterPerson = (event) => {
    event.preventDefault()
    props.setActiveFilter(props.newFilter.toLowerCase())
  }

  return(
    <form onSubmit={filterPerson}>
      filter shown with
      <input
      value={props.newFilter}
      onChange={props.handleFilterChange}
      />
    </form>
  )
}

const AddPersons = ({addPerson,newName,handleNameChange,newNumber,handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: 
        <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number:
        <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [activeFilter, setActiveFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
    setPersons(persons.concat({name : newName, number : newNumber}))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <FilterPersons setActiveFilter={setActiveFilter}
      newFilter={newFilter} handleFilterChange={handleFilterChange}/>

      <h3>add a new</h3>

      {AddPersons({addPerson,newName,handleNameChange,newNumber,handleNumberChange})}
      
      <h3>Numbers</h3>
      
      <RenderPersons persons={persons} filter={activeFilter}/>
    </div>
  )

}

export default App
