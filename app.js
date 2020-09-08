const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require("mongoose");
var fs = require('fs');
var path = require('path');
const User = require("./users");
require('dotenv').config();

const dbname = process.env.dbname
const dbuser = process.env.dbuser
const dbpassword = process.env.dbpassword


const validation = require('./middleware/validation');


const authorization = require('./middleware/authorization');



var multer = require('multer');
// /*var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname)
//   }
// })*/

// var storage = multer.memoryStorage()

// const fileFilter = (req,res,cb) => {
//   cb(null,true)
// }

// var upload = multer({ storage: storage, fileFilter:fileFilter })

app.use((req, res, next) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();

});

app.set("view engine", "ejs"); 




mongoose.connect("mongodb+srv://"+dbuser+":"+dbpassword+"@cluster0.2ypfh.gcp.mongodb.net/"+dbname+"?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true })
  .then(() => {
    console.log("Connected To DB");
  })
  .catch(() => {
    console.log("Connection Failed");

  });





// mongoose.connect("mongodb+srv://main:yaMfwF52FDSyehrg@cluster0.2ypfh.gcp.mongodb.net/contactsDB?retryWrites=true&w=majority",
//   { useNewUrlParser: true, useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true })
//   .then(() => {
//     console.log("Connected To DB");
//   })
//   .catch(() => {
//     console.log("Connection Failed");

//   });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users",  (req, res, next) => {

  
      User.find({}).then(documents => {
        res.status(200).json({
          message: "Data Fetched Successfully",
          user: documents
        });
      }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
            message: "Contacts Not Found"
          });
        }
        return res.status(500).send({
          message: "Server Error"
        });
      });
  })









app.post('/users',  function (req, res, next) {

  const user = new User({
    name: req.body.name,
    username: req.body.username,
    profilepic: req.body.profilepic
  });
  
  user.save(function (err, result) {
    if (err) {

      res.status(400).json({
        errors:err.message
      });
     
    }
    else {
      res.status(200).json({
        message: " Post Successfully",
        data: result
      });
    }
  }) 
  

})



  

app.delete('/users/:id', (req, res) =>{


  
  User.findByIdAndRemove({_id: req.params.id})
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User Not Found"
        });
      }
      res.send({ message: "Contact Deleted Successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Contact Not Found"
        });
      }
      return res.status(500).send({
        message: "Server error could delete the contact"
      });
    });
  })








module.exports = app;