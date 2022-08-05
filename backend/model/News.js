const mongoose = require('mongoose')
const Employee = require('./Employee')
const Schema = mongoose.Schema
const newsSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  body:{
    type:String,
    required:true
  },
  employee:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'Employee'
  },
  likes:[{
    type:mongoose.Schema.Types.ObjectId,  
    ref:'User'
  }],
  comments:[{
    body:String,
    user:{
    type:mongoose.Schema.Types.ObjectId,  
    ref:'User'
    }
  }],
},
{
  timestamps: true,
})
module.exports = mongoose.model('News',newsSchema)
