const express = require("express");
const router = express.Router();

// Welcome page
router.get("/", (req, res) => res.render("welcome"));
// dashboard
router.get("/dashboard", (req, res) => 
res.send("dashboard"));

module.exports = router;