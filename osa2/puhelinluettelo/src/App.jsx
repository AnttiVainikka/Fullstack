import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  } 
  return (
    <div className={error ? "error" : "notification" }>
      {message}
    </div>
  )
}

const RenderPersons = (props) => {
  let persons = props.persons
  if (props.filter) {
    persons = persons.filter((person) => person.name.toLowerCase().includes(props.filter))
  }
  return persons.map(person => <p key={person.id}>{person.name} {person.number} 
  <button onClick={props.deletePerson(person.id)}>delete</button></p>
  )
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
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [activeFilter, setActiveFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {setPersons(initialPersons)})
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      if (confirm('Name already exists. Will you update number?')) {
        const existingPerson = persons.find(person => person.name === newName)
        const changedNumber = { ...existingPerson, number: newNumber}
        personService
          .update(existingPerson.id,changedNumber)
          .then(updatedPerson => {
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : updatedPerson))
            setNotification(`Number of ${newName} has been updated`)
              setTimeout(() => {
                setNotification(null)
              }, 4000)
          })
          .catch(error => {
            console.log(error)
            setPersons(persons.filter(person => person.id !== existingPerson.id))
            setNotification(`Information on ${existingPerson.name} has been deleted`)
            setError(true)
            setTimeout(() => {
              setNotification(null)
              setError(false)
            }, 4000)
          })
        
      }
    } 
    else {
      personService
        .create({name : newName, number : newNumber})
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
        })
        setNotification(`${newName} has been added`)
        setTimeout(() => {
          setNotification(null)
        }, 4000)
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const askPermission = () => {
      if (confirm("Are you sure you wish to delete this person?")) {
        personService
          .del(id)
          .then(response => {
            setNotification(`${response.name} has been deleted`)
            setTimeout(() => {
              setNotification(null)
            }, 4000)
          })
          .catch(error => {
            console.log(error)
            setNotification('Person has already been deleted')
            setError(true)
            setTimeout(() => {
              setNotification(null)
              setError(false)
            }, 4000)
          })
        setPersons(persons.filter(person => person.id !== id))
      }
    }
    return askPermission
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

      <Notification message={notification} error={error}/>

      <FilterPersons setActiveFilter={setActiveFilter}
      newFilter={newFilter} handleFilterChange={handleFilterChange}/>

      <h3>add a new</h3>

      {AddPersons({addPerson,newName,handleNameChange,newNumber,handleNumberChange})}
      
      <h3>Numbers</h3>

      <RenderPersons persons={persons} filter={activeFilter} deletePerson={deletePerson}/>
    </div>
  )

}

export default App
