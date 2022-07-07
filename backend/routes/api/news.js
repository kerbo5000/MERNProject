
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

router.route('/')
  .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),createNews)

router.route('/:newsId')
  .get(verifyId('news'),getNewsById)

router.route('/:newsId/likes')
  .put(verifyId('news'),likeNews)

router.route('/:newsId/comments')
  .get(verifyId('news'),getComments)
  .post(verifyId('news'),addComment)

router.route('/:newsId/comments/:commentIndex')
  .get(verifyId('news'),getCommentByIndex)
  .delete(verifyId('news'),deleteComment)

router.route('/:newsId')
  .put(verifyId('news'),verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),updateNews)
  .delete(verifyId('news'),verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),deleteNews)

module.exports = router
