let mongoose = require('mongoose');

let qualificationsSchema = new mongoose.Schema({
        rcg_id: Number,
        rcg_member_id: Number,
        qualifications_id: Number,
        award: String,
        year_of_award: String,
        name_of_other_award: String,
        userId: Number
    },
    { collection: 'qualifications' });

module.exports = mongoose.model('Qualifications', qualificationsSchema);