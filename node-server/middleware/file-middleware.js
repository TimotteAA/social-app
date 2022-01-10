const multer = require("koa-multer");
const path = require("path");

// 存用户头像
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/person");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const avatarUpload = multer({
  storage: storage,
});

const avatarHandler = avatarUpload.single("profile");

// 存动态的post
const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/post");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const pictureUpload = multer({
  storage: storage2,
});

const pictureHandler = pictureUpload.single("file");

// 存profile的配图
const storage3 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/cover");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const coverUpload = multer({
  storage: storage3,
});

const coverHandler = coverUpload.single("cover");

module.exports = { avatarHandler, pictureHandler, coverHandler };
