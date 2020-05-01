import React, { useState } from 'react';
import Contact from './components/Contact'

const App = () => {
    const [ persons, setPersons ] = useState([
      { name: 'Arto Hellas' }
    ]) 
    const [ newName, setNewName ] = useState('')
  
    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const addName = (event) => {
        event.preventDefault()
        setPersons(persons.concat({name: newName}))
        setNewName('')
    }


    return (
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={addName}>
          <div>
            name: <input 
            value={newName}
            onChange={handleNameChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        {persons.map((person) => <Contact key={person.name} number='' name={person.name}/>)}
      </div>
    )
  }
  
  export default App