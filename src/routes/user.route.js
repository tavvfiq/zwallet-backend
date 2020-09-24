const userRouter = require("express").Router();
const userController = require("../controllers/user.controller");
const singleFileUpload = require("../helpers/middleware/singleFileUpload");

userRouter.patch(
	"/:id",
	singleFileUpload.profileImageUpload,
	userController.updateUser
);

module.exports = userRouter;
