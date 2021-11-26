const express = require("express");
const router = express.Router();
const persons = require('../persons')
const fs = require('fs');

router.get("/", (req, res) => {
    res.send(persons)
});

router.get("/:id", (req, res) => {
    const id = req.params.id
    let personIndex = findPerson(id)
    if (personIndex == undefined)
        res.sendStatus(404)
    else
        res.send(persons[personIndex])
});

router.post("/", (req, res) => {
    const newPerson = req.body
    let found = false

    if (newPerson.number == undefined) {
        res.status(400).send({error: 'No number added'})
        return
    }

    for (let i = 0; i < persons.length; i++) {
        const person = persons[i];
        if (newPerson.name == person.name) {
            found = true
            break;
        }
    }

    if (found) {
        res.status(400).send({error: 'name must be unique'})
        return
    }


    newPerson.id = getRandomInt(100000)
    const copy = persons
    copy.push(newPerson)
    savePersons(copy)
    res.sendStatus(200)
});

router.delete("/:id", (req, res) => {
    const id = req.params.id
    let personIndex = findPerson(id)
    if (personIndex == undefined)
        res.sendStatus(404)
    else {
        persons.splice(personIndex, 1)
        savePersons(persons)
        res.sendStatus(200)
    }
});

function findPerson(id) {
    let found = false
    let personIndex
    for (let i = 0; i < persons.length; i++) {
        const person = persons[i];
        if (person.id == id) {
            found = true
            personIndex = i
            break;
        }

    }
    return personIndex
}

const savePersons = (data) => {
    let jsonData = JSON.stringify(data)
    fs.writeFileSync('persons.json', jsonData)
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = router;