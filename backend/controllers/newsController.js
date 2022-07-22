const News = require('../model/News')
const User = require('../model/User')
const ROLES_LIST = require('../config/roles_list')
const getNews = async (req,res) => {
  let filter = {}
  if(req?.query?.title){
    filter.title = req.query.title
  }
  if(req?.query?.username){
    filter.username = req.query.username
  }
  if(req?.query?.likes){
    filter.likes = req.query.likes
  }
  if(req?.query?.skip && req?.query?.limit ){
    const news = await News.find(filter).skip(Number(req.query.skip)).limit(Number(req.query.limit))
    return res.status(200).json(news)
  } else if (req?.query?.limit) {
    const news = await News.find(filter).limit(Number(req.query.limit))
    return res.status(200).json(news)
  } else if (req?.query?.skip) {
    const news = await News.find(filter).skip(Number(req.query.skip))
    return res.status(200).json(news)
  } else{
    const news = await News.find(filter)
    return res.status(200).json(news)
  }
}

const createNews = async (req,res) => {
  if(!req?.body?.title || !req?.body?.body ){
    return res.status(400).json({'message':'title and body are required.'})
  }
  const title = req.body.title
  const body = req.body.body
  try{
    const news = await News.create({
      title,
      body,
      username:req.user
    })
    res.status(201).json(news)
  } catch(err){
    return res.status(500).json({'message':err.message})
  }
}

const getNewsById = async (req,res) => {
  // if(!req?.params?.id){
  //   res.status(400).json({'message':'ID parameter is required'})
  // }
  // let news = await News.findById(req.params.id)
  // if(!news){
  //   res.status(204).json({'message':`No news with ID: ${req.params.id}`})
  // }
  const news = req.target
  return res.status(200).json(news)
}

const likeNews = async (req,res) => {
  // if(!req?.params?.id){
  //   res.status(400).json({'message':'ID parameter is required'})
  // }
  // let news = await News.findById(req.params.id)
  // if(!news){
  //   res.status(204).json({'message':`No news with ID: ${req.params.id}`})
  // }
  const news = req.target
  // const user = await User.findOne({username:req.user})
  if(!req?.params?.type){
    return res.status(400).json({'message': 'type parameter missing'})
  }
  const type = req.params.type
  if(type === 'like'){
    const index  = news.likes.indexOf(req.user)
    if(index > -1 ){
      return res.status(200).json({'message': 'news already liked'})
    }else{
      news.likes.push(req.user)
    }
  }else if(type === 'unlike'){
    const index  = news.likes.indexOf(req.user)
    if(index > -1 ){
      news.likes.splice(index,1)
    }else{
      return res.status(200).json({'message': 'news wasn\'t liked'})
    }
  }else{
    return res.status(400).json({'message': 'not accepteble type parameter'})
  }
  const result = await news.save()
  return res.status(200).json(result)
}

const getComments = async (req,res) => {
  // if(!req?.params?.id){
  //   res.status(400).json({'message':'ID parameter is required'})
  // }
  // let news = await News.findById(req.params.id)
  // if(!news){
  //   res.status(204).json({'message':`No news with ID: ${req.params.id}`})
  // }
  const news = req.target
  return res.status(200).json(news.comments)
}

const addComment = async (req,res) => {
  // if(!req?.params?.id){
  //   res.status(400).json({'message':'ID parameter is required'})
  // }
  //
  // let news = await News.findById(req.params.id)
  // if(!news){
  //   res.status(204).json({'message':`No news with ID: ${req.params.id}`})
  // }

  if(!req?.body?.body ){
    return res.status(400).json({'message':'Comment body is required.'})
  }
  const news = req.target
  const body = req.body.body
  news.comments.push({body,from:req.user})
  const result = await news.save()
  return res.status(200).json(result)
}

const getCommentByIndex = async (req,res) => {
  // if(!req?.params?.id){
  //   res.status(400).json({'message':'ID parameter is required'})
  // }
  //
  // let news = await News.findById(req.params.id)
  // if(!news){
  //   res.status(204).json({'message':`No news with ID: ${req.params.id}`})
  // }
  if(!req?.params?.commentIndex){
    return res.status(400).json({'message':'Comment index parameter is required'})
  }
  const news = req.target
  if(news.comments.length<req.params.commentIndex ){
    return res.status(400).json({'message':'Index out ouf bounds'})
  }
  return res.status(200).json(news.comments[req.params.commentIndex])
}

const deleteComment = async (req,res) => {
  // if(!req?.params?.id){
  //   res.status(400).json({'message':'ID parameter is required'})
  // }
  if(!req?.params?.commentIndex){
    return res.status(400).json({'message':'Comment index parameter is required'})
  }
  const news = req.target
  if(news.comments.length<=req.params.commentIndex ){
    return res.status(400).json({'message':'Index out ouf bounds'})
  }
  console.log(news.comments)
  const comment = news.comments[req.params.commentIndex]
  if(req.roles.includes(ROLES_LIST.Admin) || req.roles.includes(ROLES_LIST.Editor) || comment.from == req.user ){
      news.comments.splice(req.params.commentIndex,1)
      const result = await news.save()
      return res.status(200).json(result)
  }else{
    return res.sendStatus(405)
  }
}

const updateNews = async (req,res) => {
  const news = req.target
  if(!req?.body?.title && !req?.body?.body ){
    return res.status(400).json({'message':'title or body is required.'})
  }
  if(req.roles.includes(ROLES_LIST.Admin || news.username === req.user)){
    if(req?.body?.body){
      news.body = req.body.body
    }
    if(req?.body?.title){
      news.body = req.body.body
    }
    const result = await news.save()
    return res.status(200).json(result)
  }else{
    return res.sendStatus(405)
  }
}

const deleteNews = async (req,res) => {
  const news = req.target
  if(req.roles.includes(ROLES_LIST.Admin) || news.username === req.user){
    const result = await News.deleteOne({_id:req.target._id})
    return res.status(200).json(result)
  }else{
    return res.sendStatus(405)
  }
}


module.exports = {
  getNews,
  createNews,
  getNewsById,
  likeNews,
  getComments,
  addComment,
  deleteComment,
  getCommentByIndex,
  updateNews,
  deleteNews
}
