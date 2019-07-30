let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var PostgradsG = require('../models/postgradsGraduate');

var mongodbUri = 'mongodb://test:abc123@ds235437.mlab.com:35437/testdb_123';

mongoose.connect(mongodbUri);

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});


function getByValue(array, id) {
    var result  = array.filter(function(obj){return obj.id == id;} );
    return result ? result[0] : null; // or undefined
}

//Returns all research groups
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    PostgradsG.find(function(err, postgradsGraduate) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(postgradsGraduate,null,5));
    });
}

//Returns all publications by specific research group
router.findById = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    PostgradsG.find({"_id": req.params._id}, function (err, postgradsGraduate) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(postgradsGraduate,null,5));
    });
}

//Method that adds a publication to the database, will not add a publication if it already exists
router.addPostgradsG = (req, res) =>{
    res.setHeader('Content-Type', 'application/json');

    const postgradsg = new PostgradsG();

    postgradsg.postgrad_student_id = req.body.postgrad_student_id;
    postgradsg.rcg_id = req.body.rcg_id;
    postgradsg.name_first = req.body.name_first;
    postgradsg.name_last = req.body.name_last;
    postgradsg.level = req.body.level;
    postgradsg.title = req.body.title;
    postgradsg.lead_supervisor_first = req.body.lead_supervisor_first;
    postgradsg.lead_supervisor_last = req.body.lead_supervisor_last;
    postgradsg.title2 = req.body.title2;
    postgradsg.second_supervisor_first = req.body.second_supervisor_first;
    postgradsg.second_supervisor_last = req.body.second_supervisor_last;
    postgradsg.funding_programme = req.body.funding_programme;
    postgradsg.other = req.body.other;
    postgradsg.date_of_graduation = req.body.date_of_graduation;

    postgradsg.save(function (err) {
        if(err)
            res.send(err)
        else
            res.send("Postgrad Graduate Added");
    });
}

//Method that allows a user to delete a publication
router.deletePostgradG = (req, res) =>{
    PostgradsG.findByIdAndRemove({"_id": req.params._id}, function (err) {
        if (err)
            res.send(err)
        else
            res.send('Postgrad Graduate deleted')
    });
}

module.exports = router;