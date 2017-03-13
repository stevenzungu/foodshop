var express = require('express');
var server = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var port = process.env.PORT || 8080;
var mongoURI = process.env.MONGOURI || require('./secrets').mongoURI;

//powerup -- middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

//connect to the database
mongoose.connect(mongoURI);
//Create the mongoose Schema
var foodSchema = mongoose.Schema({
  price: Number,
  category: String,
  isGlutenFree: Boolean,
  calories: Number
});
//Create the Mongoose Model
var Food = mongoose.model('Food', foodSchema);
//Testing database stuff
 var cheese_sticks = new Food({
   price: 8,
   category: 'appetizer',
   isGlutenFree: false,
   calories: 480
 });
 cheese_sticks.save(function(err, data){
   if(err){
     console.log(err);
   } else {
     console.log(data);
   }
 });

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
   Food.find({category: req.params.categoryName}, function(err, documents){
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

 //GET /foods/price/:dollarAmount
 server.get('/foods/price/:dollarAmount', function(req, res){
   Food.find({price: req.params.dollarAmount}, function(err, documents){
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

//POST /foods
// server.post('/foods', function(req, res){
//   res.send('it workss');
// });

//POST /foods
server.post('/foods', function(req, res){
  var food = new Food(req.body);
  food.save(function(err, document){
    if(err){
      res.status(500).json({
        msg: err
      });
    }  else{
      res.status(201).json({
        msg: "Success"
      });
      }
    });
});

//PUT /animals/:id
server.put('/foods/:id', function(req, res){
  Food.findOneAndUpdate({_id: req.params.id}, req.body, function(err, document){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        msg: "Successfully updated"
      });
    }
  });
});

//DELETE /foods/:id
server.delete('/foods/:id', function(req, res){
  Food.remove({_id: req.params.id}, function(err, document){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        msg: 'Successfully deleted'
      });
    }
  });
});

//DELETE /foods/category/:category
server.delete('/foods/category/:categoryName', function(req, res){
  Food.remove({category: req.params.categoryName}, function(err, document){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        msg: 'Successfully deleted category'
      });
    }
  });
});

server.listen(port, function(){
  console.log('Now listening on port...', port);
});
