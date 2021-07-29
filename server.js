//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session')
const cardController = require('./controllers/card_controller.js')
const userController = require('./controllers/users_controller.js')
const sessionsController = require('./controllers/sessions_controller.js')
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;
//___________________
//Database
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI ,
   {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
   }
);
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
//___________________
//Middleware
//___________________
app.use(session({
   secret: process.env.SECRET,
   resave: false,
   saveUninitialized: false
}))
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride('_method'));
app.use('/card', cardController);
app.use('/users', userController)
app.use('/sessions', sessionsController)

app.get('/' , (req, res) => {
  res.redirect('/card');
});
//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
