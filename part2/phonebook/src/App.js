import React, { useState } from 'react';
import Contact from './components/Contact'

const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')
  
    const handleNameChange = (event) => setNewName(event.target.value)

    const handleNumberChange = (event) => setNewNumber(event.target.value)

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)

    }

    const addContact = (event) => {
        event.preventDefault()
        if (newName === '') {
            alert("Can't add empty name to the phonebook")     
        }
        else if (persons.map((person) => person.name).includes(newName)) {
            alert(`${newName} is already added to the phonebook`)
        }
        else {
            setPersons(persons.concat({name: newName, number: newNumber}))
            setNewName('')
            setNewNumber('')
        }
    }



    return (
      <div>
        <h2>Phonebook</h2>
        <div>
            filter shown with: <input
                value={newFilter}
                onChange={handleFilterChange}/>
        </div>
        <h2>Add a new</h2>
        <form onSubmit={addContact}>
          <div>
            name: <input 
                value={newName}
                onChange={handleNameChange}/>
          </div>
          <div>
              number: <input 
                value={newNumber}
                onChange={handleNumberChange}/></div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        {persons.filter((person) => (person.name.toLowerCase().startsWith(newFilter.toLowerCase())))
            .map((person) => <Contact key={person.name} number={person.number} name={person.name}/>)}
      </div>
    )
  }
  
  export default App