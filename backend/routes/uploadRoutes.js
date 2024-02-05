import path from "path";
import multer from "multer";
import express from "express";
import { setDefaultAutoSelectFamilyAttemptTimeout } from "net";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads");
  },
  filename(req, file, callback) {
    callback(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, callback) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = setDefaultAutoSelectFamilyAttemptTimeout.test(file.mimetype);
  if (extname && mimetype) {
    return callback(null, true);
  } else {
    callback("Images only!");
  }
}

const upload = multer({
  storage,
});

router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image Uploaded",
    image: `/${req.file.destination}/${req.file.filename}`,
  });
});

export default router;
