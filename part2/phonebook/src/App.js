import React, { useState, useEffect } from 'react';
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Error from './components/Error'
import personsService from './services/contacts.js'
import './index.css'

const App = () => {
    const [ persons, setPersons ] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')
    const [ notification, setNotification ] = useState(null)
    const [ errorMessage, setErrorMessage ] = useState(null)

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
                .then(updatedPerson => {
                  setPersons(persons.map((person) => person.id !== id ? person : updatedPerson))
                  setNotification(`${newName} was updated`)
                  setTimeout(() => {
                    setNotification(null)
                  }, 3000)
                })
                .catch(error => {
                  setErrorMessage(`${newName}'s information has already been deleted from server.`)
                  setPersons(persons.filter(person => person.id !== id ? person : null))
                  setTimeout(() => {
                    setErrorMessage(null)
                  }, 3000)
            })
          }
        }
        else {
            personsService
              .create({name: newName, number: newNumber})
              .then(createdPerson => {
                setPersons(persons.concat(createdPerson))
                setNotification(`${newName} was added`)
                setTimeout(() => {
                  setNotification(null)
                }, 3000)
              })
            setNewName('')
            setNewNumber('')
        }
      }

    const deletePersonWithId = (id) => {
      return (event) => {
        const name = persons.find((person) => person.id === id).name
        if (window.confirm(`Delete ${name}?`)) {
          personsService.deleteContact(id)
          setPersons(persons.filter(person => person.id !== id ? person : null))
          setNotification(`${name} was deleted`)
            setTimeout(() => {
              setNotification(null)
            }, 3000)
        }
      }
    }
    
    return (
      <div>
        <h2>Phonebook</h2>
        <Notification message={notification} />
        <Error message={errorMessage} />
        <Filter filter={newFilter} setNewFilter={setNewFilter}/>
        <h2>Add a new</h2>
        <PersonForm newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} addContact={addContact}/>
        <h2>Numbers</h2>
        <Persons persons={persons} filterToUse={newFilter} deletePersonWithId={deletePersonWithId}/>
      </div>
    )
  }
  
  export default App