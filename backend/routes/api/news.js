const express = require("express");
const router = express.Router();
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
  deleteNews,
  getNewsSearch,
} = require("../../controllers/newsController.js");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const verifyId = require("../../middleware/verifyId");

router.route("/").get(getNews);

router.route("/search").get(getNewsSearch);

router.route("/").post(verifyRoles(ROLES_LIST.Editor), createNews);

router.route("/:newsId").get(verifyId("news"), getNewsById);

router
  .route("/:newsId/likes/:type")
  .patch(verifyId("news"), verifyRoles(ROLES_LIST.User), likeNews);

router
  .route("/:newsId/comments")
  .get(verifyId("news"), getComments)
  .post(verifyId("news"), verifyRoles(ROLES_LIST.User), addComment);

router
  .route("/:newsId/comments/:commentIndex")
  .get(verifyId("news"), getCommentByIndex)
  .delete(verifyId("news"), deleteComment);

router
  .route("/:newsId")
  .patch(
    verifyId("news"),
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    updateNews
  )
  .delete(
    verifyId("news"),
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    deleteNews
  );

module.exports = router;
