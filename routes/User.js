let User = require('../models/Users');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

var mongodbUri = 'mongodb://test:abc123@ds235437.mlab.com:35437/testdb_123';

mongoose.connect(mongodbUri);

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [' +db.name+']', err);
});

db.once('open', function () {
    console.log('Successfully Connected tp ['+db.name+']')
});

function getByValue(array, id){
    var result = array.filter(function(obj){return obj.id == id;});
    return result? result[0]: null;
}

//Method that creates a new user and saves it to the database
router.addUser = (req, res) =>{
    res.setHeader('Content-Type', 'application/json');

    const user = new User();

    user.email = req.body.email;
    user.userId = req.body.userId;
    user.setPassword(req.body.password);

    user.save(function (err) {
        if(err)
            res.send(err)
        else
            res.send('User added')
    });
}

//Method that deletes a user from the database
router.deleteUser = (req, res) =>{
    User.findByIdAndRemove({"_id": req.params.id}, function (err) {
        if (err)
            res.send(err)
        else
            res.send('User deleted')
    });
}

//Method that finds all users
router.findAll = (req, res)=> {

    res.setHeader('Content-type', 'application/json');

    User.find(function(err, user){
        if(err)
            res.send(err)
        else
            res.send(JSON.stringify(user,null,5));
    });
}

//Method that finds one particular user by id
router.findById = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    User.find({"_id": req.params.id}, function (err, user) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(user,null,5));
    });
}

//Method that allows the user to update their email
router.updateEmail = (req, res) =>{
    res.setHeader('Content-Type', 'application/json');
    User.findByIdAndUpdate(req.params.userId, {email : req.params.newEmail}, function (err, user) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify("Email Updated"))
    });
};

module.exports = router;