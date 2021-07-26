const express = require('express')
const Card = require('../models/card.js')
const card = express.Router();


//delete
card.delete('/:id', (req,res)=> {
   Card.findByIdAndRemove(req.params.id, (err, deleteCard)=> {
      res.redirect('/card')
   })
})


//home page!:index
card.get('/', (req,res)=> {
   Card.find({}, (err, allCards)=> {
      res.render('cards/index.ejs', {
         cards: allCards
      })
   })
})

//=============================
//Create New Card
card.get('/new', (req,res)=> {
   res.render('cards/new.ejs')
})

card.post('/', (req,res)=> {
   Card.create(req.body, (err, createdCard)=> {
      console.log(createdCard);
      res.redirect('/card')
   })
})
//============================
//View Card page!
card.get('/:id', (req,res)=> {
   Card.findById(req.params.id, (err, detailCard)=> {
      console.log(detailCard);
      res.render('cards/show.ejs', {
         card: detailCard
         })
      })
   })
//edit existing card
card.get('/:id/edit', (req,res)=> {
   Card.findById(req.params.id, (err, getCard)=>{
      res.render('cards/edit.ejs', {
         card: getCard
      })
   })
})
card.put('/:id', (req,res)=> {
   Card.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true},
      (err, updateCard) => {
         res.redirect('/card')
      }
   )
})
//==============================
module.exports = card
