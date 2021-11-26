const express = require("express");
const router = express.Router();
const persons = require('../persons')
// Welcome page
router.get("/", (req, res) => {
    let message = `Phonebook has info for ${persons.length} people <br><br> ${Date()}`
    res.send(message)
});


module.exports = router;