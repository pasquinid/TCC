const express = require('express');
const router  = express.Router();
const passport= require('passport');
const jwt 	  = require('jsonwebtoken');
const config  = require('../config/database');
const User    = require('../models/user');

// REGISTER
router.post('/register',(req,res,next)=>{
	let newUser = new User({
		name 	: req.body.name,
		email	: req.body.email,
		username: req.body.username,
		password: req.body.password
	});

	User.getUserByUsername(req.body.username, (err, user_searched) => { // **
		if(err) throw err;
		if(user_searched){
			return res.json({success: false, msg: 'Username already registered!'});
		}
		else{
			User.addUser(newUser,(err,user) => {
				if(err){
					res.json({success: false, msg:'Failed to register user'});
				} else{
					res.json({success: true, msg:'User registered!'});
				}
			});
		}
	}); //**
});

// AUTHENTICATE
router.post('/authenticate',(req,res,next)=>{
	const username = req.body.username;
	const password = req.body.password;

	User.getUserByUsername(username, (err, user) => {
		if(err) throw err;
		if(!user){
			return res.json({success: false, msg: 'User not found!'});
		}
		console.log("Pass "+password+"\nUser.passwrd "+user.password+"\nUser name "+user.name);
						 //candidate  //hashed passwd  //callback
		User.comparePassword(password, user.password, (err, isMatch) => {
			if(err) throw err;
			if(isMatch){
				const token = jwt.sign({ data: user }, config.secret, {
				          expiresIn: 604800 // 1 week worth of seconds
				});

				res.json({
					success: true,
					token  : 'JWT '+token,
					user   : {
						id      : user._id,
						name    : user.name,
						username: user.username,
						email   : user.email
					}
				});
			} else{
				return res.json({success: false, msg: 'Wrong password!'});
			}
		});
	});

});

// profile               protecting this route
router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
	res.json({user: {
						id      : req.user._id,
						name    : req.user.name,
						username: req.user.username,
						email   : req.user.email
					}});
});

module.exports = router;
