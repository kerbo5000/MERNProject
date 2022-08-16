const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUserPwd,
  deleteUser,
} = require("../../controllers/usersController.js");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const verifyId = require("../../middleware/verifyId");

router.route("/").get(getUsers);

router
  .route("/:userId")
  .get(verifyId("user"), getUser)
  .patch(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User),
    verifyId("user"),
    updateUserPwd
  )
  .delete(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User),
    verifyId("user"),
    deleteUser
  );

module.exports = router;
