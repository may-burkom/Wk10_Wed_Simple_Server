//express framework
const express = require('express')
//used to handle form data
const multer = require('multer')
//allow access to resources from different origins
const cors = require('cors')
//mongoose to connect database
const mongoose = require('mongoose')

//use to populate DB
const data = require('./data.js')
//provide a model for DB, structure that it can understand
const People = require('./models/People.js')
//has my password and DB name - would like to know a better way to do this
const accessDB = require('./mongoAccess.js')

const app = express()
const upload = multer()
//storing it in a constant
const pswDB = accessDB.MONGODB_URI
//port number
const port = 3000

//??? not too sure what this does, but I think it's to do with handling request from different origins
app.use(cors())
//use to parse the body
app.use(express.urlencoded({ extended: true }))
//??? not sure, used to handle forms
app.use(upload.array())
//method to recognize request objects as JSON objects
// app.use(express.json())

//connect to mongo database
mongoose.connect(pswDB, {useNewUrlParser: true, useUnifiedTopology: true},
    function(err, database){
        if(err){
            throw err
        }
        console.log("Connection made to WK10_Wed_Sending_Forms DB")
    }    
)

//find previous entries to display
app.get('/display', function(req, res){
    console.log("display route hit")
    //if parameters not specified, everything will get sent back
    People.find({})
        .then(function(storedInfo){
            console.log(storedInfo)
            res.send(storedInfo)
        })
})

//registers users, saves to DB
app.post('/register', function(req, res){
    console.log("register route hit")
    console.log(req.body)
    console.log(req.body.username)
    let userObject = {
        name: req.body.username,
        age: req.body.userage,
        email: req.body.useremail,
        phone: req.body.userphone
    }
    userToAdd = new People(userObject)

    userToAdd.save()
        .then(function(user) {
            console.log("USER SAVED!")
            console.log(user)
            res.send(user)
        })
        .catch(function(err) {
            console.log(err)
        })
})

app.listen(port, function(){
    console.log(`listening at http://localhost:${port}`)
})