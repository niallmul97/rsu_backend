var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const additionalResearch = require("./routes/additionalResearch");
const externalResearch = require("./routes/externalResearch");
const qualifications = require("./routes/qualifications");
const postgradsE = require("./routes/postgradsEnrolled");
const postgradsG = require("./routes/postgradsGraduate");
const activeMembers = require("./routes/activeMembers");
const publications = require("./routes/publications");
const rcg = require("./routes/researchGroups");
const csvOut = require("./routes/csvOut");
const user = require("./routes/User");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({type:'*/*'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.post('/additional_research', additionalResearch.addAdditionalResearch);
app.post('/external_research', externalResearch.addExternalResearch);
app.post('/qualifications', qualifications.addQualification);
app.post('/active_members', activeMembers.addActiveMembers);
app.post('/postgrads_graduate', postgradsG.addPostgradsG);
app.post('/postgrads_enrolled', postgradsE.addPostgradsE);
app.post('/publications', publications.addPublication);
app.post('/research_groups', rcg.addRCG);
app.post('/user', user.addUser);
app.get('/publications/rcg_id/:rcg_id', publications.findByRCGroup);
app.get('/publications/pub_doi/:pub_doi', publications.findByDOI);
app.get('/additional_research/_id/:_id', additionalResearch.findById);
app.get('/external_research/_id/:_id', externalResearch.findById);
app.get('/postgrads_graduate/_id/:_id', postgradsG.findById);
app.get('/postgrads_enrolled/_id/:_id', postgradsE.findById);
app.get('/qualifications/_id/:_id', qualifications.findById);
app.get('/active_members/_id/:_id', activeMembers.findById);
app.get('/research_groups/rcg_id/:rcg_id', rcg.findById);
app.get('/publications/_id/:_id', publications.findById);
app.get('/user/_id/:_id', user.findById);
app.get('/additional_research', additionalResearch.findAll);
app.get('/external_research', externalResearch.findAll);
app.get('/postgrads_graduate', postgradsG.findAll);
app.get('/postgrads_enrolled', postgradsE.findAll);
app.get('/qualifications', qualifications.findAll);
app.get('/active_members', activeMembers.findAll);
app.get('/publications', publications.findAll);
app.get('/research_groups', rcg.findAll);
app.get('/user', user.findAll);
app.get('/csvOut/additional_research/rcg_id/:rcg_id', csvOut.CSVOutAdditionalResearch);
app.get('/csvOut/postgrads_enrolled/rcg_id/:rcg_id', csvOut.CSVOutPostgradsEnrolled);
app.get('/csvOut/postgrads_graduate/rcg_id/:rcg_id', csvOut.CSVOutPostgradsGraduate);
app.get('/csvOut/external_research/rcg_id/:rcg_id', csvOut.CSVOutExternalResearch);
app.get('/csvOut/active_members/rcg_id/:rcg_id', csvOut.CSVOutActiveMember);
app.get('/csvOut/publications/rcg_id/:rcg_id', csvOut.CSVOutPublications);
app.get('/csvOut/research_groups/rcg_id/:rcg_id', csvOut.CSVOutRCG);
app.put('/active_members/_id/:_id/active_member_id/:newId', activeMembers.updateActiveMember_id);
app.put('/active_members/_id/:_id/researcher/:newResearcher', activeMembers.updateResearcher);
app.put('/additional_research/_id/:_id/rcg_id/:newRCGId', additionalResearch.updateRCG_id);
app.put('/active_members/_id/:_id/title/:newTitle', activeMembers.updateTitle);
app.delete('/additional_research/_id/:_id', additionalResearch.deleteAdditionalResearch);
app.delete('/external_research/_id/:_id', externalResearch.deleteExternalResearch);
app.delete('/qualifications/_id/:_id', qualifications.deleteQualification);
app.delete('/active_members/_id/:_id', activeMembers.deleteActiveMember);
app.delete('/postgrads_graduate/_id/:_id', postgradsG.deletePostgradG);
app.delete('/postgrads_enrolled/_id/:_id', postgradsE.deletePostgradE);
app.delete('/publications/_id/:_id', publications.deletePublication);
app.delete('/research_groups/_id/:_id', rcg.deleteRCG);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
