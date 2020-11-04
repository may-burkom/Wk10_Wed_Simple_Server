const mongoose = require('mongoose')
const PeopleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    email: {
        type: String
    },
    phone: {
        type: String
    }
})

const People = mongoose.model("People", PeopleSchema)
module.exports = People