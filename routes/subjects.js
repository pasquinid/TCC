const express = require('express');
const router  = express.Router();
const passport= require('passport');
const config  = require('../config/database');
const Subject = require('../models/subject');

// REGISTER
router.post('/register',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
  let newSubject = new Subject({
    name : req.body.name,
    code : req.body.code,
    summary : req.body.summary
  });

  Subject.getSubjectByCode(req.body.code, (err, subject_searched) => {
    if(err) throw err;
    if(subject_searched){
      return res.json({sucess: false, msg: 'Subject already registered!'});
    }
    else{
      Subject.addSubject(newSubject,(err,subject) => {
        if(err){
          res.json({success: false, msg: 'Failed to register subject'});
        } else{
          res.json({success: true, msg: 'Subject registered!'});
        }
      });
    }
  });
});

router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
  res.json({subject: {
            id     : req.subject._id,
            code   : req.subject.code,
            summary: req.subject.summary
          }});
});

router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
  let targetSubject = {
    name : req.body.name,
    code : req.body.code,
    summary : req.body.summary
  };

  Subject.deleteSubject(targetSubject, (err, result)=>{
    if(err){
      res.json({success: false, msg: 'Failed to delete subject'});
    } else{
      res.json({success: true, msg: 'Subject deleted!'});
    }
  });
});

module.exports = router;
