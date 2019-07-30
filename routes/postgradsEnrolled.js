let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var PostgradsE = require('../models/postgradsEnrolled');

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

    PostgradsE.find(function(err, postgradsEnrolled) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(postgradsEnrolled,null,5));
    });
}

//Returns all publications by specific research group
router.findById = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    PostgradsE.find({"_id": req.params._id}, function (err, postgradsEnrolled) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(postgradsEnrolled,null,5));
    });
}

//Method that adds a publication to the database, will not add a publication if it already exists
router.addPostgradsE = (req, res) =>{
    res.setHeader('Content-Type', 'application/json');

    const postgradse = new PostgradsE();

    postgradse.postgrad_student_id = req.body.postgrad_student_id;
    postgradse.rcg_id = req.body.rcg_id;
    postgradse.name_first = req.body.name_first;
    postgradse.name_last = req.body.name_last;
    postgradse.level = req.body.level;
    postgradse.title = req.body.title;
    postgradse.lead_supervisor_first = req.body.lead_supervisor_first;
    postgradse.lead_supervisor_last = req.body.lead_supervisor_last;
    postgradse.title2 = req.body.title2;
    postgradse.second_supervisor_first = req.body.second_supervisor_first;
    postgradse.second_supervisor_last = req.body.second_supervisor_last;
    postgradse.funding_programme = req.body.funding_programme;
    postgradse.other = req.body.other;
    postgradse.date_of_graduation = req.body.date_of_graduation;

    postgradse.save(function (err) {
        if(err)
            res.send(err)
        else
            res.send("Postgrad Enrolled Added");
    });
}

//Method that allows a user to delete a publication
router.deletePostgradE = (req, res) =>{
    PostgradsE.findByIdAndRemove({"_id": req.params._id}, function (err) {
        if (err)
            res.send(err)
        else
            res.send('Postgrad Enrolled deleted')
    });
}

module.exports = router;