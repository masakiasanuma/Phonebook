import axios from 'axios'

const baseURL = "/api/persons"

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(baseURL, newPerson)
    return request.then(response => response.data)
}

const begone = id => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const update = newPerson => {
    const request = axios.put(`${baseURL}/${newPerson.id}`, newPerson)
    return request.then(response => response.data)
}

export default { getAll, create, begone, update }


