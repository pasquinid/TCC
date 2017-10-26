const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const cors  	 = require('cors');
const passport   = require('passport');
const mongoose   = require('mongoose');
const config 	 = require('./config/database')

// Connecting to db
mongoose.connect(config.database,{useMongoClient: true});
mongoose.connection.on('Connected',()=>{
	console.log('Connected to database'+config.database);
});
mongoose.connection.on('error',(err)=>{
	console.log('Database error : '+ err);
});


const app   = express();
const port  = 3000;
const users = require('./routes/users');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users',users);

app.get('/',(req,res)=>{
	res.send('Invalid endpoint');
});


app.listen(port, () => {
	console.log('Server started on port '+port);
});