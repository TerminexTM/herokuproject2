const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
   name: { type: String, required: true},
   color: {
      Blue: {type: String},
      Red: {type: String},
      Green: {type: String},
      White: {type: String},
      Black: {type: String},
      Colorless: {type: String}
   },
   img: { type:String, required: true},
   type: { type: String, required: true},
   abilities: { type: String, required: false},
   power: { type: Number, required: true},
   toughness: { type: Number, required: true},
   username: String,
})

const Card = mongoose.model('Card', cardSchema);

module.exports = Card
