let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var ActiveMembers = require('../models/activeMembers');
var User = require('../models/Users');

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

    ActiveMembers.find(function(err, activeMembers) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(activeMembers,null,5));
    });
}

//Returns all publications by specific research group
router.findById = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    ActiveMembers.find({"_id": req.params._id}, function (err, activeMembers) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(activeMembers,null,5));
    });
}

//Method that adds a publication to the database, will not add a publication if it already exists
router.addActiveMembers = (req, res) =>{
    res.setHeader('Content-Type', 'application/json');

    const activeMember = new ActiveMembers();

    activeMember.active_member_id = req.body.active_member_id;
    activeMember.rcg_id = req.body.rcg_id;
    activeMember.title = req.body.title;
    activeMember.name_first = req.body.name_first;
    activeMember.name_last = req.body.name_last;
    activeMember.academic_qualifications = req.body.academic_qualifications;
    activeMember.researcher = req.body.researcher;
    activeMember.affiliated_member_2 = req.body.affiliated_member_2;
    activeMember.peerreviewed_publications_performances_exhibitions = req.body.peerreviewed_publications_performances_exhibitions;
    activeMember.commercial_activity = req.body.commercial_activity;
    activeMember.supervision_of_research_level_910 = req.body.supervision_of_research_level_910;
    activeMember.awarded_external_grant = req.body.awarded_external_grant;
    activeMember.industry_contract = req.body.industry_contract;
    activeMember.research_project_management = req.body.research_project_management;
    activeMember.pursuit_of_research_level_910 = req.body.pursuit_of_research_level_910;

    activeMember.save(function (err) {
        if(err)
            res.send(err)
        else
            res.send("Active Member Added");
    });
}

router.updateRCG_id = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    ActiveMembers.findByIdAndUpdate(req.params._id, {rcg_id : req.params.newRCGId},function(err, activeMember){
        if (err)
            res.send(err)
        else{
            res.send('RCG ID Updated')
        }
    });
};

router.updateActiveMember_id = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    ActiveMembers.findByIdAndUpdate(req.params._id, {active_member_id : req.params.newId},function(err, activeMember){
        if (err)
            res.send(err)
        else{
            res.send('Active Member ID Updated')
        }
    });
}

router.updateTitle = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    ActiveMembers.findByIdAndUpdate(req.params._id, {title : req.params.newTitle},function(err, activeMember){
        if (err)
            res.send(err)
        else{
            res.send('Active Member Title Updated')
        }
    });
}

router.updateResearcher = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    ActiveMembers.findByIdAndUpdate(req.params._id,  {researcher : req.params.newResearcher},function(err, activeMember){
        if (err)
            res.send(err)
        else{
            res.send('Active Member Researcher Status Updated')
        }
    });
}

//Method that allows a user to delete a publication
router.deleteActiveMember = (req, res) =>{
    ActiveMembers.findByIdAndRemove({"_id": req.params._id}, function (err) {
        if (err)
            res.send(err)
        else
            res.send('Additional Research deleted')
    });
}

module.exports = router;