const express = require('express');
const router  = express.Router();
const passport= require('passport');
const config  = require('../config/database');
const Class = require('../models/class');

// REGISTER
router.post('/register',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
  let newClass = new Class({
    semester    : req.body.semester,
    subjectCode : req.body.subjectCode,
    classCode   : req.body.classCode,
    professorId : req.body.professorId,
    schedule    : req.body.schedule
  });

  Class.getClassByCode(req.body.classCode, (err, class_searched) => {
    if(err) throw err;
    if(class_searched){
      return res.json({success: false, msg: 'Class already registered'})
    }
    else{
      Class.addClass(newClass,(err,resClass) => {
        if(err){
          res.json({success: false, msg: 'Failed to register class'});
        } else{
          res.json({success: true, msg: 'Class registered!'});
        }
      });
    }
  });
});

router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next) => {
  res.json({subject: {
            id    : req.class._id,
            subjectCode : req.class.subjectCode,
            classCode   : req.class.classCode,
            professorId : req.class.professorId,
            schedule    : req.class.schedule
          }});
});

router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
  let targetClass = {
    classCode  : req.body.classCode,
    subjectCode: req.body.subjectCode,
    professorId: req.body.professorId
  };

  Class.deleteClass(targetClass, (err, result) =>{
    if(err){
      res.json({success: false, msg: 'Failed to delete class'});
    } else{
      res.json({success: true, msg: 'User deleted!' });
    }
  });
});

module.exports = router;
