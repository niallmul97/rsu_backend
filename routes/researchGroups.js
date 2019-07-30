let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var RCG = require('../models/researchGroups');

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

    RCG.find(function(err, researchGroups) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(researchGroups,null,5));
    });
}

//Returns all publications by specific research group
router.findById = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    RCG.find({"rcg_id": req.params.rcg_id}, function (err, researchGroup) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(researchGroup,null,5));
    });
}

//Method that adds a publication to the database, will not add a publication if it already exists
router.addRCG = (req, res) =>{
    res.setHeader('Content-Type', 'application/json');

    const rcg = new RCG();

    rcg.password = req.body.password;
    rcg.rcg_id = req.body.rcg_id;
    rcg.name = req.body.name;
    rcg.acronym = req.body.acronym;
    rcg.school = req.body.school;
    rcg.leader_title = req.body.leader_title;
    rcg.leader_first_name = req.body.leader_first_name;
    rcg.leader_last_name = req.body.leader_last_name;
    rcg.contact_title = req.body.contact_title;
    rcg.contact_first_name = req.body.contact_first_name;
    rcg.contact_last_name = req.body.contact_last_name;
    rcg.contact_email = req.body.contact_email;
    rcg.contact_number = req.body.contact_number;
    rcg.website = req.body.website;
    rcg.campus = req.body.campus;
    rcg.research_area = req.body.research_area;
    rcg.currently_registered_postgrad_students_WIT = req.body.currently_registered_postgrad_students_WIT;
    rcg.graduated_postgrad_students_WIT_2016_2017 = req.body.graduated_postgrad_students_WIT_2016_2017;
    rcg.external_academic_colabs_2016_2017 = req.body.external_academic_colabs_2016_2017;
    rcg.additional_academic_colabs_2016_2017 = req.body.additional_academic_colabs_2016_2017;
    rcg.esteemed_indicators = req.body.esteemed_indicators;
    rcg.recognition_acclaim = req.body.recognition_acclaim;
    rcg.research_plans_2018 = req.body.research_plans_2018;

    console.log(rcg)
    console.log(req.body)

    rcg.save(function (err) {
        if(err)
            res.send(err)
        else
            res.send("Research Group Added");
    });
}

//Method that allows a user to delete a publication
router.deleteRCG = (req, res) =>{
    RCG.findByIdAndRemove({"_id": req.params._id}, function (err) {
        if (err)
            res.send(err)
        else
            res.send('Publication deleted')
    });
}

module.exports = router;