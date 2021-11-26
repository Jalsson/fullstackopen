const express = require("express");
const router = express.Router();
const persons = require('../persons')
const fs = require('fs');
const mongoose = require('mongoose')
const password = require('../secret')

const numberSchema = new mongoose.Schema({
    userName: String,
    number: String,
})

const Phone = mongoose.model('Phone', numberSchema)

const url =
    `mongodb+srv://nnadmin:${password}@phonbook.3qw1b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


router.get("/", (req, res) => {

    mongoose.connect(url)

    Phone.find({}).then(result => {
        res.send(result)
        mongoose.connection.close()
    })

});

router.get("/:id", (req, res) => {
    const id = req.params.id
    mongoose.connect(url)

    Phone.find({_id: id}).then(result => {
        res.send(result)
        mongoose.connection.close()
    }).catch((error) => {
        res.sendStatus(404)
        mongoose.connection.close()
    })


});

router.post("/", (req, res) => {
    const newPerson = req.body
    let found = false

    if (newPerson.number == undefined) {
        res.status(400).send({error: 'No number added'})
        return
    }
    console.log("finding person")
    Phone.find({userName: newPerson.name}).then(result => {
        console.log("person result")
        res.status(400).send({error: 'name must be unique'})
        mongoose.connection.close()
    }).catch((error) => {
        const note = new Phone({
            userName: newPerson.name,
            number: newPerson.number
        })
        console.log("saving new person")
        note.save().then(result => {
            res.sendStatus(200)
            mongoose.connection.close()
        }).catch((error) => {
            res.status(400).send({error: `${error}`})
            mongoose.connection.close()
        })

    })
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