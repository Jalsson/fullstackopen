const express = require("express");
const router = express.Router();

// Welcome page
router.get("/", (req, res) => res.send("welcome"));


module.exports = router;