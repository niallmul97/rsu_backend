let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var ExternalResearch = require('../models/externalResearch');

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

    ExternalResearch.find(function(err, externalResearch) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(externalResearch,null,5));
    });
}

//Returns all publications by specific research group
router.findById = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    ExternalResearch.find({"_id": req.params._id}, function (err, externalResearch) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(externalResearch,null,5));
    });
}

//Method that adds a publication to the database, will not add a publication if it already exists
router.addExternalResearch = (req, res) =>{
    res.setHeader('Content-Type', 'application/json');

    const externalResearch = new ExternalResearch();

    externalResearch.external_research_id = req.body.external_research_id;
    externalResearch.rcg_id = req.body.rcg_id;
    externalResearch.organisation = req.body.organisation;
    externalResearch.country = req.body.country;
    externalResearch.joint_research_programme = req.body.joint_research_programme;
    externalResearch.joint_supervision = req.body.joint_supervision;
    externalResearch.joint_publications = req.body.joint_publications;
    externalResearch.joint_funding_application = req.body.joint_funding_application;
    externalResearch.other = req.body.other;
    externalResearch.details_of_other = req.body.details_of_other;

    externalResearch.save(function (err) {
        if(err)
            res.send(err)
        else
            res.send("External Research Added");
    });
}

//Method that allows a user to delete a publication
router.deleteExternalResearch = (req, res) =>{
    ExternalResearch.findByIdAndRemove({"_id": req.params._id}, function (err) {
        if (err)
            res.send(err)
        else
            res.send('External Research deleted')
    });
}

module.exports = router;