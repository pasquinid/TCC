const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const config   = require('../config/database');

// CLASS SCHEMA
const classSchema = mongoose.Schema({
  semester: {
    type: String,
    required: true
  },
  subjectCode : {
    type: String ,
    required: true
  },
  classCode : {
    type: String ,
    required: true
  },
  professorId : {
    type: mongoose.Schema.Types.ObjectId
  },
  schedule : {
    type: [Date],
    required: true
  }
});

const Class = module.exports = mongoose.model('Class',classSchema);

module.exports.getClassById = function(id,callback){
  Class.findById(id,callback);
}

module.exports.getClassBySemester = function(semester, callback){
  const query = {semester: semester};
  Class.findOne(query,callback);
}

module.exports.getClassByCode = function(classCode, callback){
  const query = {classCode: classCode};
  Class.findOne(query,callback);
}

module.exports.getClassBySubjectCode = function(subjectCode, callback){
  const query = {subjectCode: subjectCode};
  Class.findOne(query,callback);
}

module.exports.getClassByProfessorCode = function(professorId, callback){
  const query = {professorId: professorId};
  Class.findOne(query,callback);
}

module.exports.addClass = function(newClass, callback){
  newClass.save(callback);
}

module.exports.deleteClass = function(targetClass, callback){
  Class.findOneAndRemove(targetClass,callback);
}

module.exports.updateClass = function(modifiedClass, callback){
  Class.findByIdAndUpdate(modifiedClass._id,modifiedClass,callback);
}
