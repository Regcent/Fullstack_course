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

    useEffect(() => {
      personsService
        .getAll()
        .then(persons => {
          setPersons(persons)
        })
    }, [])


    const addContact = (event) => {
        event.preventDefault()
        if (newName === '') {
            alert("Can't add empty name to the phonebook")     
        }
        else if (persons.map((person) => person.name).includes(newName)) {
            if (window.confirm(`Update ${newName}'s number to ${newNumber}?`)) {
              const id = persons.find((person) => person.name === newName).id
              personsService
                .update(id, {name: newName, number: newNumber})
                .then(updatedPerson => setPersons(persons.map((person) => person.id !== id ? person : updatedPerson)))
            }
        }
        else {
            personsService
              .create({name: newName, number: newNumber})
              .then(createdPerson => setPersons(persons.concat(createdPerson)))
            setNewName('')
            setNewNumber('')
        }
    }

    const deletePersonWithId = (id) => {
      return (event) => {
        if (window.confirm(`Delete ${persons.find((person) => person.id === id).name}?`)) {
          personsService.deleteContact(id)
          setPersons(persons.filter(person => person.id !== id ? person : null))
        }
      }
    }
    
    return (
      <div>
        <h2>Phonebook</h2>
        <Filter filter={newFilter} setNewFilter={setNewFilter}/>
        <h2>Add a new</h2>
        <PersonForm newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} addContact={addContact}/>
        <h2>Numbers</h2>
        <Persons persons={persons} filterToUse={newFilter} deletePersonWithId={deletePersonWithId}/>
      </div>
    )
  }
  
  export default App