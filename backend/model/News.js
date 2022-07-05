const mongoose = require('mongoose')
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
  username:{
    type: String,
    required:true
  },
  likes:{
    type:Number,
    default:0
  },
  comments:[{
    body:String,
    from: {
      type: mongoose.Schema.Types.ObjectId
    }
  }],
})
module.exports = mongoose.model('News',newsSchema)
