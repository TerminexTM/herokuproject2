const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')



sessions.get('/new', (req,res)=> {
   res.render('sessions/new.ejs', {currentUser: req.session.currentUser})
})



sessions.post('/', (req,res)=> {
   User.findOne({username: req.body.username}, (err, foundUser)=> {
      if(err){
         console.log(err);
         res.send('we\'ve detected an error with the DB')
      } else if (!foundUser){
         res.send('<a href="/sessions/new">Sorry, no user found</a>')
      } else {
         if(bcrypt.compareSync(req.body.password, foundUser.password)){
            req.sessions.currentUser = founderUser
            res.redirect('/card')
         } else {
            res.send('<a href="/sessions/new">Password Does\'nt match records')
         }
      }
   })
})

sessions.delete('/', (req,res)=> {
   req.session.destroy(()=> {
      res.redirect('/card')
   })
})
module.exports = sessions;
