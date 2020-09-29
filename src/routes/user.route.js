const userRouter = require("express").Router();
const userController = require("../controllers/user.controller");
const singleFileUpload = require("../helpers/middleware/singleFileUpload");
const checkToken = require("../helpers/middleware/checkToken");

userRouter.patch(
	"/:id",
	checkToken,
	singleFileUpload.profileImageUpload,
	userController.updateUser
);

userRouter.get("/:id", checkToken, userController.getUserById);

userRouter.get("/contact/:id", checkToken, userController.getContactList);
userRouter.post("/contact", checkToken, userController.addContact);

module.exports = userRouter;
