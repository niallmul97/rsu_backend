let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var Publication = require('../models/publications');

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

//Returns all publications
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Publication.find(function(err, publications) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(publications,null,5));
    });
}

//Returns all publications by specific research group
router.findByRCGroup = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Publication.find({"rcg_id": req.params.rcg_id}, function (err, publications) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(publications,null,5));
    });
}

//Returns all publications by specific DOI
router.findByDOI = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Publication.find({"pub_doi": req.params.pub_doi}, function (err, publications) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(publications,null,5));
    });
}

//Returns all publications by specific research group
router.findById = (req, res) =>{

    res.setHeader('Content-Type', 'application/json');

    Publication.find({"_id": req.params._id}, function (err, publications) {
        if(err)
            res.send(err);
        else
            res.send(JSON.stringify(publications,null,5));
    });
}

//Method that adds a publication to the database, will not add a publication if it already exists
router.addPublication = (req, res) =>{
    res.setHeader('Content-Type', 'application/json');

    const publication = new Publication();

    publication.pub_title = req.body.pub_title;
    publication.rcg_id = req.body.rcg_id;
    publication.pub_doi = req.body.pub_doi;
    publication.authors = req.body.authors;
    publication.year = req.body.year;
    publication.pub_type = req.body.pub_type;
    publication.chapter = req.body.chapter;
    publication.book = req.body.book;
    publication.journal = req.body.journal;
    publication.conference = req.body.conference;
    publication.volume = req.body.volume;
    publication.pages = req.body.pages;
    publication.url = req.body.url;
    publication.place_of_publication = req.body.place_of_publication;

    console.log(publication)
    console.log(req.body)

    publication.save(function (err) {
        if(err)
            res.send(err)
        else
            res.send("Publication Added");
    });
}

//Method that allows a user to delete a publication
router.deletePublication = (req, res) =>{
    Publication.findByIdAndRemove({"_id": req.params._id}, function (err) {
        if (err)
            res.send(err)
        else
            res.send('Publication deleted')
    });
}

module.exports = router;