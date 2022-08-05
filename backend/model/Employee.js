const mongoose = require('mongoose')
const Schema = mongoose.Schema
const employeeSchema = new Schema({
  firstname:{
    type:String,
    required:true
  },
  lastname:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  roles:{
    User:Number,
    Editor:{
      type:Number,
      default:1984
    },
    Admin:Number
  },
  refreshToken:String,
  news:[{
    type:mongoose.Schema.Types.ObjectId,  
    ref:'News'
  }]
})
module.exports = mongoose.model('Employee',employeeSchema)
