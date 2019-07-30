let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var AdditionalResearch = require('../models/additionalResearch');

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

    AdditionalResearch.find(function(err, additionalResearch) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(additionalResearch,null,5));
    });
}

//Returns all publications by specific research group
router.findById = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    AdditionalResearch.find({"_id": req.params._id}, function (err, additionalResearch) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(additionalResearch,null,5));
    });
}

//Method that adds a publication to the database, will not add a publication if it already exists
router.addAdditionalResearch = (req, res) =>{
    res.setHeader('Content-Type', 'application/json');

    const additionalResearch = new AdditionalResearch();

    additionalResearch.additional_research_id = req.body.additional_research_id;
    additionalResearch.rcg_id = req.body.rcg_id;
    additionalResearch.organisation = req.body.organisation;
    additionalResearch.country = req.body.country;
    additionalResearch.directly_funded_project = req.body.directly_funded_project;
    additionalResearch.funded_student = req.body.funded_student;
    additionalResearch.collaborative_project_funded_by_3rD_party = req.body.collaborative_project_funded_by_3rD_party;
    additionalResearch.joint_supervision_of_student = req.body.joint_supervision_of_student;
    additionalResearch.other_2 = req.body.other_2;
    additionalResearch.details_of_other = req.body.details_of_other;

    additionalResearch.save(function (err) {
        if(err)
            res.send(err)
        else
            res.send("Additional Research Added");
    });
}

router.updateRCG_id = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    AdditionalResearch.findById(req.params._id, function(err, additonalResearch){
        if (err)
            res.send(err)
        else{
            additonalResearch.rcg_id = req.params.rcg_id
            additonalResearch.save(function (err) {
                if (err)
                    res.send(err)
                else
                    res.send('Additional Research Updated')
            });
        }
    });
}

//Method that allows a user to delete a publication
router.deleteAdditionalResearch = (req, res) =>{
    AdditionalResearch.findByIdAndRemove({"_id": req.params._id}, function (err) {
        if (err)
            res.send(err)
        else
            res.send('Additional Research deleted')
    });
}

module.exports = router;