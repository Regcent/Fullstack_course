import React, { useState } from 'react';
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

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
        <Filter filter={newFilter} setNewFilter={setNewFilter}/>
        <h2>Add a new</h2>
        <PersonForm newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} addContact={addContact}/>
        <h2>Numbers</h2>
        <Persons persons={persons} filterToUse={newFilter}/>
      </div>
    )
  }
  
  export default App