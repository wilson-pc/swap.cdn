const multer = require("multer");
const { v4: uuid } = require("uuid");
const { extname } = require("path");
const { uploadImage, GetImage, DeleteImage, SaveImages } = require("../controller/file.controller");
const { getToken } = require("../controller/auth.controller");
const Router = require("express").Router;
const { checkToken } = require("../middleware/auth.token");
const router = new Router()

const multerOptions = {
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
      file.filename += file.mimetype;
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(new Error(`Archivo no soportado ${file.originalname}`), false);
    }
  },
  storage: multer.diskStorage({
    destination: "assets/images",
    filename: (req, file, cb) => {
      // Calling the callback passing the random name generated with the original extension name
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};
const upload = multer(multerOptions);

router.route("/v1.0/token/generator/get").get(getToken);

router.route("/v1.0/file/image/:name").get(GetImage);
router
  .route("/v1.0/file/image")
  .post([checkToken, upload.single("image")], uploadImage);
router
  .route("/v1.0/file/image/multiple")
  .post([checkToken, upload.array("image", 10)], SaveImages);

router
  .route("/v1.0/file/image/:name")
  .delete(checkToken, DeleteImage);

module.exports = router;