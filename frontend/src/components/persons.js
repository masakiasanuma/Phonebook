import React from 'react'
import personService from '../services/person'

const Persons = ({ persons, setPersons }) => {

    const handleDeleteClick = (begonePerson) => {
        const { id, name } = begonePerson
        if (window.confirm(`Delete ${name}?`)) {
            personService
                .begone(id)
                .then(data => {
                    setPersons(persons.filter(person => person.id !== id))
                })
        }
    }

    const rows = () => persons.map(person => 
        <li key={person.id}>
            {person.name} {person.number} 
            <button onClick={() => handleDeleteClick(person)}>
                delete
            </button>
        </li>    
    )   

    return (
        <ul>
            {rows()}
        </ul>
    )
}

export default Persons