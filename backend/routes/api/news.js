
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
const verifyId = require('../../middleware/verifyId')

router.route('/')
  .get(getNews)

router.route('/',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor))
  .post(createNews)

router.route('/:newsId',verifyId('news'))
  .get(getNewsById)

router.route('/:newsId/likes',verifyId('news'))
  .put(likeNews)

router.route('/:newsId/comments',verifyId('news'))
  .get(getComments)
  .post(addComment)

router.route('/:newsId/comments/:commentIndex',verifyId('news'))
  .get(getCommentByIndex)
  .delete(deleteComment)

router.route('/:newsId',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),verifyId('news'))
  .put(updateNews)
  .delete(deleteNews)

module.exports = router
