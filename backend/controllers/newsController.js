const News = require('../model/News')
const User = require('../model/User')
const Employee = require('../model/Employee')

const ROLES_LIST = require('../config/roles_list')
const getNews = async (req,res) => {
  let filter = {}
  if(req?.query?.title){
    filter.title = req.query.title
  }

  if(req?.query?.employee){
    filter.employee = req.query.employee
  }

  if(req?.query?.liked){
    filter.likes = req.query.liked
  }

  let limit = 0 
  if(req?.query?.limit && !isNaN(req.query.limit)){
    limit = parseInt(req.query.limit,10)
  }

  let skip = 0 

  if(req?.query?.skip && !isNaN(req.query.skip)){
    skip = parseInt(req.query.skip,10)
  }
  try{
    const news = await News.find(filter).limit(limit).skip(skip)
    res.status(200).json(news)
  }catch (err){
    res.status(400).json({'message':err.message})
  }
}

const getNewsSearch = async (req,res) => {
  let filter = {}
  if(req?.query?.title){
    filter.title = req.query.title
  }

  if(req?.query?.username){
    filter.username = req.query.username
  }

  if(req?.query?.body){
    filter.body = req.query.body
  }

  let limit = 0 
  if(req?.query?.limit && !isNaN(req.query.limit)){
    limit = parseInt(req.query.limit,10)
  }

  let skip = 0 

  if(req?.query?.skip && !isNaN(req.query.skip)){
    skip = parseInt(req.query.skip,10)
  }
  const search = Object.keys(filter).map(field => {
     return {[field]:{$regex:filter[field],$options:'i'}}
  })
  try{
    if(req?.query?.liked){
      const news = await News.find({$and:[{$or:search},{liked:req.query.liked}]}).limit(limit).skip(skip)
      res.status(200).json(news)
    }else{
      const news = await News.find({$or:search}).limit(limit).skip(skip)
      res.status(200).json(news)
    }
    
  }catch (err){
    res.status(400).json({'message':err.message})
  }
}

const createNews = async (req,res) => {
  if(!req?.body?.title || !req?.body?.body ){
    return res.status(400).json({'message':'title and body are required.'})
  }
  const title = req.body.title
  const body = req.body.body

  const duplicate = await News.find({title,employee:req.userId})
  if(duplicate.length){
    res.status(409).json({'message':'You already have a article with that title'})
  }else{
    try{
      const news = await News.create({
        title,
        body,
        employee:req.userId,
        username:req.username
      })
      const employee = await Employee.findById(req.userId)
      employee.news.push(news._id)
      await employee.save()
      res.status(201).json(news)
    } catch(err){
      return res.status(400).json({'message':err.message})
    }
  }
}

const getNewsById = async (req,res) => {
  const news = req.target
  return res.status(200).json(news)
}

const likeNews = async (req,res) => {
  const news = req.target
  if(!req?.params?.type){
    return res.status(400).json({'message': 'type parameter missing'})
  }
  const type = req.params.type
  if(type === 'like'){
    const index  = news.likes.indexOf(req.userId)
    if(index > -1 ){
      return res.status(200).json({'message': 'news already liked'})
    }else{
      news.likes.push(req.userId)
      const user = await User.findById(req.userId)
      user.liked.push(news._id)
      await user.save()
    }
  }else if(type === 'unlike'){
    const index  = news.likes.indexOf(req.userId)
    if(index > -1 ){
      news.likes.splice(index,1)
      const user = await User.findById(req.userId)
      const likeIndex = user.liked.indexOf(news._id)
      user.liked.splice(likeIndex,1)
      await user.save()
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
  const news = req.target
  return res.status(200).json(news.comments)
}

const addComment = async (req,res) => {
  if(!req?.body?.comment ){
    return res.status(400).json({'message':'Comment body is required.'})
  }
  const news = req.target
  const body = req.body.comment
  news.comments.push({body,userId:req.userId,username:req.username})
  const result = await news.save()
  return res.status(200).json(result)
}

const getCommentByIndex = async (req,res) => {
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
  if(!req?.params?.commentIndex){
    return res.status(400).json({'message':'Comment index parameter is required'})
  }
  const news = req.target
  if(news.comments.length<=req.params.commentIndex ){
    return res.status(400).json({'message':'Index out ouf bounds'})
  }
  const comment = news.comments[req.params.commentIndex]
  if(req.roles.includes(ROLES_LIST.Admin) || req.userId == news.employee || comment.user == req.userId ){
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
  if(req.roles.includes(ROLES_LIST.Admin )|| news.employee == req.userId){
    if(req?.body?.body){
      news.body = req.body.body
    }
    if(req?.body?.title){
      news.body = req.body.title
    }
    const result = await news.save()
    return res.status(200).json(result)
  }else{
    return res.sendStatus(405)
  }
}

const deleteNews = async (req,res) => {
  const news = req.target
  if(req.roles.includes(ROLES_LIST.Admin) || news.employee == req.userId){
    const employee = await Employee.findById(news.employee)
    const index = employee.news.indexOf(news._id)
    employee.news.splice(index,1)
    employee.save()
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
  deleteNews,
  getNewsSearch
}
