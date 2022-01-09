const Router = require("koa-router");

const {
  pictureHandler,
  avatarHandler,
  coverHandler,
} = require("../middleware/file-middleware");

const {
  verifyAuth,
  verifyAuthForFollow,
} = require("../middleware/auth-middleware");

const {
  saveAvatarInfo,
  savePictureInfo,
  saveCoverInfo,
} = require("../controller/file-controller");

const fileRouter = new Router({ prefix: "/upload" });

// 上传头像图片接口
// 登陆后才能上传
// 服务器专门有个文件夹放图片
// uploads/avatar
// 1. 中间件保存图像
// 2. 图像信息，属于哪个user、大小
fileRouter.post(
  "/profilePicture",
  verifyAuthForFollow,
  avatarHandler,
  saveAvatarInfo
);

// 动态配图
fileRouter.post(
  "/picture/:momentId",
  verifyAuthForFollow,
  pictureHandler,
  savePictureInfo
);

// profile的主页配图
fileRouter.post("/cover", verifyAuthForFollow, coverHandler, saveCoverInfo);

// savePictureInfo;
module.exports = fileRouter;
