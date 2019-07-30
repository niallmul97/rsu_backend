let mongoose = require('mongoose');

let additionalResearchSchema = new mongoose.Schema({
        rcg_id: Number,
        additional_research_id: Number,
        organisation: String,
        country: String,
        directly_funded_project: String,
        funded_student: String,
        collaborative_project_funded_by_3rd_party: String,
        joint_supervision_of_student: String,
        other_2: String,
        details_of_other: String,
        userId: Number
    },
    { collection: 'additional_research' });

module.exports = mongoose.model('Additional Research', additionalResearchSchema);