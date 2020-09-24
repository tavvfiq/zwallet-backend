const multer = require("multer");
const path = require("path");
const responseForm = require("../form/responseForm");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/images");
	},
	filename: (req, file, cb) => {
		const nameFormat = `images-${Date.now()}${path.extname(
			file.originalname
		)}`;
		cb(null, nameFormat);
	},
});

const limits = {
	fileSize: 3 * 1e6,
};

const fileFilter = (req, file, cb) => {
	const fileTypes = /jpg|jpeg|gif|png/;
	const extName = fileTypes.test(
		path.extname(file.originalname).toLowerCase()
	);
	if (extName) {
		cb(null, true);
	} else {
		cb("Error: Images Only");
	}
};

const upload = multer({
	storage,
	limits,
	fileFilter,
});

const singleFileUpload = {
	profileImageUpload: (req, res, next) => {
		const profileImageUpload = upload.single("profile_image");
		profileImageUpload(req, res, (err) => {
			if (err) {
				responseForm.error(res, err, 400);
			} else {
				try {
					req.body.image = `${process.env.API_URL}/images/${req.file.filename}`;
				} catch (err) {
					console.log(err);
				} finally {
					next();
				}
			}
		});
	},
};

module.exports = singleFileUpload;
