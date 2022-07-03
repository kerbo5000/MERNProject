
const express = require('express')
const router = express.Router()
const {
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
} = require('../../controllers/newsController.js')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
  .get(getNews)

router.route('/',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor))
  .post(createNews)

router.route('/:newsId')
  .get(getNewsById)

router.route('/:newsId/likes')
  .put(likeNews)

router.route('/:newsId/comments')
  .get(getComments)
  .post(addComment)

router.route('/:newsId/comments/:commentIndex')
  .get(getCommentByIndex)
  .get(deleteComment)

router.route('/:newsId',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor))
  .put(updateNews)
  .delete(deleteNews)

module.exports = router
