import React, { useState, useEffect } from 'react';
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personsService from './services/contacts.js'

const App = () => {
    const [ persons, setPersons ] = useState([]) 
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
            personsService
              .create({name: newName, number: newNumber})
              .then(createdPerson => {setPersons(persons.concat(createdPerson))})
            setNewName('')
            setNewNumber('')
        }
    }
    
    useEffect(() => {
      personsService
        .getAll()
        .then(persons => {
          setPersons(persons)
        })
    }, [])
    
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