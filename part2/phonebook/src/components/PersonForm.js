import React from 'react'

const PersonForm = (props) => {

    const handleNameChange = (event) => props.setNewName(event.target.value)

    const handleNumberChange = (event) => props.setNewNumber(event.target.value)

    return (
        <form onSubmit={props.addContact}>   
            <div>
                name: <input 
                    value={props.newName}
                    onChange={handleNameChange}/>
            </div>
            <div>
                number: <input 
                    value={props.newNumber}
                    onChange={handleNumberChange}/></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm