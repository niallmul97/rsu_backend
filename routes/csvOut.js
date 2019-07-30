let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var ActiveMembers = require('../models/activeMembers');
var AdditionalResearch = require('../models/additionalResearch');
var ExternalResearch = require('../models/externalResearch');
var PostgradsEnrolled = require('../models/postgradsEnrolled');
var PostgradsGraduate = require('../models/postgradsGraduate');
var Publication = require('../models/publications');
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

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriterActiveMember = createCsvWriter({
    path: './userData/ActiveMember'+Math.floor(Math.random()*1000)+'.csv',
    header: [
        {id: 'name_first', title: 'FirstName'},
        {id: 'name_last', title: 'Last Name'},
        {id: 'title', title: 'Title'},
        {id: 'rcg_id', title: 'Research Group ID'},
        {id: 'active_member_id', title: 'Member ID'},
        {id: 'userId', title: 'User ID'},
        {id: 'researcher', title: 'Researcher'},
        {id: 'academic_qualifications', title: 'Academic Qualifications'},
        {id: 'academic_staff', title: 'Academic Staff'},
        {id: 'affiliated_member_2', title: 'Affiliated Member'},
        {id: 'peerreviewed_publications_performances_exhibitions', title: 'Peerreviewed Publications Performances Exhibitions'},
        {id: 'commercial_activity', title: 'Commercial Activity'},
        {id: 'supervision_of_research_level_910', title: 'Supervision Of Research Level 910'},
        {id: 'awarded_external_grant', title: 'Awarded External Grant'},
        {id: 'industry_contract', title: 'Industry Contract'},
        {id: 'research_project_management', title: 'Research Project Management'},
        {id: 'pursuit_of_research_level_910', title: 'Pursuit Of Research Level 910'}
    ]
});

router.CSVOutActiveMember = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    ActiveMembers.find({"rcg_id": req.params.rcg_id}, function (err, userData) {
        if (err)
            res.send(err);
        else
            res.send('CSV Written Successfully'),
            csvWriterActiveMember
                .writeRecords(userData)
                .then(()=> console.log('The CSV file was written successfully'));
    })
};

const csvWriterAdditionalResearch = createCsvWriter({
    path: './userData/AdditionalResearch'+Math.floor(Math.random()*1000)+'.csv',
    header: [
        {id: 'rcg_id', title: 'Research Group ID'},
        {id: 'additional_research_id', title: 'Additional Research ID'},
        {id: 'userId', title: 'User ID'},
        {id: 'organisation', title: 'Organisation'},
        {id: 'country', title: 'Country'},
        {id: 'directly_funded_project', title: 'Directly Funded Project'},
        {id: 'funded_student', title: 'Funded Student'},
        {id: 'collaborative_project_funded_by_3rd_party', title: 'Collaborative Project Funded by 3rD Party'},
        {id: 'joint_supervision_of_student', title: 'Joint Supervision of Student'},
        {id: 'other_2', title: 'other'},
        {id: 'details_of_other', title: 'Details of Other'}
    ]
});

router.CSVOutAdditionalResearch = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    AdditionalResearch.find({"rcg_id": req.params.rcg_id}, function (err, userData) {
        if (err)
            res.send(err);
        else
            res.send('CSV Written Successfully'),
                csvWriterAdditionalResearch
                    .writeRecords(userData)
                    .then(()=> console.log('The CSV file was written successfully'));
    })
};

const csvWriterExternalResearch = createCsvWriter({
    path: './userData/ExternalResearch'+Math.floor(Math.random()*1000)+'.csv',
    header: [
        {id: 'rcg_id', title: 'Research Group ID'},
        {id: 'external_research_id', title: 'Additional Research ID'},
        {id: 'userId', title: 'User ID'},
        {id: 'organisation', title: 'Organisation'},
        {id: 'country', title: 'Country'},
        {id: 'joint_research_programme', title: 'Joint Research Programme'},
        {id: 'joint_publications', title: 'Joint Publications'},
        {id: 'joint_supervision', title: 'Joint Supervision'},
        {id: 'joint_funding_application', title: 'Joint Funding Application'},
        {id: 'other', title: 'Other'},
        {id: 'details_of_other', title: 'Details of Other'}
    ]
});

router.CSVOutExternalResearch = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    ExternalResearch.find({"rcg_id": req.params.rcg_id}, function (err, userData) {
        if (err)
            res.send(err);
        else
            res.send('CSV Written Successfully'),
                csvWriterExternalResearch
                    .writeRecords(userData)
                    .then(()=> console.log('The CSV file was written successfully'));
    })
};

const csvWriterPostgradsEnrolled = createCsvWriter({
    path: './userData/PostgradsEnrolled'+Math.floor(Math.random()*1000)+'.csv',
    header: [
        {id: 'rcg_id', title: 'Research Group ID'},
        {id: 'postgrad_student_id', title: 'Postgrad Student Id'},
        {id: 'userId', title: 'User ID'},
        {id: 'name_first', title: 'First Name'},
        {id: 'name_last', title: 'Last Name'},
        {id: 'level', title: 'Level'},
        {id: 'title', title: 'Title'},
        {id: 'lead_supervisor_first', title: 'Lead Supervisor First'},
        {id: 'lead_supervisor_last', title: 'Lead Supervisor Last'},
        {id: 'title_2', title: 'Title'},
        {id: 'second_supervisor_first', title: 'Second Supervisor First'},
        {id: 'second_supervisor_last', title: 'Second Supervisor Last'},
        {id: 'funding_programme', title: 'Funding Programme'},
        {id: 'other', title: 'Other'},
        {id: 'date_of_registration', title: 'Date of Registration'}
    ]
});

router.CSVOutPostgradsEnrolled = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    PostgradsEnrolled.find({"rcg_id": req.params.rcg_id}, function (err, userData) {
        if (err)
            res.send(err);
        else
            res.send('CSV Written Successfully'),
                csvWriterPostgradsEnrolled
                    .writeRecords(userData)
                    .then(()=> console.log('The CSV file was written successfully'));
    })
};

const csvWriterPostgradsGraduate = createCsvWriter({
    path: './userData/PostgradsGraduate'+Math.floor(Math.random()*1000)+'.csv',
    header: [
        {id: 'rcg_id', title: 'Research Group ID'},
        {id: 'postgrad_student_id', title: 'Postgrad Student Id'},
        {id: 'userId', title: 'User ID'},
        {id: 'name_first', title: 'First Name'},
        {id: 'name_last', title: 'Last Name'},
        {id: 'level', title: 'Level'},
        {id: 'title', title: 'Title'},
        {id: 'lead_supervisor_first', title: 'Lead Supervisor First'},
        {id: 'lead_supervisor_last', title: 'Lead Supervisor Last'},
        {id: 'title_2', title: 'Title'},
        {id: 'second_supervisor_first', title: 'Second Supervisor First'},
        {id: 'second_supervisor_last', title: 'Second Supervisor Last'},
        {id: 'funding_programme', title: 'Funding Programme'},
        {id: 'other', title: 'Other'},
        {id: 'date_of_registration', title: 'Date of Registration'}
    ]
});

router.CSVOutPostgradsGraduate = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    PostgradsGraduate.find({"rcg_id": req.params.rcg_id}, function (err, userData) {
        if (err)
            res.send(err);
        else
            res.send('CSV Written Successfully'),
                csvWriterPostgradsGraduate
                    .writeRecords(userData)
                    .then(()=> console.log('The CSV file was written successfully'));
    })
};

const csvWriterPublications = createCsvWriter({
    path: './userData/Publications'+Math.floor(Math.random()*1000)+'.csv',
    header: [
        {id: 'rcg_id', title: 'Research Group ID'},
        {id: 'pub_doi', title: 'Publication DOI'},
        {id: 'userId', title: 'User ID'},
        {id: 'authors', title: 'Authors'},
        {id: 'year', title: 'Year'},
        {id: 'pub_type', title: 'Publication Type'},
        {id: 'pub_title', title: 'Publication Title'},
        {id: 'chapter', title: 'Chapter'},
        {id: 'book', title: 'Book'},
        {id: 'journal', title: 'Journal'},
        {id: 'conference', title: 'Conference'},
        {id: 'volume', title: 'Volume'},
        {id: 'issue', title: 'Issue'},
        {id: 'pages', title: 'Pages'},
        {id: 'url', title: 'Url'},
        {id: 'place_of_publication', title: 'Place of Publication'}
    ]
});

router.CSVOutPublications = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Publication.find({"rcg_id": req.params.rcg_id}, function (err, userData) {
        if (err)
            res.send(err);
        else
            res.send('CSV Written Successfully'),
                csvWriterPublications
                    .writeRecords(userData)
                    .then(()=> console.log('The CSV file was written successfully'));
    })
};

const csvWriterResearchGroups = createCsvWriter({
    path: './userData/ResearchGroups'+Math.floor(Math.random()*1000)+'.csv',
    header: [
        {id: 'rcg_id', title: 'Research Group ID'},
        {id: 'password', title: 'Password'},
        {id: 'userId', title: 'User ID'},
        {id: 'name', title: 'Name'},
        {id: 'acronym', title: 'Acronym'},
        {id: 'school', title: 'School'},
        {id: 'leader_title', title: 'Leader Title'},
        {id: 'leader_first_name', title: 'Leader First Name'},
        {id: 'leader_last_name', title: 'Leader Last Name'},
        {id: 'contact_title', title: 'Contact Title'},
        {id: 'contact_first_name', title: 'Contact First Name'},
        {id: 'contact_last_name', title: 'Contact Last Name'},
        {id: 'contact_email', title: 'Contact Email'},
        {id: 'contact_number', title: 'Contact Number'},
        {id: 'website', title: 'Website'},
        {id: 'campus', title: 'Campus'},
        {id: 'research_area', title: 'Research Area'},
        {id: 'currently_registered_postgrad_students_WIT', title: 'Currently Registered Postgrad Students WIT'},
        {id: 'graduated_postgrad_students_WIT_2016_2017', title: 'Graduated Postgrad Students WIT 2016/2017'},
        {id: 'external_academic_colabs_2016_2017', title: 'External Academic Colabs 2016/2017'},
        {id: 'additional_academic_colabs_2016_2017', title: 'Additional Academic Colabs 2016/2017'},
        {id: 'esteemed_indicators', title: 'Esteemed Indicators'},
        {id: 'recognition_acclaim', title: 'Recognition Acclaim'},
        {id: 'research_plans_2018', title: 'Research Plans 2018'}
    ]
});

router.CSVOutRCG = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    RCG.find({"rcg_id": req.params.rcg_id}, function (err, userData) {
        if (err)
            res.send(err);
        else
            res.send('CSV Written Successfully'),
                csvWriterResearchGroups
                    .writeRecords(userData)
                    .then(()=> console.log('The CSV file was written successfully'));
    })
};
module.exports = router;