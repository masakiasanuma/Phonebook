import React, { useState, useEffect } from 'react'
import personService from './services/person'
import PersonForm from './components/personform'
import Filter from './components/filter'
import Persons from './components/persons'
import Notification from './components/notification'


const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')
    const [ message, setMessage ] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(data => {
                setPersons(data)
            })
    }, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    
    const handleNumChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const sameName = (user) => user.name === newName
        if (persons.some(sameName)) {
            const makeChange = window.confirm(newName + " is already added to phonebook, replace the old number with the new one?")
            if (makeChange) {
                const samePerson = persons.find(person => person.name === newName)
                const changedPerson = { ...samePerson, number: newNumber }
                personService
                    .update(changedPerson)
                    .then(data => {
                        setMessage(
                            `${newName} has been successfully updated.`
                        )
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                        setPersons(persons.map(person => person.id !== data.id ? person : data))
                    })
                    .catch(error => {
                        setPersons(
                            persons.filter(person => person.id !== changedPerson.id)
                        )
                        setMessage(
                            `${newName} has been removed from the database.`
                        )
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    })
            }
        } else {
            const person = {
                name: newName,
                number: newNumber
            }
            
            personService
                .create(person)
                .then(data => {
                    setMessage(
                        `Added ${newName}.`
                    )
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                    setPersons(persons.concat(data))
                    setNewName('')
                    setNewNumber('')
                })
                .catch(error => {
                    setMessage(error.response.data.error)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
        }
    }

    const personsToShow = persons.filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase())
    )

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} />
            <Filter 
                filter={filter} 
                handleFilterChange={handleFilterChange} 
            />
            <h2>Add New Person</h2>
            <PersonForm 
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumChange={handleNumChange}
            />
            <h2>Numbers</h2>
            <Persons 
                persons={personsToShow} 
                setPersons={setPersons}
            />
        </div>
    )
}

export default App