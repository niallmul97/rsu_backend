let mongoose = require('mongoose');

let postgradsEnrolledSchema = new mongoose.Schema({
        rcg_id: Number,
        postgrad_student_id: Number,
        name_first: String,
        name_last: String,
        level: String,
        title: String,
        lead_supervisor_first: String,
        lead_supervisor_last: String,
        title_2: String,
        second_supervisor_first: String,
        second_supervisor_last: String,
        funding_programme: String,
        other: String,
        date_of_registration: Date,
        userId: Number
    },
    { collection: 'postgrad_students_enrolled' });

module.exports = mongoose.model('Postgrads Enrolled', postgradsEnrolledSchema);