const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://nnadmin:${password}@phonbook.3qw1b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const numberSchema = new mongoose.Schema({
    userName: String,
    number: String,
})

const Phone = mongoose.model('Phone', numberSchema)

if (process.argv.length < 5) {
    console.log('phonebook:')
    Phone.find({}).then(result => {
        result.forEach(note => {
            console.log(`${note.userName} ${note.number}`)
        })
        mongoose.connection.close()
    })

} else {
    const note = new Phone({
        userName: process.argv[3],
        number: process.argv[4]
    })

    note.save().then(result => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}

