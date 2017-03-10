var express = require('express');
var server = express();
var mongoose = require('mongoose');

var port = process.env.PORT || 8080;
var mongoURI = process.env.MONGOURI || require('./secrets').mongoURI;

//connect to the database
mongoose.connect(mongoURI);
//Create the mongoose Scema
var foodSchema = mongoose.Schema({
  price: Number,
  category: String,
  isGlutenFree: String,
  calories: Number
});
//Create the Mongoose Model
var Food = mongoose.model('Food', foodSchema);
//Testing database stuff
// var donkey = new Animal({
//   color: 'gray',
//   size: 'MED',
//   type: 'donkey',
//   price: 180
// });
// donkey.save(function(err, data){
//   if(err){
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

//GET /foods
server.get('/foods', function(req, res){
  Food.find({}, function(err, documents){
    if(err){
      res.status(500).json({
        msg: err
      });

    } else {
      res.status(200).json({
        foods: documents
      });
    }
  });
});

//GET /foods/:id
server.get('/foods/:id', function(req, res){
  Food.find({_id: req.params.id}, function(err, documents){
    if(err){
      res.status(500).json({
       msg: err
      });
    } else {
      res.status(200).json({
        foods: documents
      });
    }
  });
});


//GET /foods/category/:categoryName
server.get('/foods/category/:categoryName', function(req, res){
  Food.find({_id: req.params.id}, function(err, documents){
    if(err){
      res.status(500).json({
       msg: err
      });
    } else {
      res.status(200).json({
        animals: documents
      });
    }
  });
});
//POST /animals
//PUT /animals/:id
//DELETE /animals/:id

server.listen(port, function(){
  console.log('Now listening on port...', port);
})
