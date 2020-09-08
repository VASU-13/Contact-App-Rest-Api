const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, trim:true, required: true },
  username: { type: String, trim:true, required: true },
  profilepic:{type:String, trim:true, required:true},
  
}, {timestamps: true});


module.exports = mongoose.model('User', userSchema);