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
  username:{
    type:String,
    required:true
  },
  likes:[{
    type:mongoose.Schema.Types.ObjectId,  
    ref:'User'
  }],
  comments:[{
    body:{
      type:String,
      required:true
    },
    userId:{
    type:mongoose.Schema.Types.ObjectId,  
    ref:'User'
    },
    username:{
      type:String,
      required:true
    }
  }],
},
{
  timestamps: true,
})
module.exports = mongoose.model('News',newsSchema)
