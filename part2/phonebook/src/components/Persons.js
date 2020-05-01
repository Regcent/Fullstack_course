import React from 'react'
import Contact from './Contact'

const Persons = ({persons, filterToUse}) => (
    <>
        {persons.filter((person) => (person.name.toLowerCase().startsWith(filterToUse.toLowerCase())))
            .map((person) => <Contact key={person.name} number={person.number} name={person.name}/>)}
    </>
)

export default Persons