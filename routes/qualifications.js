let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var Qualifications = require('../models/qualifications');

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

//Returns all qualifications
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Qualifications.find(function(err, qualifications) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(qualifications,null,5));
    });
}

//Returns all qualifications by specific research group
router.findById = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Qualifications.find({"_id": req.params._id}, function (err, qualifications) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(qualifications,null,5));
    });
}

//Method that adds a publication to the database, will not add a publication if it already exists
router.addQualification = (req, res) =>{
    res.setHeader('Content-Type', 'application/json');

    const qualifications = new Qualifications();

    qualifications.rcg_member_id = req.body.rcg_member_id;
    qualifications.rcg_id = req.body.rcg_id;
    qualifications.qualifications_id = req.body.qualifications_id;
    qualifications.award = req.body.award;
    qualifications.year_of_award = req.body.year_of_award;
    qualifications.name_of_other_award = req.body.name_of_other_award;

    qualifications.save(function (err) {
        if(err)
            res.send(err)
        else
            res.send("Qualification Added");
    });
}

//Method that allows a user to delete a publication
router.deleteQualification = (req, res) =>{
    Qualifications.findByIdAndRemove({"_id": req.params._id}, function (err) {
        if (err)
            res.send(err)
        else
            res.send('Publication deleted')
    });
}

module.exports = router;