const express = require("express");
const router = express.Router();
const persons = require('../persons')
const fs = require('fs');
const mongoose = require('mongoose')
const password = require('../secret')
const uniqueValidator = require('mongoose-unique-validator');

const numberSchema = new mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    number: {type: String, required: true, unique: true},
})

numberSchema.plugin(uniqueValidator)

const Phone = mongoose.model('Phone', numberSchema)

const url =
    `mongodb+srv://nnadmin:${password}@phonbook.3qw1b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


router.get("/", async (req, res, next) => {

    await mongoose.connect(url)

    Phone.find({}).then(result => {
        res.send(result)
        mongoose.connection.close()
    }).catch((error) => next(error))

});

router.get("/:id", async (req, res, next) => {
    const id = req.params.id
    await mongoose.connect(url)

    Phone.find({_id: id}).then(result => {
        res.send(result)
        mongoose.connection.close()
    }).catch((error) => next(error))


});

router.post("/", async (req, res, next) => {
    const newPerson = req.body
    let found = false

    if (newPerson.number == undefined) {
        res.status(400).send({error: 'No number added'})
        return
    }
    await mongoose.connect(url)
    const note = new Phone({
        userName: newPerson.name,
        number: newPerson.number
    })
    console.log("saving new person")
    note.save().then(result => {
        res.sendStatus(200)
        mongoose.connection.close()
    }).catch((error) => next(error))

});

router.delete("/:id", async (req, res, next) => {
    const id = req.params.id
    await mongoose.connect(url)
    Phone.deleteOne({_id: id}).then(result => {

        res.sendStatus(200)
        mongoose.connection.close()

    }).catch((error) => next(error))
});


module.exports = router;