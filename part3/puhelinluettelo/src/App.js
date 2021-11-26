import React, {useState, useEffect} from 'react'
import personService from './services/persons'
import './styles.css'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    getResults()
  }, [])

  async function getResults() {
    const response = await personService.getAll().catch((error) => {
      console.log(error)
      setInfoMessage('error fetching data')
      setInfoStatus('error')
      setPersons([])
    })
    if (response !== undefined) {
      setPersons(response.data)
    }
  }

  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [infoMessage, setInfoMessage] = useState('')
  const [infoStatus, setInfoStatus] = useState('success')

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

  useEffect(() => {
    if (infoMessage !== '')
      setTimeout(function () {
        setInfoMessage('')
        setInfoStatus('success')
      }
        , 3000)
  }, [infoMessage])

  const addNewNumber = (event) => {
    event.preventDefault()
    const trimmedName = newName.trim()
    const trimmedNumber = newNumber.trim()
    if (persons.some(e => e.name === trimmedName)) {
      if (window.confirm(`${trimmedName} is already added to phonebook, replace number with new one?`)) {
        personService.changePerson({name: trimmedName, number: trimmedNumber, id: persons.filter(obj => obj.name === trimmedName)[0].id}).then((_) => getResults(), clearFields(), setInfoMessage(trimmedName + ' number was changed'))
      }
      return
    }

    const personCopy = [...persons]
    personService.addNew({name: trimmedName, number: trimmedNumber})
    personCopy.push({name: trimmedName, number: trimmedNumber})
    setPersons(personCopy)
    clearFields()
    setInfoMessage(trimmedName + ' added')
  }

  const clearFields = () => {
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = async (person) => {
    if (window.confirm('Delete?')) {
      await personService.deletePerson(person).catch((error) => {
        console.log(error)
        setInfoMessage('Person is already deleted')
        setInfoStatus('error')
        getResults()
      })
      getResults()
      setInfoMessage(person.name + ' was deleted')
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      {infoMessage === '' ? <div /> : <InfoMessage message={infoMessage} statusClass={infoStatus} />}
      <Filter value={filter} onInput={(event) => onInput(event, 'filter')} />
      <h2>Add new</h2>
      <PersonForm onSubmit={addNewNumber} nameValue={newName} onInput={onInput} numberValue={newNumber} />
      <h2>Numbers</h2>
      <Persons deletePerson={deletePerson} filter={filter} persons={persons} />
      ...
    </div>
  )

}

const InfoMessage = ({message, statusClass}) => {
  return (<div className={statusClass}>{message}</div>)
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

  return (<> {props.persons.map((person, index) => person.name.toLowerCase().includes(props.filter.toLowerCase()) ? (
    <div key={index}><h2 >{person.name} {person.number} <button onClick={() => props.deletePerson(person)}>DELETE</button></h2> </div>
  ) : null)}</>)
}

export default App