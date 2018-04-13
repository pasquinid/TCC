const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const config   = require('../config/database');

// SUBJECT SCHEMA
const subjectSchema = mongoose.Schema({
	name: {
		type: String,
    required: true
	},
	code: {
		type: String,
		required: true
	},
	summary: {
		type: String,
		required: true
	}
});

const Subject = module.exports = mongoose.model('Subject',subjectSchema);

module.exports.getSubjectById = function(id, callback){
  Subject.findById(id,callback);
}

module.exports.getSubjectByCode = function(code, callback){
  const query = {code : code};
  Subject.findOne(query,callback);
}

module.exports.addSubject = function(newSubject, callback){
  newSubject.save(callback);
}

module.exports.deleteSubject = function(targetSubject, callback){
  Subject.findOneAndRemove(targetSubject, callback);
}

module.exports.updateSubject = function(modifiedSubject, callback){
  Subject.findByIdAndUpdate(modifiedSubject._id, modifiedSubject, callback);
}
