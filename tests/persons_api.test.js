const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Person = require('../models/person')

const api = supertest(app)

const initialPersons = [
    {
        name: "Masaki Asanuma",
        number: "123-123-123"
    },
    {
        name: "Gary Liu",
        number: "333-333-332"
    }
]

beforeEach(async () => {
    await Person.deleteMany({})

    let person = new Person(initialPersons[0])
    await person.save()

    person = new Person(initialPersons[1])
    await person.save()
})

describe('General Functionalities', () => {
    test('Persons are returned as json', async () => {
        await api
            .get('/api/persons')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
    })
})

afterAll(() => {
    mongoose.connection.close()
})