const express = require("express");
const app = express();
const morgan = require('morgan')
app.use(express.json());
const mongoose = require('mongoose')
const password = require('./secret')

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

 
// this has to be the last loaded middleware.


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

const url =
    `mongodb+srv://nnadmin:${password}@phonbook.3qw1b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(url)

// Routes
app.use("/info", require("./routes/info"))
app.use("/api/blog", require("./routes/blog"));


const errorHandler = (error, request, response, next) => {

    mongoose.connection.close()
    return response.status(400).send({error: `${error}`})


}


app.use(errorHandler)

const PORT = process.env.PORT || 3003;

app.listen(PORT, console.log("Server started on port " + PORT));