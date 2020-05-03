import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

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

/*const delete = (contactId) => {
    return axios
        .delete(`${baseUrl}/${contactId}`)
        .then((response) => {
            console.log(response)
            return response.data
        })
}*/

export default {getAll, create}