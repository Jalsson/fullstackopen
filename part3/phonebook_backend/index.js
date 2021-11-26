const express = require("express");
const app = express();
const morgan = require('morgan')
app.use(express.json());

const myMorgan = morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
})
app.use(myMorgan)

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

// Routes
app.use("/info", require("./routes/info"))
app.use("/api/persons", require("./routes/person"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log("Server started on port " + PORT));