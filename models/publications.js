let mongoose = require('mongoose');

let publicationSchema = new mongoose.Schema({
        rcg_id: Number,
        pub_doi: String,
        authors: Array,
        year: String,
        pub_type: String,
        pub_title: String,
        chapter: String,
        book: String,
        journal: String,
        conference: String,
        volume: String,
        issue: String,
        pages: String,
        url: String,
        place_of_publication : String,
        userId: Number
    },
    { collection: 'publications' });

module.exports = mongoose.model('Publication', publicationSchema);