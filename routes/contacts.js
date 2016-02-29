/*
 * Created by Chandu on 1/5/16.
 */


var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/projectA', function(err){
  if (err) console.log('there is a problem connecting to mongodb' + err);
  else console.log('you are now connected to mongodb...');
});

var ContactsModel = mongoose.model('contact',{
  firstname:String,
  lastname:String

});


router.get('/', function(req, res) { // /contacts

  ContactsModel.find({}, function(err, results){
    if (err){
      res.status(500).json(err);
      console.log('error trying to access data... ');
    }
    else{
      res.status(200).json(results);
    }
  });
});

router.get('/:id', function(req, res) { // /contacts
  console.log(req.params.id); // req.query.id --> ?id=asdf

  ContactsModel.findById(req.params.id, function(err, result){
    if (err){
      res.status(500).json(err);
      console.log('error trying to access data... ');
    }
    else{
      res.status(200).json(results);
      console.log('GET by ID - json result fetched... ');
    }
  });
});

router.post('/', function(req, res){
  console.log(req.body);

  var contact = new ContactsModel(req.body);
  console.log(contact);

  contact.save(function (err, result){
    if(err){
      res.status(500).json(err);
      console.log('error trying to access data... ');
    }
    else{
      res.status(200).json(result);
    }

  });
});

router.delete('/:id', function(req, res) { // /contacts

  ContactsModel.findByIdAndRemove(req.params.id, function(err, result){
 // console.log(result);
    if (err){
      res.status(500).json(err);
      console.log('error trying to delete data... ');
    }
    else{
      res.status(200).json(result);
 //     console.log(result);
    }
  });

});

router.put('/', function(req, res) {
  var contact  = req.body;

  ContactsModel.findById(contact._id, function(err, foundUser) {
      if(err){
        res.status(500).json(err);
      }
      else{
        console.log(foundUser);
          foundUser.update(req.body, function(err, count) {
            if (err) {
              res.status(500).json(err);
            }
            else {
              res.send(count);
             // res.status(200).json(result);
            }
          });
        };
      });
  });



router.put('/updateuser/:id', function(req, res) {
  var db = req.db;
  var userToUpdate = req.params.id;
  db.collection('userlist').update({ _id: ObjectId(userToUpdate)}, req.body, function (err, result) {
    res.send(
        (err === null) ? {msg: ''} : {msg: err}
    );
  });
});


module.exports = router;
