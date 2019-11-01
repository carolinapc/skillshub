const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/user"
router.route("/")
  .get(userController.findAll)
  .put(userController.update)
  .post(userController.create);

// Matches with "/api/user/find/:id"
router.route("/find/:id")
  .get(userController.findById)

// Matches with "/api/user/account"
router.route("/account")
  .get(userController.getUserAccount)

// Matches with "/api/user/resetpwd"
router.route("/resetpwd")
  .post(userController.resetPassword);

// Matches with "/api/user/auth"
router.route("/auth").get(userController.getUserSession);
router.route("/auth").post(userController.auth);

// Matches with "/api/user/signout"
router.route("/signout")
  .post(userController.signout);

module.exports = router;
