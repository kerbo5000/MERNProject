const News = require('../model/News')

const getNews = async (req,res) => {
  let news = await News.find()
  if(req?.query?.title){
    const title = req.query.title
    news = news.filter((newIndex) => newIndex.title === title )
  }
  if(req?.query?.username){
    const username = req.query.username
    news = news.filter((newIndex) => newIndex.username === username )
  }
  if(!news.length){
    res.status(204).json({'message':'No news'})
  }
  res.status(200).json(news)
}

const createNews = async (req,res) => {
  if(!req?.body?.title || !req?.body?.body ){
    res.status(400).json({'message':'title and body are required.'})
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
    res.status(500).json({'message':err.message})
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
  res.status(200).json(news)
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
  news.likes = news.likes + 1
  const result = await news.save()
  res.status(200).json(result)
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
  res.status(200).json(news.comments)
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
    res.status(400).json({'message':'Comment body is required.'})
  }
  const news = req.target
  const body = req.body.body
  news.comments = [...news.comments,{body,from:req.user}]
  const result = await news.save()
  res.status(200).json(result)
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
    res.status(400).json({'message':'Comment index parameter is required'})
  }
  const news = req.target
  if(newx.comments.length<req.params.commentIndex ){
    res.status(400).json({'message':'Index out ouf bounds'})
  }
  res.status(200).json(news.comments[req.params.commentIndex])
}

const deleteComment = async (req,res) => {
  // if(!req?.params?.id){
  //   res.status(400).json({'message':'ID parameter is required'})
  // }
  if(!req?.params?.commentIndex){
    res.status(400).json({'message':'Comment index parameter is required'})
  }
  const news = req.target
  if(newx.comments.length<req.params.commentIndex ){
    res.status(400).json({'message':'Index out ouf bounds'})
  }
  if(req.roles.includes(ROLES_LIST.Admin) || req.roles.includes(ROLES_LIST.Editor) || comment.username == req.user ){
      const comment = news.comments[req.params.commentIndex]
      news.comments.splice(req.params.commentIndex,1)
      const result = await news.save()
      res.status(200).json(result)
  }else{
    return res.sendStatus(405)
  }
}

const updateNews = (req,res) => {
  const news = req.target
  if(!req?.body?.title || !req?.body?.body ){
    res.status(400).json({'message':'title or body is required.'})
  }
  if(req.roles.includes(ROLES_LIST.Admin || news.username === req.user)){
    if(req?.body?.body){
      news.body = req.body.body
    }
    if(req?.body?.title){
      news.body = req.body.body
    }
    const result = await news.save()
    res.status(200).json(result)
  }else{
    return res.sendStatus(405)
  }
}

const deleteNews = (req,res) => {
  if(req.roles.includes(ROLES_LIST.Admin || news.username === req.user)){
    const result = await News.deleteOne({_id:req.params.id})
    res.status(200).json(result)
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
