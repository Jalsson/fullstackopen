import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = async () => {
    const results = await axios(baseUrl)
    return results
}

const addNew = async (newPerson) => {
    const results = await axios.post(baseUrl, newPerson)
    return results

}

const deletePerson = async (person) => {
    const results = await axios.delete(`${baseUrl}/${person.id}`)
    return results
}

const changePerson = async (person) => {
    const results = await axios.put(`${baseUrl}/${person.id}`,person)
    return results
}



export default {
    getAll: getAll,
    addNew: addNew,
    deletePerson: deletePerson,
    changePerson: changePerson
}