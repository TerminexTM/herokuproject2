const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/user.js')


users.get('/new', (req,res)=>{
      res.render('users/newuser.ejs',
      {
         currentUser: req.session.currentUser
      }
   )
})
users.post('/', (req,res)=> {
   req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
   User.create(req.body, (err, createdUser)=> {
      console.log('User is created: ', createdUser);
      res.redirect('/card')
   })
})
module.exports = users
