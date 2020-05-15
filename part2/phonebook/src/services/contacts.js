import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
}

const create = (newContact) => {
    return axios
        .post(baseUrl, newContact)
        .then(response => response.data)
}

const deleteContact = (contactId) => {
    return axios
        .delete(`${baseUrl}/${contactId}`)
        .then(response => response.data)
}

const update = (contactId, updatedContact) => {
    return axios
        .put(`${baseUrl}/${contactId}`, updatedContact)
        .then(response => response.data)
}

export default {getAll, create, deleteContact, update}