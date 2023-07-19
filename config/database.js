const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);
	
// shortcut to mongoose.connection object
const db = mongoose.connection;


//Testing this for Heroku !!!!!!!
const mongoURI = process.env.DATABASE_URL;
	
db.on('connected', function() {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});
