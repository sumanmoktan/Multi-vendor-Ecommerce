const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
// const { upload } = require("../multer");
const { isAuthenticated } = require("../middleware/auth");

router.post(
  "/create-user",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.createUser
);
router.post("/activation", userController.activateUser);
router.post("/login", userController.Login);
router.get("/logout", isAuthenticated, userController.Logout);
router.get("/getuser", isAuthenticated, userController.userDetail);
router.patch(
  "/update-user-info",
  isAuthenticated,
  userController.updateUserInfo
);
router.patch(
  "/update-user-address",
  isAuthenticated,
  userController.updateAddress
);
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  userController.DeleteUserAddress
);

router.patch(
  "/update-user-password",
  isAuthenticated,
  userController.changePassword
);

module.exports = router;
