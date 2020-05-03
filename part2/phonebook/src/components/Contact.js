import React from 'react'

const Contact = ({person, deletePersonWithId}) => (
    <li>
        {person.name} {person.number}
        <button onClick={deletePersonWithId(person.id)}>delete</button>
    </li>
)

export default Contact