import React from 'react'
import Contact from './Contact'

const Persons = ({persons, filterToUse, deletePersonWithId}) => (
    <>
        {persons.filter((person) => (person.name.toLowerCase().startsWith(filterToUse.toLowerCase())))
            .map((person) => <Contact key={person.name} person={person} deletePersonWithId={deletePersonWithId}/>)}
    </>
)

export default Persons