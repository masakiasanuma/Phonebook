const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/info', (req, res) => {
    Person.countDocuments({}, (err, count) => {
        res.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`)
    })
})

personsRouter.get('/', (req, res, next) => {
    Person.find({})
        .then(result => {
            res.json(result.map(person => person.toJSON()))
        })
        .catch(err => next(err))
})

personsRouter.get('/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

personsRouter.post('/', (req, res, next) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedAndFormattedPerson => res.json(savedAndFormattedPerson))
        .catch(error => next(error))
})

personsRouter.put('/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => updatedPerson.toJSON())
        .then(updatedAndFormattedPerson => res.json(updatedAndFormattedPerson))
        .catch(error => next(error))
})

personsRouter.delete('/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

module.exports = personsRouter