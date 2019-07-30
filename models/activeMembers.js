let mongoose = require('mongoose');

let activeMemberSchema = new mongoose.Schema({
        rcg_id: Number,
        active_member_id: Number,
        title: String,
        name_first: String,
        name_last: String,
        academic_qualifications: String,
        academic_staff: String,
        researcher: String,
        affiliated_member_2: String,
        peerreviewed_publications_performances_exhibitions: String,
        commercial_activity: String,
        supervision_of_research_level_910: String,
        awarded_external_grant: String,
        industry_contract: String,
        research_project_management: String,
        pursuit_of_research_level_910: String,
        userId: Number
    },
    { collection: 'active_members' });

module.exports = mongoose.model('Active Members', activeMemberSchema);