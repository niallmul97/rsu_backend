let mongoose = require('mongoose');

let researchGroupSchema = new mongoose.Schema({
        rcg_id: Number,
        password: String,
        name: String,
        acronym: String,
        school: String,
        leader_title: String,
        leader_first_name: String,
        leader_last_name: String,
        contact_title: String,
        contact_first_name: String,
        contact_last_name: String,
        contact_email: String,
        contact_number: String,
        website: String,
        campus: String,
        research_area: String,
        currently_registered_postgrad_students_WIT: String,
        graduated_postgrad_students_WIT_2016_2017: String,
        external_academic_colabs_2016_2017: String,
        additional_academic_colabs_2016_2017: String,
        esteemed_indicators: String,
        recognition_acclaim: String,
        research_plans_2018: String,
        userId: Number
    },
    { collection: 'research_groups' });

module.exports = mongoose.model('Research Groups', researchGroupSchema);