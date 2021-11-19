import React, {useState,useEffect } from 'react'
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    async function getResults() {
      const results = await axios('http://localhost:3001/persons');
      setPersons(results.data)
    }
    getResults()
  }, [])

  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const onInput = (inputEvent, parameter) => {
    const value = inputEvent.target.value
    switch (parameter) {
      case 'name':
        setNewName(value)
        break;
      case 'filter':
        setFilter(value)
        break;
      default:
        setNewNumber(value)
        break;
    }
  }

  const addNewNumber = (event) => {
    event.preventDefault()
    const trimmedName = newName.trim()
    const trimmedNumber = newNumber.trim()
    if (persons.some(e => e.name === trimmedName)) {
      alert(`${trimmedName} is already added to phonebook`)
      return
    }

    const personCopy = [...persons]
    personCopy.push({name: trimmedName, number: trimmedNumber})
    setNewName('')
    setNewNumber('')
    setPersons(personCopy)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onInput={(event) => onInput(event, 'filter')} />
      <h2>Add new</h2>
      <PersonForm onSubmit={addNewNumber} nameValue={newName} onInput={onInput} numberValue={newNumber} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} />
      ...
    </div>
  )

}

const Filter = (props) => {
  return (<div>find person:<input type="text" value={props.value} onInput={props.onInput} /></div>)
}

const PersonForm = (props) => {


  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.nameValue} onInput={(event) => props.onInput(event, 'name')} />
      </div>
      <div>number: <input type="number" value={props.numberValue} onInput={(event) => props.onInput(event, 'number')} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>)
}

const Persons = (props) => {

  return (<> {props.persons.map((person, index) => person.name.toLowerCase().includes(props.filter.toLowerCase()) ? (<h2 key={index}>{person.name} {person.number}</h2>) : null)}</>)
}

export default App