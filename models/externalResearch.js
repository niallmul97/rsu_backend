let mongoose = require('mongoose');

let externalResearchSchema = new mongoose.Schema({
        rcg_id: Number,
        external_research_id: Number,
        organisation: String,
        country: String,
        joint_research_programme: String,
        joint_publications: String,
        joint_supervision: String,
        joint_funding_application: String,
        other: String,
        details_of_other: String,
        userId: Number
    },
    { collection: 'external_research' });

module.exports = mongoose.model('External Research', externalResearchSchema);